import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AIProvider } from '../types'
import { PROVIDERS } from '../services/ai'

interface SettingsState {
  provider: AIProvider
  apiKey: string
  model: string
  endpointId: string
  setProvider: (provider: AIProvider) => void
  setApiKey: (apiKey: string) => void
  setModel: (model: string) => void
  setEndpointId: (endpointId: string) => void
  isConfigured: () => boolean
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      provider: 'qwen',
      apiKey: '',
      model: 'qwen-plus',
      endpointId: '',

      setProvider: (provider) => {
        const config = PROVIDERS[provider]
        set({
          provider,
          model: config.defaultModel,
          endpointId: '',
        })
      },

      setApiKey: (apiKey) => set({ apiKey }),
      setModel: (model) => set({ model }),
      setEndpointId: (endpointId) => set({ endpointId }),

      isConfigured: () => {
        const state = get()
        if (!state.apiKey) return false
        if (state.provider === 'doubao' && !state.endpointId) return false
        return true
      },
    }),
    {
      name: 'oa_settings',
    },
  ),
)
