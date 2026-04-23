import { useState } from 'react'
import { CheckSquare, Plus, Clock, Calendar, AlertCircle, Trash2, Check } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  createdAt: string
}

const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: '分析上周数据',
      description: '分析上周的运营数据，生成报告',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-12-25',
      createdAt: '2024-12-20',
    },
    {
      id: 2,
      title: '策划新年活动',
      description: '策划2025年新年活动方案',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-12-30',
      createdAt: '2024-12-21',
    },
    {
      id: 3,
      title: '优化内容策略',
      description: '根据数据分析结果优化内容策略',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-12-22',
      createdAt: '2024-12-19',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: '',
  })

  const handleAddTask = () => {
    if (newTask.title) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        status: 'pending',
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setTasks([...tasks, task])
      setIsModalOpen(false)
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' })
    }
  }

  const handleStatusChange = (id: number, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ))
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-orange-100 text-orange-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">任务管理</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          新建任务
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            待处理
          </h3>
          <div className="space-y-4">
            {tasks.filter(task => task.status === 'pending').map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    待处理
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                    <Clock size={14} />
                    <span>{task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(task.id, 'in_progress')}
                    className="flex-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
                  >
                    开始
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Clock size={20} />
            进行中
          </h3>
          <div className="space-y-4">
            {tasks.filter(task => task.status === 'in_progress').map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    进行中
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                    <Clock size={14} />
                    <span>{task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(task.id, 'completed')}
                    className="flex-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    完成
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Check size={20} />
            已完成
          </h3>
          <div className="space-y-4">
            {tasks.filter(task => task.status === 'completed').map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800 line-through opacity-70">{task.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    已完成
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-through opacity-70">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                    <Clock size={14} />
                    <span>{task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="w-full px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 size={16} className="inline mr-1" />
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">新建任务</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">任务标题</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="输入任务标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">任务描述</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="输入任务描述"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">截止日期</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddTask}
                className="flex-1 px-4 py-2 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                创建任务
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TasksView