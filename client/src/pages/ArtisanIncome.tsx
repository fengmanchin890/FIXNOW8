import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Target,
  Clock,
  Star
} from 'lucide-react';

const ArtisanIncome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState('2025');

  const incomeData = {
    today: { amount: 1200, jobs: 3, hours: 5.5 },
    week: { amount: 8500, jobs: 18, hours: 32 },
    month: { amount: 32000, jobs: 68, hours: 125 },
    year: { amount: 280000, jobs: 580, hours: 1200 }
  };

  const monthlyData = [
    { month: '1月', income: 28000, jobs: 52, hours: 98 },
    { month: '2月', income: 25000, jobs: 45, hours: 89 },
    { month: '3月', income: 31000, jobs: 58, hours: 115 },
    { month: '4月', income: 29000, jobs: 55, hours: 108 },
    { month: '5月', income: 32000, jobs: 68, hours: 125 },
    { month: '6月', income: 18000, jobs: 35, hours: 68 }
  ];

  const serviceBreakdown = [
    { service: '水電維修', income: 12000, percentage: 37.5, jobs: 25 },
    { service: '冷氣清洗', income: 8000, percentage: 25, jobs: 20 },
    { service: '電燈安裝', income: 6000, percentage: 18.75, jobs: 15 },
    { service: '管線疏通', income: 4000, percentage: 12.5, jobs: 8 },
    { service: '其他', income: 2000, percentage: 6.25, jobs: 5 }
  ];

  const recentTransactions = [
    { id: 'T001', date: '2025-06-09', service: '水電維修', amount: 1200, customer: '陳先生', status: 'completed' },
    { id: 'T002', date: '2025-06-08', service: '冷氣清洗', amount: 800, customer: '李太太', status: 'completed' },
    { id: 'T003', date: '2025-06-08', service: '電燈安裝', amount: 600, customer: '王先生', status: 'completed' },
    { id: 'T004', date: '2025-06-07', service: '管線疏通', amount: 1500, customer: '張小姐', status: 'completed' },
    { id: 'T005', date: '2025-06-07', service: '水電維修', amount: 900, customer: '劉先生', status: 'pending' }
  ];

  const goals = {
    monthly: { target: 35000, current: 32000, percentage: 91.4 },
    jobs: { target: 75, current: 68, percentage: 90.7 },
    rating: { target: 4.8, current: 4.9, percentage: 102.1 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/artisan"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">收入分析報告</h1>
                <p className="text-gray-600">詳細了解您的收入狀況和趨勢</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                匯出報告
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'week', label: '週' },
                  { key: 'month', label: '月' },
                  { key: 'year', label: '年' }
                ].map((period) => (
                  <button
                    key={period.key}
                    onClick={() => setSelectedPeriod(period.key)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      selectedPeriod === period.key 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">本月收入</p>
                <p className="text-2xl font-bold text-gray-900">NT${incomeData.month.amount.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <DollarSign className="h-12 w-12 text-primary-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">完成工作</p>
                <p className="text-2xl font-bold text-gray-900">{incomeData.month.jobs}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.3%</span>
                </div>
              </div>
              <Target className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">工作時數</p>
                <p className="text-2xl font-bold text-gray-900">{incomeData.month.hours}h</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5.2%</span>
                </div>
              </div>
              <Clock className="h-12 w-12 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">平均評分</p>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+0.1</span>
                </div>
              </div>
              <Star className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Income Chart */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">月收入趨勢</h3>
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="w-12 text-sm text-gray-600">{data.month}</span>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${(data.income / 35000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">NT${data.income.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{data.jobs} 工作</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">服務收入分析</h3>
              <div className="space-y-4">
                {serviceBreakdown.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="w-20 text-sm text-gray-700">{service.service}</span>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${service.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">NT${service.income.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{service.jobs} 次 ({service.percentage}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">近期交易紀錄</h3>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.service}</p>
                      <p className="text-sm text-gray-600">{transaction.customer} • {transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">NT${transaction.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status === 'completed' ? '已完成' : '待付款'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goals */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">本月目標達成</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">收入目標</span>
                    <span className="text-sm font-medium">{goals.monthly.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(goals.monthly.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    NT${goals.monthly.current.toLocaleString()} / NT${goals.monthly.target.toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">工作數量</span>
                    <span className="text-sm font-medium">{goals.jobs.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(goals.jobs.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {goals.jobs.current} / {goals.jobs.target} 個工作
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">服務評分</span>
                    <span className="text-sm font-medium">{goals.rating.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(goals.rating.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {goals.rating.current} / {goals.rating.target} 星
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">效率指標</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">平均時薪</span>
                  <span className="font-semibold">NT$256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">工作完成率</span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">客戶回購率</span>
                  <span className="font-semibold text-blue-600">76%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">平均評分</span>
                  <span className="font-semibold text-yellow-600">4.9 ⭐</span>
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">主要客戶</h3>
              <div className="space-y-3">
                {[
                  { name: '陳先生', jobs: 5, amount: 4200 },
                  { name: '李太太', jobs: 4, amount: 3600 },
                  { name: '王先生', jobs: 3, amount: 2800 },
                  { name: '張小姐', jobs: 3, amount: 2400 }
                ].map((customer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.jobs} 次服務</p>
                    </div>
                    <p className="font-semibold">NT${customer.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">收入洞察</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• 水電維修是您的主要收入來源</li>
                <li>• 週二到週四是您的黃金時段</li>
                <li>• 客戶滿意度持續提升</li>
                <li>• 建議提高冷氣清洗服務頻率</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanIncome;