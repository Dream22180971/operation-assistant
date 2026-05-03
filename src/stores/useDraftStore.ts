import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Platform, WechatMode } from '../types'

export interface Draft {
  id: string
  platform: Platform
  wechatMode?: WechatMode
  topic: string
  extra: string
  content: string
  createdAt: number
}

interface DraftState {
  drafts: Draft[]
  addDraft: (draft: Omit<Draft, 'id' | 'createdAt'>) => void
  deleteDraft: (id: string) => void
  clearDrafts: () => void
}

let nextId = Date.now()
function genId(): string {
  return (nextId++).toString(36) + Math.random().toString(36).slice(2, 6)
}

export const useDraftStore = create<DraftState>()(
  persist(
    (set) => ({
      drafts: [],

      addDraft: (draft) => {
        const newDraft: Draft = {
          ...draft,
          id: genId(),
          createdAt: Date.now(),
        }
        set((state) => ({
          drafts: [newDraft, ...state.drafts].slice(0, 50), // 最多保存50条
        }))
      },

      deleteDraft: (id) => {
        set((state) => ({
          drafts: state.drafts.filter((d) => d.id !== id),
        }))
      },

      clearDrafts: () => set({ drafts: [] }),
    }),
    {
      name: 'oa_drafts',
    },
  ),
)
