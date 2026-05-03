import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation, Message } from '../types'

interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
  addConversation: () => string
  setCurrentConversation: (id: string) => void
  addMessage: (conversationId: string, message: Message) => void
  updateLastAssistantMessage: (conversationId: string, content: string) => void
  getCurrentConversation: () => Conversation | null
  deleteConversation: (id: string) => void
  createConversation: () => string
}

let nextId = Date.now()
function genId(): string {
  return (nextId++).toString(36) + Math.random().toString(36).slice(2, 6)
}

export function createMessage(role: 'user' | 'assistant', content: string): Message {
  return { id: genId(), role, content, timestamp: Date.now() }
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,

      addConversation: () => {
        const id = genId()
        const conv: Conversation = {
          id,
          title: '新对话',
          messages: [],
          createdAt: Date.now(),
        }
        set((state) => ({
          conversations: [conv, ...state.conversations],
          currentConversationId: id,
        }))
        return id
      },

      createConversation: () => {
        return get().addConversation()
      },

      setCurrentConversation: (id) => set({ currentConversationId: id }),

      addMessage: (conversationId, message) => {
        set((state) => ({
          conversations: state.conversations.map((conv) => {
            if (conv.id !== conversationId) return conv
            const messages = [...conv.messages, message]
            // 用第一条用户消息作为标题
            const title =
              conv.title === '新对话' && message.role === 'user'
                ? message.content.slice(0, 20) + (message.content.length > 20 ? '...' : '')
                : conv.title
            return { ...conv, messages, title }
          }),
        }))
      },

      updateLastAssistantMessage: (conversationId, content) => {
        set((state) => ({
          conversations: state.conversations.map((conv) => {
            if (conv.id !== conversationId) return conv
            const messages = [...conv.messages]
            const lastIdx = messages.length - 1
            if (lastIdx >= 0 && messages[lastIdx].role === 'assistant') {
              messages[lastIdx] = { ...messages[lastIdx], content }
            }
            return { ...conv, messages }
          }),
        }))
      },

      getCurrentConversation: () => {
        const state = get()
        return state.conversations.find((c) => c.id === state.currentConversationId) || null
      },

      deleteConversation: (id) => {
        set((state) => {
          const conversations = state.conversations.filter((c) => c.id !== id)
          const currentConversationId =
            state.currentConversationId === id
              ? conversations[0]?.id || null
              : state.currentConversationId
          return { conversations, currentConversationId }
        })
      },
    }),
    {
      name: 'oa_chat',
    },
  ),
)
