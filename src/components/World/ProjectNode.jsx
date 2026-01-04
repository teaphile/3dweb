import { useRef, useState } from 'react'
import { RigidBody, CylinderCollider } from '@react-three/rapier'
import { Text } from '@react-three/drei'
import { useGameStore } from '../../stores/useGameStore'

export default function ProjectNode({ position, name, projectId }) {
    const [hovered, setHovered] = useState(false)
    const setNearbyProject = useGameStore((state) => state.setNearbyProject)

    return (
        <group position={position}>
            {/* Visual */}
            <mesh
                position={[0, 0.5, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <cylinderGeometry args={[1, 1, 0.2, 32]} />
                <meshStandardMaterial color={hovered ? "hotpink" : "cyan"} emissive={hovered ? "hotpink" : "cyan"} emissiveIntensity={0.5} />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 1.5, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                billboard
            >
                {name}
            </Text>

            {/* Sensor */}
            <RigidBody type="fixed" colliders={false}>
                <CylinderCollider
                    args={[1.5, 1]}
                    sensor
                    onIntersectionEnter={() => {
                        setHovered(true)
                        setNearbyProject({ name, id: projectId })
                    }}
                    onIntersectionExit={() => {
                        setHovered(false)
                        setNearbyProject(null)
                    }}
                />
            </RigidBody>
        </group>
    )
}
