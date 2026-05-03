import { MessageSquare, Compass, FileEdit, Settings, Plus, Trash2, Sparkles, Sun, Moon } from 'lucide-react'
import { useChatStore } from '../stores/useChatStore'
import { useThemeStore } from '../stores/useThemeStore'

type View = 'chat' | 'position' | 'content' | 'settings'

interface SidebarProps {
  currentView: View
  onViewChange: (view: View) => void
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { conversations, currentConversationId, setCurrentConversation, createConversation, deleteConversation } = useChatStore()
  const { theme, toggleTheme } = useThemeStore()

  const menuItems: { id: View; label: string; icon: typeof MessageSquare }[] = [
    { id: 'chat', label: '聊天', icon: MessageSquare },
    { id: 'position', label: '定位', icon: Compass },
    { id: 'content', label: '内容', icon: FileEdit },
    { id: 'settings', label: '设置', icon: Settings },
  ]

  const handleNewConversation = () => {
    createConversation()
    onViewChange('chat')
  }

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id)
    onViewChange('chat')
  }

  return (
    <div
      className="w-64 flex flex-col border-r"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent-glow)' }}>
            <Sparkles size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              运营小助手
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              AI Content Assistant
            </p>
          </div>
        </div>
      </div>

      {/* New Conversation Button */}
      <div className="p-4">
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'white',
          }}
        >
          <Plus size={16} />
          新建对话
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 mb-0.5"
              style={{
                backgroundColor: isActive ? 'var(--accent-glow)' : 'transparent',
                color: isActive ? 'var(--accent-light)' : 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Conversations List */}
      {currentView === 'chat' && (
        <div className="flex-1 px-3 py-2 border-t overflow-y-auto min-h-0" style={{ borderColor: 'var(--border-color)' }}>
          <div className="px-3 py-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            最近对话
          </div>
          <div className="space-y-0.5">
            {conversations.length === 0 && (
              <div className="px-3 py-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                暂无对话
              </div>
            )}
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-150"
                style={{
                  backgroundColor: currentConversationId === conv.id ? 'var(--accent-glow)' : 'transparent',
                  color: currentConversationId === conv.id ? 'var(--accent-light)' : 'var(--text-secondary)',
                }}
                onClick={() => handleSelectConversation(conv.id)}
                onMouseEnter={(e) => {
                  if (currentConversationId !== conv.id) e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                }}
                onMouseLeave={(e) => {
                  if (currentConversationId !== conv.id) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <span className="flex-1 truncate">{conv.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteConversation(conv.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="p-4 border-t flex items-center justify-between"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          v2.0
        </p>
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
          title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </div>
  )
}
