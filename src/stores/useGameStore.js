import { create } from 'zustand'

export const useGameStore = create((set) => ({
    // 'ready', 'playing', 'paused', 'ended'
    phase: 'ready',

    // Logic to start the game
    start: () => set((state) => {
        if (state.phase === 'ready')
            return { phase: 'playing' }
        return {}
    }),

    // Active project (if inspecting one)
    activeProject: null,
    setActiveProject: (project) => set({ activeProject: project }),

    // Nearby project (for prompts)
    nearbyProject: null,
    setNearbyProject: (project) => set({ nearbyProject: project }),

    // Settings
    settings: {
        audio: true,
        quality: 'high' // 'high', 'low'
    },
    toggleAudio: () => set((state) => ({ settings: { ...state.settings, audio: !state.settings.audio } })),

    // Mobile Inputs
    mobileInput: { forward: false, backward: false, leftward: false, rightward: false },
    setMobileInput: (key, value) => set((state) => ({ mobileInput: { ...state.mobileInput, [key]: value } })),
}))
