import { useState, useRef } from 'react'
import { Target, Sparkles, Copy, Check, AlertCircle, Compass } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useSettingsStore } from '../stores/useSettingsStore'
import { chatStream } from '../services/ai'
import { buildPositioningMessages } from '../prompts/positioning'
import type { Platform } from '../types'

const PLATFORMS: { id: Platform; label: string; icon: string }[] = [
  { id: 'xiaohongshu', label: '小红书', icon: '📕' },
  { id: 'douyin', label: '抖音', icon: '🎵' },
  { id: 'wechat', label: '公众号', icon: '💬' },
]

export default function PositionView() {
  const [field, setField] = useState('')
  const [platform, setPlatform] = useState<Platform>('xiaohongshu')
  const [targetAudience, setTargetAudience] = useState('')
  const [resources, setResources] = useState('')
  const [result, setResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const { isConfigured } = useSettingsStore()

  const handleGenerate = async () => {
    if (!field.trim() || isGenerating) return

    if (!isConfigured()) {
      setError('请先在设置页面配置 API Key')
      return
    }

    setError(null)
    setResult('')
    setIsGenerating(true)
    abortRef.current = new AbortController()

    const messages = buildPositioningMessages(field, platform, targetAudience, resources)

    try {
      const { provider, apiKey, model, endpointId } = useSettingsStore.getState()
      const stream = await chatStream({
        provider,
        apiKey,
        model,
        endpointId,
        messages,
        signal: abortRef.current.signal,
      })

      const reader = stream.getReader()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullContent += value
        setResult(fullContent)
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const errorMsg = err instanceof Error ? err.message : '生成失败，请重试'
      setError(errorMsg)
    } finally {
      setIsGenerating(false)
      abortRef.current = null
    }
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = result
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isConfigured()) {
    return (
      <div className="h-full flex items-center justify-center p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'var(--accent-glow)' }}
          >
            <Compass size={32} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            账号定位
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            请先在设置页面配置 AI 模型的 API Key，即可使用账号定位功能。
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
    <div className="h-full overflow-y-auto p-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            账号定位
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            告诉我你的情况，AI 帮你找到最佳赛道和定位
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-xl border p-6 mb-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="space-y-4">
            {/* Field */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                擅长领域 / 兴趣 <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <input
                type="text"
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="例如：美妆护肤、职场干货、母婴育儿、美食探店..."
                className="w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                目标平台
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PLATFORMS.map((p) => {
                  const isActive = platform === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className="py-2.5 rounded-lg border text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? 'var(--accent-glow)' : 'var(--bg-tertiary)',
                        borderColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                      }}
                    >
                      <span className="mr-1.5">{p.icon}</span>
                      {p.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                目标受众
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="例如：18-25岁女大学生、25-35岁职场新人..."
                className="w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              />
            </div>

            {/* Resources */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                已有资源 / 优势
              </label>
              <textarea
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                placeholder="例如：有摄影基础、在某行业工作5年、有供应链资源..."
                rows={2}
                className="w-full px-4 py-3 rounded-lg border text-sm resize-none transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!field.trim() || isGenerating}
              className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                backgroundColor: field.trim() && !isGenerating ? 'var(--accent)' : 'var(--bg-tertiary)',
                color: field.trim() && !isGenerating ? 'white' : 'var(--text-muted)',
              }}
              onMouseEnter={(e) => {
                if (field.trim() && !isGenerating) e.currentTarget.style.opacity = '0.9'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              {isGenerating ? (
                <>
                  <div
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{ borderColor: 'var(--text-muted)', borderTopColor: 'var(--accent)' }}
                  />
                  分析中...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  生成定位方案
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-6 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
            style={{ backgroundColor: 'rgba(248,113,113,0.1)', color: 'var(--error)', border: '1px solid rgba(248,113,113,0.2)' }}
          >
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={16} style={{ color: 'var(--accent)' }} />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  定位方案
                </h3>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: copied ? 'rgba(52,211,153,0.15)' : 'var(--bg-tertiary)',
                  color: copied ? 'var(--success)' : 'var(--text-muted)',
                  border: `1px solid ${copied ? 'rgba(52,211,153,0.3)' : 'var(--border-color)'}`,
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? '已复制' : '复制'}
              </button>
            </div>
            <div
              className="text-sm leading-relaxed prose prose-sm max-w-none"
              style={{ color: 'var(--text-primary)' }}
            >
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
            {isGenerating && (
              <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: 'var(--accent)' }}>
                <div
                  className="w-3 h-3 border-2 rounded-full animate-spin"
                  style={{ borderColor: 'var(--accent-glow)', borderTopColor: 'var(--accent)' }}
                />
                正在生成...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
