import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatView from './components/ChatView'
import PositionView from './components/PositionView'
import ContentView from './components/ContentView'
import SettingsView from './components/SettingsView'
import { useThemeStore } from './stores/useThemeStore'

type View = 'chat' | 'position' | 'content' | 'settings'

function App() {
  const [currentView, setCurrentView] = useState<View>('chat')
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatView />
      case 'position':
        return <PositionView />
      case 'content':
        return <ContentView />
      case 'settings':
        return <SettingsView />
      default:
        return <ChatView />
    }
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 overflow-hidden">
        {renderView()}
      </div>
    </div>
  )
}

export default App
