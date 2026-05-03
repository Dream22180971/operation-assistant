import OpenAI from 'openai'
import type { AIProvider } from '../types'

interface ProviderConfig {
  name: string
  baseUrl: string
  defaultModel: string
  models: { id: string; name: string }[]
  needsEndpointId: boolean
  description: string
}

export const PROVIDERS: Record<AIProvider, ProviderConfig> = {
  qwen: {
    name: '通义千问',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    defaultModel: 'qwen-plus',
    models: [
      { id: 'qwen-turbo', name: 'Qwen Turbo（快速）' },
      { id: 'qwen-plus', name: 'Qwen Plus（均衡）' },
      { id: 'qwen-max', name: 'Qwen Max（最强）' },
      { id: 'qwen-long', name: 'Qwen Long（长文本）' },
    ],
    needsEndpointId: false,
    description: '阿里云出品，中文能力强，性价比高',
  },
  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat' },
      { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner（推理）' },
    ],
    needsEndpointId: false,
    description: '深度求索，推理能力强，价格实惠',
  },
  kimi: {
    name: 'Kimi',
    baseUrl: 'https://api.moonshot.cn/v1',
    defaultModel: 'moonshot-v1-8k',
    models: [
      { id: 'moonshot-v1-8k', name: '8K 上下文' },
      { id: 'moonshot-v1-32k', name: '32K 上下文' },
      { id: 'moonshot-v1-128k', name: '128K 上下文' },
    ],
    needsEndpointId: false,
    description: '月之暗面出品，长文本理解能力强',
  },
  doubao: {
    name: '豆包',
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    defaultModel: '',
    models: [],
    needsEndpointId: true,
    description: '字节跳动出品，需在火山引擎控制台创建推理接入点',
  },
  ernie: {
    name: '文心一言',
    baseUrl: 'https://qianfan.baidubce.com/v2',
    defaultModel: 'ernie-4.0-8k',
    models: [
      { id: 'ernie-speed-8k', name: 'ERNIE Speed（快速）' },
      { id: 'ernie-3.5-8k', name: 'ERNIE 3.5' },
      { id: 'ernie-4.0-8k', name: 'ERNIE 4.0（最强）' },
      { id: 'ernie-4.0-128k', name: 'ERNIE 4.0 128K（长文本）' },
    ],
    needsEndpointId: false,
    description: '百度出品，国内最早的大模型之一',
  },
}

function getClient(provider: AIProvider, apiKey: string): OpenAI {
  const config = PROVIDERS[provider]
  return new OpenAI({
    apiKey,
    baseURL: config.baseUrl,
    dangerouslyAllowBrowser: true,
  })
}

export interface ChatOptions {
  provider: AIProvider
  apiKey: string
  model?: string
  endpointId?: string
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[]
  signal?: AbortSignal
}

export async function chatStream(options: ChatOptions): Promise<ReadableStream<string>> {
  const { provider, apiKey, model, endpointId, messages, signal } = options
  const config = PROVIDERS[provider]
  const client = getClient(provider, apiKey)

  const modelId = provider === 'doubao' ? (endpointId || '') : (model || config.defaultModel)

  const response = await client.chat.completions.create(
    {
      model: modelId,
      messages,
      stream: true,
    },
    { signal },
  )

  return new ReadableStream<string>({
    async start(controller) {
      try {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            controller.enqueue(content)
          }
        }
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })
}

export async function chat(options: ChatOptions): Promise<string> {
  const { provider, apiKey, model, endpointId, messages, signal } = options
  const config = PROVIDERS[provider]
  const client = getClient(provider, apiKey)

  const modelId = provider === 'doubao' ? (endpointId || '') : (model || config.defaultModel)

  const response = await client.chat.completions.create(
    {
      model: modelId,
      messages,
      stream: false,
    },
    { signal },
  )

  return response.choices[0]?.message?.content || ''
}
