import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatView from './components/ChatView'
import DashboardView from './components/DashboardView'
import TasksView from './components/TasksView'
import ContentView from './components/ContentView'
import SettingsView from './components/SettingsView'

function App() {
  const [currentView, setCurrentView] = useState<string>('chat')

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatView />
      case 'dashboard':
        return <DashboardView />
      case 'tasks':
        return <TasksView />
      case 'content':
        return <ContentView />
      case 'settings':
        return <SettingsView />
      default:
        return <ChatView />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>
    </div>
  )
}

export default App