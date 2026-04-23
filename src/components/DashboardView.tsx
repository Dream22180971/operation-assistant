import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, MessageSquare, Calendar, Clock } from 'lucide-react'

const DashboardView: React.FC = () => {
  const trafficData = [
    { name: '1月', value: 1200 },
    { name: '2月', value: 1900 },
    { name: '3月', value: 1500 },
    { name: '4月', value: 2300 },
    { name: '5月', value: 2900 },
    { name: '6月', value: 3200 },
  ]

  const engagementData = [
    { name: '1月', likes: 300, comments: 120, shares: 80 },
    { name: '2月', likes: 450, comments: 180, shares: 120 },
    { name: '3月', likes: 380, comments: 150, shares: 100 },
    { name: '4月', likes: 520, comments: 210, shares: 150 },
    { name: '5月', likes: 650, comments: 280, shares: 200 },
    { name: '6月', likes: 720, comments: 310, shares: 230 },
  ]

  const conversionData = [
    { name: '社交', value: 35 },
    { name: '搜索', value: 25 },
    { name: '直接', value: 20 },
    { name: '邮件', value: 15 },
    { name: '其他', value: 5 },
  ]

  const COLORS = ['#F97316', '#EAB308', '#10B981', '#3B82F6', '#8B5CF6']

  const keyMetrics = [
    { title: '总访问量', value: '12,500', icon: TrendingUp, change: '+15.2%' },
    { title: '新增用户', value: '2,340', icon: Users, change: '+8.7%' },
    { title: '互动率', value: '4.2%', icon: MessageSquare, change: '+2.1%' },
    { title: '转化率', value: '3.8%', icon: Calendar, change: '+0.5%' },
  ]

  return (
    <div className="h-full p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">数据分析仪表盘</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                <span className="text-sm text-green-500">{metric.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">流量趋势</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#F97316" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">互动数据</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#F97316" />
                <Bar dataKey="comments" fill="#EAB308" />
                <Bar dataKey="shares" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">转化来源</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-md font-semibold text-gray-700 mb-4">关键洞察</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">社交媒体是主要流量来源，占比35%</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">搜索流量呈上升趋势，环比增长12%</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">直接访问用户转化率最高，达到5.2%</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">邮件营销效果稳定，ROI达到1:4</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView