import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Tree, Rock } from './Assets.jsx'
import ProjectNode from './ProjectNode.jsx'

export default function Level() {
    return (
        <group>
            {/* Ground */}
            <RigidBody type="fixed" friction={2}>
                <mesh receiveShadow position-y={-0.1} rotation-x={-Math.PI / 2} scale={100}>
                    <planeGeometry />
                    <meshStandardMaterial color="#C3B091" /> {/* Sand/Dirt color */}
                </mesh>
            </RigidBody>

            {/* Boundaries (Invisible walls) */}
            <RigidBody type="fixed">
                <CuboidCollider args={[50, 5, 1]} position={[0, 2.5, 50]} />
                <CuboidCollider args={[50, 5, 1]} position={[0, 2.5, -50]} />
                <CuboidCollider args={[1, 5, 50]} position={[50, 2.5, 0]} />
                <CuboidCollider args={[1, 5, 50]} position={[-50, 2.5, 0]} />
            </RigidBody>

            {/* Scenery */}
            <Tree position={[5, 0, 5]} />
            <Tree position={[-5, 0, 5]} scale={1.2} />
            <Tree position={[5, 0, -5]} scale={0.8} />
            <Tree position={[10, 0, 10]} />
            <Tree position={[-15, 0, -10]} />

            <Rock position={[8, 0.5, 2]} scale={0.5} />
            <Rock position={[-8, 1, -3]} />

            {/* Projects */}
            <ProjectNode position={[0, 0, -10]} name="Project A" projectId="project-a" />
            <ProjectNode position={[-10, 0, 0]} name="About Me" projectId="about" />
            <ProjectNode position={[10, 0, 0]} name="Contact" projectId="contact" />
        </group>
    )
}
