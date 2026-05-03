export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: number
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: number
}

export type AIProvider = 'qwen' | 'deepseek' | 'kimi' | 'doubao' | 'ernie'

export type Platform = 'xiaohongshu' | 'douyin' | 'wechat'

export type WechatMode = 'long' | 'short'

export interface ProviderConfig {
  id: AIProvider
  name: string
  baseUrl: string
  defaultModel: string
  models: string[]
  needsEndpointId: boolean
  description: string
}
