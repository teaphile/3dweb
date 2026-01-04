import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import Experience from './components/Experience.jsx'
import Interface from './components/UI/Interface.jsx'
import AudioManager from './components/AudioManager.jsx'
import MobileControls from './components/UI/MobileControls.jsx'
import './index.css'

export default function App() {

  // Keyboard map
  const map = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'boost', keys: ['Shift'] },
  ]

  return (
    <>
      <AudioManager />
      <KeyboardControls map={map}>
        <div className="canvas-container" style={{ width: '100vw', height: '100vh' }}>
          <Canvas
            shadows
            camera={{ position: [0, 5, 10], fov: 45, near: 0.1, far: 200 }}
          >
            <Experience />
          </Canvas>

          <Interface />
        </div>
      </KeyboardControls>
      <MobileControls />
    </>
  )
}
