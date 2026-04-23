import { useState } from 'react'
import { Bot, Send, MessageSquare, TrendingUp, FileText, PieChart, Calendar, Clock } from 'lucide-react'

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '你好！我是你的运营小助手，有什么可以帮你的吗？',
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        role: 'user' as const,
        content: inputValue,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages([...messages, newMessage])
      setInputValue('')

      // 模拟AI回复
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          role: 'assistant' as const,
          content: '这是一个示例回复，实际使用时会调用AI模型生成回答。',
          timestamp: new Date().toLocaleTimeString(),
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const quickQuestions = [
    { id: 1, label: '追踪热点', icon: TrendingUp },
    { id: 2, label: '策划选题', icon: FileText },
    { id: 3, label: '润色文章', icon: MessageSquare },
    { id: 4, label: '分析数据', icon: PieChart },
    { id: 5, label: '生成周报', icon: Calendar },
    { id: 6, label: '月度总结', icon: Clock },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">运营小助手</h2>
            <p className="text-sm text-green-500">在线</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 mr-3">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' : 'bg-white border border-gray-200'} rounded-xl p-4 shadow-sm`}>
                <div className="prose max-w-none">{message.content}</div>
                <div className="mt-2 text-xs text-gray-500 text-right">{message.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Icon size={16} />
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="给运营小助手发消息..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleSend}
            className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">运营小助手可能会犯错，请核实重要信息</p>
      </div>
    </div>
  )
}

export default ChatView