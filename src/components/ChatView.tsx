import { useState, useRef, useEffect } from 'react'
import { Bot, Send, TrendingUp, FileText, Sparkles, BarChart3, AlertCircle, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChatStore, createMessage } from '../stores/useChatStore'
import { useSettingsStore } from '../stores/useSettingsStore'
import { chatStream } from '../services/ai'
import { CHAT_SYSTEM_PROMPT } from '../prompts/chat'

const QUICK_PROMPTS = [
  { label: '追踪热点', icon: TrendingUp, prompt: '请帮我分析最近的运营热点话题，给出 3-5 个可以跟进的选题方向。' },
  { label: '策划选题', icon: FileText, prompt: '请帮我策划 5 个有创意的内容选题，要求有吸引力、有传播力。' },
  { label: '润色文章', icon: Sparkles, prompt: '请帮我润色优化以下文案，提升表达力和传播力：' },
  { label: '分析数据', icon: BarChart3, prompt: '请帮我分析以下运营数据，给出优化建议：' },
]

export default function ChatView() {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { conversations, currentConversationId, addConversation, addMessage, updateLastAssistantMessage } = useChatStore()
  const { isConfigured } = useSettingsStore()

  const currentConversation = conversations.find((c) => c.id === currentConversationId)
  const messages = currentConversation?.messages || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text?: string) => {
    const content = text || inputValue.trim()
    if (!content || isLoading) return

    if (!isConfigured()) {
      setError('请先在设置页面配置 API Key')
      return
    }

    setError(null)

    let convId = currentConversationId
    if (!convId) {
      convId = addConversation()
    }

    const userMsg = createMessage('user', content)
    addMessage(convId, userMsg)
    setInputValue('')

    const assistantMsg = createMessage('assistant', '')
    addMessage(convId, assistantMsg)

    setIsLoading(true)
    abortRef.current = new AbortController()

    try {
      const { provider, apiKey, model, endpointId } = useSettingsStore.getState()
      const stream = await chatStream({
        provider,
        apiKey,
        model,
        endpointId,
        messages: [
          { role: 'system', content: CHAT_SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
          { role: 'user', content },
        ],
        signal: abortRef.current.signal,
      })

      const reader = stream.getReader()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullContent += value
        updateLastAssistantMessage(convId!, fullContent)
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const errorMsg = err instanceof Error ? err.message : '请求失败，请重试'
      setError(errorMsg)
      updateLastAssistantMessage(convId!, `抱歉，出现了错误：${errorMsg}`)
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCopyMessage = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // 未配置引导页
  if (!isConfigured()) {
    return (
      <div className="h-full flex items-center justify-center p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'var(--accent-glow)' }}
          >
            <Bot size={32} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            欢迎使用运营小助手
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            请先在设置页面配置 AI 模型的 API Key，即可开始使用智能对话功能。
          </p>
          <div className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--accent)' }}>
            <AlertCircle size={16} />
            <span>点击左侧"设置"进行配置</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-glow)' }}
          >
            <Bot size={16} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              运营小助手
            </h2>
            <p className="text-xs" style={{ color: 'var(--success)' }}>
              在线
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: 'var(--accent-glow)' }}
            >
              <Bot size={28} style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              有什么可以帮你的？
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              选择快捷提示或直接输入你的问题
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_PROMPTS.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSend(item.prompt)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent-light)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-1"
                  style={{ backgroundColor: 'var(--accent-glow)' }}
                >
                  <Bot size={14} style={{ color: 'var(--accent)' }} />
                </div>
              )}
              <div
                className="group relative max-w-[80%] rounded-xl px-4 py-3"
                style={{
                  backgroundColor: message.role === 'user' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: message.role === 'user' ? 'white' : 'var(--text-primary)',
                  border: message.role === 'user' ? 'none' : '1px solid var(--border-color)',
                }}
              >
                {message.role === 'assistant' ? (
                  <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                )}
                <div className="flex items-center justify-between mt-1.5">
                  <div
                    className="text-xs"
                    style={{
                      color: message.role === 'user' ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <button
                    onClick={() => handleCopyMessage(message.id, message.content)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1 rounded"
                    style={{
                      color: message.role === 'user' ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
                    }}
                  >
                    {copiedId === message.id ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="mx-6 mb-3 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
          style={{ backgroundColor: 'rgba(248,113,113,0.1)', color: 'var(--error)', border: '1px solid rgba(248,113,113,0.2)' }}
        >
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Input */}
      <div
        className="p-4 border-t"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
      >
        {messages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_PROMPTS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  onClick={() => handleSend(item.prompt)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  <Icon size={12} />
                  {item.label}
                </button>
              )
            })}
          </div>
        )}
        <div className="flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="给运营小助手发消息..."
            rows={1}
            className="flex-1 px-4 py-3 rounded-lg border text-sm resize-none transition-colors focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{
              backgroundColor: inputValue.trim() && !isLoading ? 'var(--accent)' : 'var(--bg-tertiary)',
              color: inputValue.trim() && !isLoading ? 'white' : 'var(--text-muted)',
            }}
          >
            {isLoading ? (
              <div
                className="w-4 h-4 border-2 rounded-full animate-spin"
                style={{ borderColor: 'var(--text-muted)', borderTopColor: 'var(--accent)' }}
              />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          AI 助手可能会犯错，请核实重要信息
        </p>
      </div>
    </div>
  )
}
