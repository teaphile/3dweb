import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls, Environment } from '@react-three/drei'
import Car from './Car.jsx'
import Level from './World/Level.jsx'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />

        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <Physics>
            <Level />
            <Car />
        </Physics>
    </>
}
