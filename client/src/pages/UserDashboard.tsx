import { useState } from 'react';
import { Link } from 'wouter';
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  MapPin, 
  Star,
  Calendar,
  DollarSign,
  History,
  Settings,
  Bell,
  Filter,
  RotateCcw
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('current');

  const currentOrders = [
    {
      id: 'ORD-2024-001',
      service: '水管漏水維修',
      artisan: '林師傅',
      status: 'in_progress',
      estimatedTime: '15分鐘後到達',
      price: 'NT$800',
      rating: 4.9,
      location: '台北市大安區',
      image: 'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ORD-2024-002',
      service: '電燈安裝',
      artisan: '陳師傅',
      status: 'confirmed',
      estimatedTime: '今日 14:30',
      price: 'NT$600',
      rating: 4.8,
      location: '台北市信義區',
      image: 'https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const orderHistory = [
    {
      id: 'ORD-2024-003',
      service: '冷氣清洗',
      artisan: '王師傅',
      status: 'completed',
      completedDate: '2024-01-15',
      price: 'NT$1,200',
      rating: 5,
      userRating: 5
    },
    {
      id: 'ORD-2024-004',
      service: '馬桶疏通',
      artisan: '張師傅',
      status: 'completed',
      completedDate: '2024-01-10',
      price: 'NT$900',
      rating: 4.7,
      userRating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'text-primary-600 bg-primary-100';
      case 'confirmed':
        return 'text-success-600 bg-success-100';
      case 'completed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return '進行中';
      case 'confirmed':
        return '已確認';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">歡迎回來，王小明</h1>
            <p className="text-primary-100">您有 2 個進行中的服務預約</p>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/book"
              className="bg-yellow-400 text-primary-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              新增預約
            </Link>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              設定
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-gray-600">總預約次數</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">10</p>
              <p className="text-gray-600">已完成</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">NT$8,900</p>
              <p className="text-gray-600">總消費金額</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-error-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-error-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-gray-600">平均評分</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Orders Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">我的預約</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('current')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'current'
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    進行中
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'history'
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    歷史記錄
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === 'current' && currentOrders.map((order) => (
                <div key={order.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={order.image}
                      alt={order.service}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{order.service}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {order.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {order.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">師傅：{order.artisan}</p>
                          <p className="text-sm text-gray-600">{order.estimatedTime}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{order.price}</p>
                          {order.status === 'in_progress' && (
                            <Link
                              to={`/track/${order.id}`}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              即時追蹤
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {activeTab === 'history' && orderHistory.map((order) => (
                <div key={order.id} className="border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{order.service}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">師傅：{order.artisan}</p>
                      <p className="text-sm text-gray-600">完成日期：{order.completedDate}</p>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">您的評分：</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= order.userRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{order.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
            <div className="space-y-3">
              <Link
                to="/book"
                className="w-full bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                <Plus className="mr-2 h-5 w-5" />
                新增預約
              </Link>
              <Link
                to="/user/schedule"
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                查看行程
              </Link>
              <Link
                to="/user/records"
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                服務紀錄
              </Link>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">通知</h3>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">林師傅已接受您的預約</p>
                <p className="text-xs text-blue-700 mt-1">5分鐘前</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">上次服務評價已提交</p>
                <p className="text-xs text-green-700 mt-1">2小時前</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">本月消費總額：NT$2,400</p>
                <p className="text-xs text-yellow-700 mt-1">昨天</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;