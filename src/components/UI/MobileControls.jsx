import { useEffect } from 'react'
import { useGameStore } from '../../stores/useGameStore'

// For now, simple buttons. A real joystick would use 'nipple.js' or similar.
export default function MobileControls() {
    const setMobileInput = useGameStore((state) => state.setMobileInput)

    // Helper to set input
    const handleTouchStart = (key) => setMobileInput(key, true)
    const handleTouchEnd = (key) => setMobileInput(key, false)

    return (
        <div className="mobile-controls" style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'grid',
            gridTemplateColumns: '60px 60px 60px',
            gridGap: '10px',
            pointerEvents: 'auto',
            userSelect: 'none' // Prevent text selection
        }}>
            {/* Up */}
            <div style={{ gridColumn: 2 }}>
                <ControlBtn label="▲" onStart={() => handleTouchStart('forward')} onEnd={() => handleTouchEnd('forward')} />
            </div>
            {/* Left */}
            <div style={{ gridColumn: 1 }}>
                <ControlBtn label="◀" onStart={() => handleTouchStart('leftward')} onEnd={() => handleTouchEnd('leftward')} />
            </div>
            {/* Down */}
            <div style={{ gridColumn: 2 }}>
                <ControlBtn label="▼" onStart={() => handleTouchStart('backward')} onEnd={() => handleTouchEnd('backward')} />
            </div>
            {/* Right */}
            <div style={{ gridColumn: 3 }}>
                <ControlBtn label="▶" onStart={() => handleTouchStart('rightward')} onEnd={() => handleTouchEnd('rightward')} />
            </div>
        </div>
    )
}

function ControlBtn({ label, onStart, onEnd }) {
    return (
        <button
            onPointerDown={onStart}
            onPointerUp={onEnd}
            onPointerLeave={onEnd}
            style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid white',
                color: 'white',
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none'
            }}
        >
            {label}
        </button>
    )
}
