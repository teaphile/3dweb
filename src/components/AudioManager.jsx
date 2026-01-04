import { useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { useGameStore } from '../../stores/useGameStore'

export default function AudioManager() {
    const audioEnabled = useGameStore((state) => state.settings.audio)
    const bgmRef = useRef(null)

    useEffect(() => {
        // Initialize Background Music
        // Using a placeholder URL or data URI is safer if we don't have assets.
        // For this demo, I will use a simple synth drone data URI or silenced placeholder to avoid errors.
        // In a real app, this would be '/sounds/bgm.mp3'

        bgmRef.current = new Howl({
            src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], // Placeholder ambient logic
            html5: true, // Force HTML5 Audio for large files
            loop: true,
            volume: 0.5,
            autoplay: false
        })

        return () => {
            bgmRef.current.unload()
        }
    }, [])

    useEffect(() => {
        if (audioEnabled) {
            if (bgmRef.current && !bgmRef.current.playing()) {
                bgmRef.current.play()
            }
        } else {
            if (bgmRef.current && bgmRef.current.playing()) {
                bgmRef.current.pause()
            }
        }
    }, [audioEnabled])

    return null
}
