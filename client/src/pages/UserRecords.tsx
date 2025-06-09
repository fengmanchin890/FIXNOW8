import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  Calendar, 
  Star, 
  MapPin, 
  Clock, 
  User,
  Filter,
  Search,
  Download,
  Eye,
  RotateCcw
} from 'lucide-react';

const UserRecords = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const serviceRecords = [
    {
      id: 'REC-001',
      service: '水電維修',
      artisan: '林師傅',
      date: '2025-05-28',
      time: '14:30',
      location: '台北市大安區復興南路一段',
      status: 'completed',
      duration: '2小時',
      price: 'NT$1,200',
      rating: 5,
      review: '師傅很專業，修理速度快，服務態度良好。',
      images: ['repair1.jpg', 'repair2.jpg'],
      invoice: 'INV-001.pdf'
    },
    {
      id: 'REC-002',
      service: '冷氣清洗',
      artisan: '陳師傅',
      date: '2025-05-20',
      time: '09:00',
      location: '台北市信義區松仁路',
      status: 'completed',
      duration: '1.5小時',
      price: 'NT$800',
      rating: 4,
      review: '清洗很乾淨，價格合理。',
      images: ['cleaning1.jpg'],
      invoice: 'INV-002.pdf'
    },
    {
      id: 'REC-003',
      service: '電燈安裝',
      artisan: '王師傅',
      date: '2025-05-15',
      time: '16:00',
      location: '台北市中山區民生東路',
      status: 'completed',
      duration: '1小時',
      price: 'NT$600',
      rating: 5,
      review: '安裝快速，燈具很亮，很滿意。',
      images: ['light1.jpg', 'light2.jpg', 'light3.jpg'],
      invoice: 'INV-003.pdf'
    },
    {
      id: 'REC-004',
      service: '管線疏通',
      artisan: '張師傅',
      date: '2025-05-10',
      time: '11:00',
      location: '台北市松山區八德路',
      status: 'completed',
      duration: '3小時',
      price: 'NT$1,500',
      rating: 4,
      review: '解決了困擾很久的排水問題。',
      images: ['drain1.jpg'],
      invoice: 'INV-004.pdf'
    },
    {
      id: 'REC-005',
      service: '門鎖維修',
      artisan: '劉師傅',
      date: '2025-05-05',
      time: '13:30',
      location: '台北市大同區重慶北路',
      status: 'completed',
      duration: '1小時',
      price: 'NT$500',
      rating: 3,
      review: '修好了，但感覺不是很順暢。',
      images: ['lock1.jpg'],
      invoice: 'INV-005.pdf'
    }
  ];

  const filteredRecords = serviceRecords.filter(record => {
    if (activeFilter !== 'all' && record.status !== activeFilter) return false;
    if (searchTerm && !record.service.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !record.artisan.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalSpent = serviceRecords.reduce((sum, record) => 
    sum + parseInt(record.price.replace('NT$', '').replace(',', '')), 0
  );

  const averageRating = serviceRecords.reduce((sum, record) => sum + record.rating, 0) / serviceRecords.length;

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
                <h1 className="text-2xl font-bold text-gray-900">服務紀錄</h1>
                <p className="text-gray-600">查看您的完整服務歷史</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              匯出紀錄
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <div className="flex space-x-2">
                    {[
                      { key: 'all', label: '全部' },
                      { key: 'completed', label: '已完成' },
                      { key: 'cancelled', label: '已取消' }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activeFilter === filter.key 
                            ? 'bg-primary-100 text-primary-700' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜尋服務或師傅..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Service Records */}
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{record.service}</h3>
                      <p className="text-gray-600">訂單編號：{record.id}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      已完成
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span>{record.artisan}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(record.date).toLocaleDateString('zh-TW')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{record.time} ({record.duration})</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{record.location}</span>
                    </div>
                  </div>

                  {/* Rating and Review */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-600 mr-2">您的評分：</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= record.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {record.review && (
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                        "{record.review}"
                      </p>
                    )}
                  </div>

                  {/* Images */}
                  {record.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">服務照片：</p>
                      <div className="flex space-x-2">
                        {record.images.map((image, index) => (
                          <div
                            key={index}
                            className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                          >
                            <Eye className="h-6 w-6 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-900">
                      {record.price}
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        查看發票
                      </button>
                      <button className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        再次預約
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">服務統計</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">總服務次數</span>
                  <span className="font-semibold">{serviceRecords.length} 次</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">總花費</span>
                  <span className="font-semibold">NT${totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">平均評分</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-1">{averageRating.toFixed(1)}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">最愛服務</span>
                  <span className="font-semibold">水電維修</span>
                </div>
              </div>
            </div>

            {/* Frequent Services */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">常用服務</h3>
              <div className="space-y-3">
                {[
                  { name: '水電維修', count: 3, icon: '🔧' },
                  { name: '冷氣清洗', count: 2, icon: '❄️' },
                  { name: '電燈安裝', count: 2, icon: '💡' },
                  { name: '管線疏通', count: 1, icon: '🚿' }
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{service.icon}</span>
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {service.count} 次
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <Link
                  to="/book"
                  className="w-full bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  預約新服務
                </Link>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  聯絡客服
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRecords;