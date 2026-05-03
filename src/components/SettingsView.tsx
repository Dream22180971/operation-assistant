import { useState } from 'react'
import { Eye, EyeOff, Check, ExternalLink } from 'lucide-react'
import { useSettingsStore } from '../stores/useSettingsStore'
import { PROVIDERS } from '../services/ai'
import type { AIProvider } from '../types'

const PROVIDER_LIST: { id: AIProvider; color: string }[] = [
  { id: 'qwen', color: '#8b5cf6' },
  { id: 'deepseek', color: '#3b82f6' },
  { id: 'kimi', color: '#6b7280' },
  { id: 'doubao', color: '#10b981' },
  { id: 'ernie', color: '#ef4444' },
]

export default function SettingsView() {
  const { provider, apiKey, model, endpointId, setProvider, setApiKey, setModel, setEndpointId } = useSettingsStore()
  const [showApiKey, setShowApiKey] = useState(false)
  const [saved, setSaved] = useState(false)

  const currentConfig = PROVIDERS[provider]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="h-full overflow-y-auto p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            设置
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            配置 AI 模型和 API Key
          </p>
        </div>

        {/* AI Model Selection */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
            选择 AI 模型
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROVIDER_LIST.map(({ id, color }) => {
              const config = PROVIDERS[id]
              const isActive = provider === id
              return (
                <button
                  key={id}
                  onClick={() => setProvider(id)}
                  className="relative p-4 rounded-xl border text-left transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    borderColor: isActive ? color : 'var(--border-color)',
                    boxShadow: isActive ? `0 0 20px ${color}20` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = 'var(--text-muted)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = 'var(--border-color)'
                  }}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: color }}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <span className="font-bold text-sm" style={{ color }}>{config.name[0]}</span>
                  </div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {config.name}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {config.description}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* API Key Configuration */}
        <div
          className="rounded-xl border p-6 mb-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
            {currentConfig.name} API Key
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="输入你的 API Key"
                  className="w-full px-4 py-3 pr-12 rounded-lg border text-sm transition-colors focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {currentConfig.needsEndpointId && (
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  接入点 ID (Endpoint ID)
                </label>
                <input
                  type="text"
                  value={endpointId}
                  onChange={(e) => setEndpointId(e.target.value)}
                  placeholder="ep-xxxxxxxxxx"
                  className="w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                />
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                  在火山引擎控制台创建推理接入点后获取
                </p>
              </div>
            )}

            {!currentConfig.needsEndpointId && currentConfig.models.length > 0 && (
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  模型
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {currentConfig.models.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-lg font-medium text-sm transition-all duration-200"
              style={{
                backgroundColor: saved ? 'var(--success)' : 'var(--accent)',
                color: 'white',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {saved ? '✓ 已保存' : '保存设置'}
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
            获取 API Key
          </h3>
          <div className="space-y-2">
            {PROVIDER_LIST.map(({ id }) => {
              const config = PROVIDERS[id]
              const urls: Record<AIProvider, string> = {
                qwen: 'https://dashscope.console.aliyun.com/',
                deepseek: 'https://platform.deepseek.com/',
                kimi: 'https://platform.kimi.com/',
                doubao: 'https://console.volcengine.com/ark',
                ernie: 'https://console.bce.baidu.com/qianfan/',
              }
              return (
                <div
                  key={id}
                  className="flex items-center justify-between py-2.5 border-b last:border-0"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {config.name}
                  </span>
                  <a
                    href={urls[id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-1 transition-colors"
                    style={{ color: 'var(--accent)' }}
                  >
                    获取 Key <ExternalLink size={12} />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
