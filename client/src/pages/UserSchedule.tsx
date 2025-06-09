import { useState } from 'react';
import { Link } from 'wouter';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowLeft,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const UserSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const upcomingAppointments = [
    {
      id: '1',
      service: '水電維修',
      artisan: '林師傅',
      date: '2025-06-10',
      time: '14:30',
      location: '台北市大安區復興南路一段',
      status: 'confirmed',
      estimatedDuration: '2小時'
    },
    {
      id: '2',
      service: '冷氣清洗',
      artisan: '陳師傅',
      date: '2025-06-12',
      time: '09:00',
      location: '台北市信義區松仁路',
      status: 'pending',
      estimatedDuration: '1.5小時'
    },
    {
      id: '3',
      service: '電燈安裝',
      artisan: '王師傅',
      date: '2025-06-15',
      time: '16:00',
      location: '台北市中山區民生東路',
      status: 'confirmed',
      estimatedDuration: '1小時'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return '已確認';
      case 'pending': return '待確認';
      case 'completed': return '已完成';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/user"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">查看行程</h1>
                <p className="text-gray-600">管理您的服務預約時間</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2 inline" />
                篩選
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'month' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600'
                  }`}
                >
                  月視圖
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'week' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600'
                  }`}
                >
                  週視圖
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Calendar Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentDate.toLocaleDateString('zh-TW', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentDate(new Date())}
                      className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      今天
                    </button>
                    <button 
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const hasAppointment = upcomingAppointments.some(apt => apt.date === date.toISOString().split('T')[0]);
                    
                    return (
                      <div
                        key={i}
                        className={`
                          aspect-square p-2 text-center text-sm relative
                          ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                          ${isToday ? 'bg-primary-100 text-primary-800 font-semibold rounded-lg' : ''}
                          ${hasAppointment ? 'bg-blue-50' : ''}
                          hover:bg-gray-100 cursor-pointer transition-colors rounded-lg
                        `}
                      >
                        {date.getDate()}
                        {hasAppointment && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">即將到來的預約</h3>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{appointment.service}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {appointment.artisan}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(appointment.date).toLocaleDateString('zh-TW')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {appointment.time} ({appointment.estimatedDuration})
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {appointment.location}
                      </div>
                    </div>

                    <div className="mt-3 flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">
                        查看詳情
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                        修改
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">本月統計</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">總預約</span>
                  <span className="font-semibold">8 次</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">已完成</span>
                  <span className="font-semibold text-green-600">5 次</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">待服務</span>
                  <span className="font-semibold text-blue-600">3 次</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">總花費</span>
                  <span className="font-semibold">NT$6,400</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSchedule;