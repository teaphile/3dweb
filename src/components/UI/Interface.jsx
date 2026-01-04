import { useGameStore } from '../../stores/useGameStore'
import { useEffect } from 'react'

export default function Interface() {
    const nearbyProject = useGameStore((state) => state.nearbyProject)
    const activeProject = useGameStore((state) => state.activeProject)
    const setActiveProject = useGameStore((state) => state.setActiveProject)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Enter' && nearbyProject && !activeProject) {
                setActiveProject(nearbyProject.id)
            }
            if (e.code === 'Escape' && activeProject) {
                setActiveProject(null)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [nearbyProject, activeProject, setActiveProject])

    return (
        <div className="interface" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            fontFamily: 'monospace'
        }}>
            {/* HUD */}
            <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
                <h1 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Portfolio</h1>
                <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.7 }}>
                    <div>WASD / Arrows to Drive</div>
                    <div>SHIFT to Boost</div>
                    <div>SPACE to Jump</div>
                </div>
            </div>

            {/* Interaction Prompt */}
            {nearbyProject && !activeProject && (
                <div style={{
                    position: 'absolute',
                    top: '80%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    border: '1px solid white',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    Press ENTER to view {nearbyProject.name}
                </div>
            )}

            {/* Project Modal */}
            {activeProject && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto'
                }}>
                    <div style={{
                        width: '80%',
                        maxWidth: '600px',
                        background: '#111',
                        border: '1px solid #333',
                        padding: '40px',
                        color: 'white',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setActiveProject(null)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>

                        <h2>Active Project: {activeProject}</h2>
                        <p style={{ lineHeight: '1.6', color: '#ccc' }}>
                            This is a placeholder for project details. In a real scenario,
                            you would fetch content based on the ID "{activeProject}".
                        </p>

                        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                            <button style={{ padding: '10px 20px', background: 'white', color: 'black', border: 'none', cursor: 'pointer' }}>
                                View Live
                            </button>
                            <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
