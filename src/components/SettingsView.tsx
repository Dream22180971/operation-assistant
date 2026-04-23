import { useState } from 'react'
import { Settings, Key, Save, Eye, EyeOff } from 'lucide-react'

const SettingsView: React.FC = () => {
  const [aiModel, setAiModel] = useState('qianwen') // 阿里千问
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // 模拟保存过程
    setTimeout(() => {
      setIsSaving(false)
      alert('设置已保存！')
    }, 1000)
  }

  const aiModels = [
    { value: 'qianwen', label: '阿里千问', description: '阿里巴巴开发的大语言模型' },
    { value: 'gpt4', label: 'GPT-4', description: 'OpenAI开发的先进语言模型' },
    { value: 'claude', label: 'Claude', description: 'Anthropic开发的AI助手' },
  ]

  return (
    <div className="h-full p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">设置</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <Settings size={20} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">AI 模型设置</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">默认 AI 模型</label>
            <div className="space-y-3">
              {aiModels.map((model) => (
                <div key={model.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    id={model.value}
                    name="aiModel"
                    value={model.value}
                    checked={aiModel === model.value}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <label htmlFor={model.value} className="font-medium text-gray-800 cursor-pointer">
                      {model.label}
                    </label>
                    <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                  </div>
                  {model.value === 'qianwen' && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                      推荐
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API 密钥</label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
                placeholder="输入 API 密钥"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              请输入对应AI模型的API密钥，保存后立即生效
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Save size={18} />
              {isSaving ? '保存中...' : '保存设置'}
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Key size={16} />
              <span>API 密钥将安全存储</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">关于</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">版本</span>
            <span className="text-sm font-medium text-gray-800">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">更新日期</span>
            <span className="text-sm font-medium text-gray-800">2024-12-23</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">开发者</span>
            <span className="text-sm font-medium text-gray-800">运营助手团队</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsView