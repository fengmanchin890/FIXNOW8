import { useState } from 'react';
import { 
  DollarSign, 
  Clock, 
  Star, 
  MapPin, 
  TrendingUp,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  Phone,
  Navigation,
  Camera,
  MessageSquare,
  Settings,
  Award,
  Target,
  BarChart3
} from 'lucide-react';
import { Link } from 'wouter';
import SmartJobDispatch from '../components/SmartJobDispatch';

const ArtisanDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('dispatch');

  const acceptedJobs = [
    {
      id: 'JOB-003',
      service: '冷氣清洗',
      customer: '陳先生',
      location: '台北市中山區',
      scheduledTime: '今日 14:30',
      price: 'NT$1,200',
      status: 'confirmed',
      customerPhone: '0912-345-678'
    }
  ];

  const todayEarnings = {
    total: 3200,
    jobs: 4,
    hours: 6.5,
    rating: 4.9
  };

  const weeklyStats = {
    earnings: 18500,
    jobs: 23,
    hours: 42,
    rating: 4.8,
    efficiency: 95,
    responseTime: 8
  };

  const technicianProfile = {
    id: 'tech-001',
    skills: ['plumbing', 'electrical', 'appliance'],
    location: { lat: 25.0330, lng: 121.5654 },
    rating: 4.9
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">林師傅，您好！</h1>
            <p className="text-primary-100 mb-4">水電維修專家 | 服務評分 4.9⭐ | 完成案件 2,847 件</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                <span>本月目標達成率：85%</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>金牌師傅認證</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold">NT${weeklyStats.earnings.toLocaleString()}</p>
              <p className="text-primary-200 text-sm">本週收入</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">上線狀態</span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    isOnline ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            {isOnline && (
              <div className="flex items-center text-green-300">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse" />
                智能接單中
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid md:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">NT${todayEarnings.total.toLocaleString()}</p>
              <p className="text-gray-600">今日收入</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{todayEarnings.jobs}</p>
              <p className="text-gray-600">今日完成</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{todayEarnings.hours}h</p>
              <p className="text-gray-600">工作時數</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{todayEarnings.rating}</p>
              <p className="text-gray-600">評價分數</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{weeklyStats.efficiency}%</p>
              <p className="text-gray-600">工作效率</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{weeklyStats.responseTime}分</p>
              <p className="text-gray-600">平均回應</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Enhanced Jobs Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">智能工作台</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('dispatch')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'dispatch'
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    智能派工
                  </button>
                  <button
                    onClick={() => setActiveTab('accepted')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'accepted'
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    已接案件 ({acceptedJobs.length})
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'dispatch' && (
                <SmartJobDispatch
                  technicianId={technicianProfile.id}
                  technicianSkills={technicianProfile.skills}
                  technicianLocation={technicianProfile.location}
                  technicianRating={technicianProfile.rating}
                />
              )}

              {activeTab === 'accepted' && (
                <div className="space-y-4">
                  {acceptedJobs.map((job) => (
                    <div key={job.id} className="border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{job.service}</h3>
                        <span className="px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-100">
                          已確認
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          客戶：{job.customer}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          地點：{job.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          時間：{job.scheduledTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-green-600">{job.price}</div>
                        <div className="flex space-x-3">
                          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            聯絡客戶
                          </button>
                          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center">
                            <Navigation className="h-4 w-4 mr-2" />
                            導航
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Performance Analytics */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">本週表現分析</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">總收入</span>
                <span className="font-semibold text-green-600">NT${weeklyStats.earnings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">完成案件</span>
                <span className="font-semibold">{weeklyStats.jobs} 件</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">工作時數</span>
                <span className="font-semibold">{weeklyStats.hours} 小時</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">平均評分</span>
                <span className="font-semibold text-yellow-600">{weeklyStats.rating} ⭐</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">工作效率</span>
                <span className="font-semibold text-blue-600">{weeklyStats.efficiency}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">平均回應時間</span>
                <span className="font-semibold text-purple-600">{weeklyStats.responseTime} 分鐘</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Tools */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">專業工具</h3>
            <div className="space-y-3">
              <button className="w-full bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                <Camera className="mr-2 h-5 w-5" />
                拍照回報進度
              </button>
              <Link
                to="/artisan/availability"
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Clock className="mr-2 h-5 w-5" />
                設定可用時間
              </Link>
              <Link
                to="/artisan/income"
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                收入分析報告
              </Link>
              <Link
                to="/artisan/skills"
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Settings className="mr-2 h-5 w-5" />
                技能認證管理
              </Link>
            </div>
          </div>

          {/* Enhanced Notifications */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">智能通知</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">AI 推薦案件</p>
                <p className="text-xs text-blue-700 mt-1">附近有高匹配度案件，預估收入 NT$1,200</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">客戶好評</p>
                <p className="text-xs text-green-700 mt-1">王小明給了您5星評價：「服務專業，準時到達」</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">技能提升建議</p>
                <p className="text-xs text-yellow-700 mt-1">建議學習智能家居安裝，可增加30%收入</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900">效率優化</p>
                <p className="text-xs text-purple-700 mt-1">您的平均完成時間比同級師傅快15%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;