import { Chat, BarChart3, CheckSquare, FileEdit, Settings, Plus } from 'lucide-react'

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'chat', label: '聊天', icon: Chat },
    { id: 'dashboard', label: '仪表盘', icon: BarChart3 },
    { id: 'tasks', label: '任务', icon: CheckSquare },
    { id: 'content', label: '内容', icon: FileEdit },
    { id: 'settings', label: '设置', icon: Settings },
  ]

  const handleNewConversation = () => {
    onViewChange('chat')
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">运营小助手</h1>
      </div>
      
      <div className="p-4">
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          新建对话
        </button>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === item.id ? 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-md ${currentView === item.id ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' : 'text-gray-500'}`}>
                <Icon size={18} />
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">最近对话</div>
        <div className="mt-2 space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm">
              对话 {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar