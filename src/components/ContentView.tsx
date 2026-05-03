import { useState, useRef } from 'react'
import { FileEdit, Copy, Check, Sparkles, AlertCircle, Save, Trash2, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useSettingsStore } from '../stores/useSettingsStore'
import { useDraftStore } from '../stores/useDraftStore'
import { chatStream } from '../services/ai'
import { buildContentMessages } from '../prompts/platforms'
import type { Platform, WechatMode } from '../types'

const PLATFORMS: { id: Platform; label: string; desc: string }[] = [
  { id: 'xiaohongshu', label: '小红书', desc: '种草图文风格' },
  { id: 'douyin', label: '抖音', desc: '长文图文脚本' },
  { id: 'wechat', label: '公众号', desc: '长文 / 贴图短文' },
]

export default function ContentView() {
  const [platform, setPlatform] = useState<Platform>('xiaohongshu')
  const [wechatMode, setWechatMode] = useState<WechatMode>('long')
  const [topic, setTopic] = useState('')
  const [extra, setExtra] = useState('')
  const [result, setResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDrafts, setShowDrafts] = useState(false)
  const [saved, setSaved] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const { isConfigured } = useSettingsStore()
  const { drafts, addDraft, deleteDraft } = useDraftStore()

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) return

    if (!isConfigured()) {
      setError('请先在设置页面配置 API Key')
      return
    }

    setError(null)
    setResult('')
    setIsGenerating(true)
    abortRef.current = new AbortController()

    const messages = buildContentMessages(platform, topic, extra, platform === 'wechat' ? wechatMode : undefined)

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

  const handleSaveDraft = () => {
    if (!result) return
    addDraft({ platform, wechatMode, topic, extra, content: result })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLoadDraft = (draft: typeof drafts[0]) => {
    setPlatform(draft.platform)
    if (draft.wechatMode) setWechatMode(draft.wechatMode)
    setTopic(draft.topic)
    setExtra(draft.extra)
    setResult(draft.content)
    setShowDrafts(false)
  }

  if (!isConfigured()) {
    return (
      <div className="h-full flex items-center justify-center p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'var(--accent-glow)' }}
          >
            <FileEdit size={32} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            内容创作
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            请先在设置页面配置 AI 模型的 API Key，即可使用内容生成功能。
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
            内容创作
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            选择平台，输入主题，一键生成适配内容
          </p>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
            选择平台
          </label>
          <div className="grid grid-cols-3 gap-3">
            {PLATFORMS.map((p) => {
              const isActive = platform === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className="p-4 rounded-xl border text-left transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    borderColor: isActive ? 'var(--accent)' : 'var(--border-color)',
                    boxShadow: isActive ? '0 0 20px var(--accent-glow)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = 'var(--text-muted)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = 'var(--border-color)'
                  }}
                >
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {p.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {p.desc}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* WeChat Sub-mode */}
        {platform === 'wechat' && (
          <div className="mb-6">
            <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              内容类型
            </label>
            <div className="flex gap-2">
              {(['long', 'short'] as WechatMode[]).map((mode) => {
                const isActive = wechatMode === mode
                return (
                  <button
                    key={mode}
                    onClick={() => setWechatMode(mode)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? 'var(--accent)' : 'var(--bg-secondary)',
                      color: isActive ? 'white' : 'var(--text-secondary)',
                      border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-color)'}`,
                    }}
                  >
                    {mode === 'long' ? '长文' : '贴图短文'}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Drafts Toggle */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowDrafts(!showDrafts)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: showDrafts ? 'var(--accent-glow)' : 'var(--bg-secondary)',
              color: showDrafts ? 'var(--accent)' : 'var(--text-muted)',
              border: `1px solid ${showDrafts ? 'var(--accent)' : 'var(--border-color)'}`,
            }}
          >
            <Clock size={12} />
            草稿箱 ({drafts.length})
          </button>
        </div>

        {/* Drafts Panel */}
        {showDrafts && (
          <div
            className="rounded-xl border p-4 mb-6 max-h-64 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            {drafts.length === 0 ? (
              <p className="text-sm text-center py-4" style={{ color: 'var(--text-muted)' }}>
                暂无草稿
              </p>
            ) : (
              <div className="space-y-2">
                {drafts.map((draft) => {
                  const platformLabel = PLATFORMS.find((p) => p.id === draft.platform)?.label || draft.platform
                  return (
                    <div
                      key={draft.id}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                      onClick={() => handleLoadDraft(draft)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)' }}>
                            {platformLabel}
                          </span>
                          <span className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                            {draft.topic}
                          </span>
                        </div>
                        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                          {draft.content.slice(0, 60)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {new Date(draft.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteDraft(draft.id)
                          }}
                          className="p-1 rounded transition-colors"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Input Area */}
        <div
          className="rounded-xl border p-6 mb-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                主题 / 关键词
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="例如：2025年春季护肤攻略"
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
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                补充说明（可选）
              </label>
              <textarea
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="例如：重点推荐平价好物，面向学生群体"
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
              disabled={!topic.trim() || isGenerating}
              className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                backgroundColor: topic.trim() && !isGenerating ? 'var(--accent)' : 'var(--bg-tertiary)',
                color: topic.trim() && !isGenerating ? 'white' : 'var(--text-muted)',
              }}
              onMouseEnter={(e) => {
                if (topic.trim() && !isGenerating) e.currentTarget.style.opacity = '0.9'
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
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  生成内容
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
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                生成结果
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: saved ? 'rgba(52,211,153,0.15)' : 'var(--bg-tertiary)',
                    color: saved ? 'var(--success)' : 'var(--text-muted)',
                    border: `1px solid ${saved ? 'rgba(52,211,153,0.3)' : 'var(--border-color)'}`,
                  }}
                >
                  {saved ? <Check size={12} /> : <Save size={12} />}
                  {saved ? '已保存' : '存草稿'}
                </button>
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
