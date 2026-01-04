import { RigidBody } from '@react-three/rapier'

export function Tree({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            <RigidBody type="fixed" colliders="hull">
                {/* Trunk */}
                <mesh position={[0, 0.5, 0]} castShadow>
                    <cylinderGeometry args={[0.2, 0.4, 1, 8]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
                {/* Leaves */}
                <mesh position={[0, 1.5, 0]} castShadow>
                    <coneGeometry args={[1, 2, 8]} />
                    <meshStandardMaterial color="#228B22" />
                </mesh>
            </RigidBody>
        </group>
    )
}

export function Rock({ position, scale = 1 }) {
    return (
        <RigidBody type="fixed" colliders="hull" position={position} scale={scale}>
            <mesh castShadow receiveShadow>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#808080" />
            </mesh>
        </RigidBody>
    )
}
