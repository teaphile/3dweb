import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../stores/useGameStore'

export default function Car() {
    const body = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()

    // Config
    const speed = 10
    const jumpForce = 4

    // Store smoothed camera position
    const smoothedCameraPosition = new THREE.Vector3(0, 10, 10)
    const smoothedCameraTarget = new THREE.Vector3()

    useFrame((state, delta) => {
        if (!body.current) return

        const { forward, backward, leftward, rightward, jump, boost } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = speed * delta * (boost ? 2 : 1)
        const torqueStrength = 2 * delta * (boost ? 2 : 1)

        const linvel = body.current.linvel()

        // Simple arcade movement relative to camera is tricky without camera rotation
        // For now, absolute world movement:
        if (isForward) impulse.z -= impulseStrength
        if (isBackward) impulse.z += impulseStrength
        if (isLeft) impulse.x -= impulseStrength
        if (isRight) impulse.x += impulseStrength

        // Apply
        body.current.applyImpulse(impulse, true)
        // Also apply some torque for turning visuals or better feel if needed
        // For now, let's just use linear impulse for clarity, maybe rotation later.

        // Jump
        // Check if grounded roughly by position or velocity (simple check)
        if (jump && Math.abs(linvel.y) < 0.1) {
            body.current.applyImpulse({ x: 0, y: jumpForce, z: 0 }, true)
        }

        /**
         * Camera Follow
         */
        const bodyPosition = body.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.x += 0
        cameraPosition.y += 10
        cameraPosition.z += 10 // Isometric-ish view

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)
    })

    return (
        <RigidBody
            ref={body}
            colliders={false}
            position={[0, 1, 0]}
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <CuboidCollider args={[0.5, 0.25, 1]} />

            {/* Visuals */}
            <group>
                {/* Chassis */}
                <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
                    <boxGeometry args={[1, 0.5, 2]} />
                    <meshStandardMaterial color="orange" />
                </mesh>

                {/* Wheels (purely visual for now) */}
                <mesh position={[-0.6, 0, 0.7]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                <mesh position={[0.6, 0, 0.7]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                <mesh position={[-0.6, 0, -0.7]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                <mesh position={[0.6, 0, -0.7]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            </group>
        </RigidBody>
    )
}
