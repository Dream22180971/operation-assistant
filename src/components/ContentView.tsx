import { useState } from 'react'
import { FileEdit, TrendingUp, MessageSquare, Sparkles, Save } from 'lucide-react'

const ContentView: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleOptimize = () => {
    setIsOptimizing(true)
    // 模拟AI优化过程
    setTimeout(() => {
      setTitle('如何在2025年提升运营效果：5个实用策略')
      setContent('在当今竞争激烈的市场环境中，运营策略的重要性不言而喻。本文将为您分享5个实用的运营策略，帮助您在2025年实现业务增长。\n\n## 1. 数据驱动的决策\n\n利用数据分析工具，深入了解用户行为和市场趋势，制定更加精准的运营策略。\n\n## 2. 内容营销创新\n\n通过创建高质量、有价值的内容，吸引目标受众，建立品牌权威。\n\n## 3. 社交媒体优化\n\n根据不同平台的特点，制定差异化的内容策略，提高用户互动率。\n\n## 4. 用户体验提升\n\n优化产品和服务的用户体验，提高用户满意度和忠诚度。\n\n## 5. 合作与共赢\n\n与行业合作伙伴建立良好的关系，实现资源共享和优势互补。\n\n通过以上策略的实施，相信您的运营效果将会得到显著提升。')
      setIsOptimizing(false)
    }, 1500)
  }

  const generateContent = () => {
    setIsOptimizing(true)
    // 模拟AI内容生成
    setTimeout(() => {
      setTitle('2025年内容营销趋势分析')
      setContent('随着数字化转型的不断深入，内容营销也在不断演变。2025年，我们将看到以下几个重要趋势：\n\n### 1. 短视频内容的崛起\n\n短视频以其短小精悍、易于传播的特点，成为内容营销的重要形式。\n\n### 2. 个性化内容推荐\n\n基于用户数据和AI技术，为不同用户提供个性化的内容推荐。\n\n### 3. 互动式内容的流行\n\n通过互动式内容，如问答、投票、小游戏等，提高用户参与度。\n\n### 4. 内容与电商的融合\n\n将内容营销与电商紧密结合，实现从内容到转化的闭环。\n\n### 5. 社会责任内容的重要性\n\n品牌通过发布社会责任相关的内容，提升品牌形象和社会影响力。\n\n这些趋势将为内容营销带来新的机遇和挑战，企业需要及时调整策略，以适应市场的变化。')
      setIsOptimizing(false)
    }, 1500)
  }

  return (
    <div className="h-full p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">内容创作</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <FileEdit size={20} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">内容编辑器</h3>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入标题..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg font-medium"
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="输入内容..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[300px]"
          />

          <div className="flex gap-3">
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isOptimizing ? <Sparkles size={18} className="animate-spin" /> : <MessageSquare size={18} />}
              {isOptimizing ? '优化中...' : '智能优化'}
            </button>
            
            <button
              onClick={generateContent}
              disabled={isOptimizing}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <TrendingUp size={18} />
              生成示例内容
            </button>
            
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <Save size={18} />
              保存
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">内容建议</h3>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h4 className="font-medium text-gray-800">热门话题：AI在运营中的应用</h4>
              <p className="text-sm text-gray-600 mt-1">探讨AI如何提升运营效率和效果</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h4 className="font-medium text-gray-800">案例分析：成功的内容营销策略</h4>
              <p className="text-sm text-gray-600 mt-1">分析行业领先企业的内容营销成功案例</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h4 className="font-medium text-gray-800">趋势预测：2025年运营方向</h4>
              <p className="text-sm text-gray-600 mt-1">预测2025年运营领域的发展趋势</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">AI写作助手</h3>
          <div className="space-y-4">
            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-2">标题建议</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-700 hover:text-orange-600 cursor-pointer">如何利用AI提升运营效果</li>
                <li className="text-gray-700 hover:text-orange-600 cursor-pointer">2025年运营策略指南</li>
                <li className="text-gray-700 hover:text-orange-600 cursor-pointer">内容营销的未来发展趋势</li>
              </ul>
            </div>
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">内容结构</h4>
              <p className="text-sm text-gray-700">建议采用"引言-主体-结论"的结构，主体部分可分为3-5个小节，每小节集中讨论一个主题。</p>
            </div>
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">写作技巧</h4>
              <p className="text-sm text-gray-700">使用简洁明了的语言，避免专业术语过多；加入具体案例和数据，增强说服力；保持逻辑清晰，结构合理。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentView