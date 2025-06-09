import { Link } from 'wouter';
import { 
  Clock, 
  Shield, 
  MapPin, 
  Star, 
  Zap,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Phone,
  Wrench,
  UserPlus,
  LogIn
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Clock,
      title: '30分鐘快速媒合',
      description: '承諾在30分鐘內為您找到合適的專業師傅',
      color: 'text-primary-600 bg-primary-100'
    },
    {
      icon: Shield,
      title: '品質保證',
      description: '所有師傅經過嚴格認證，提供服務品質保障',
      color: 'text-success-600 bg-success-100'
    },
    {
      icon: MapPin,
      title: '即時追蹤',
      description: '即時追蹤師傅位置，準確掌握到達時間',
      color: 'text-warning-600 bg-warning-100'
    },
    {
      icon: Star,
      title: '透明評價',
      description: '真實用戶評價，透明收費標準',
      color: 'text-error-600 bg-error-100'
    }
  ];

  const stats = [
    { label: '活躍用戶', value: '500萬+', icon: Users },
    { label: '認證師傅', value: '15萬+', icon: Award },
    { label: '服務完成率', value: '99.8%', icon: TrendingUp },
    { label: '平均評分', value: '4.9星', icon: Star }
  ];

  const services = [
    '水電維修', '空調安裝', '家具組裝', '鎖具更換',
    '油漆粉刷', '管線疏通', '電器維修', '防水工程'
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                台灣最大
                <span className="text-yellow-400">即時師傅</span>
                媒合平台
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                讓維修服務像叫車一樣簡單，30分鐘內為您媒合專業師傅
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book"
                  className="bg-yellow-400 text-primary-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center justify-center group"
                >
                  立即預約服務
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/user/auth"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all flex items-center justify-center"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  用戶註冊
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-pulse-soft">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">即時媒合中...</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Wrench className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">水電師傅 - 林師傅</p>
                      <p className="text-sm text-blue-200">距離您 1.2 公里</p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm">⭐ 4.9分 | 完成2847個案件</p>
                    <p className="text-sm mt-1">預計 8 分鐘內到達</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              為什麼選擇師傅快手？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們致力於為用戶提供最優質、最便捷的居家維修服務體驗
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              專業服務項目
            </h2>
            <p className="text-xl text-gray-600">
              涵蓋各類居家維修需求，一鍵解決所有問題
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 hover:bg-primary-50 hover:border-primary-200 border-2 border-transparent rounded-xl p-6 text-center transition-all cursor-pointer group"
              >
                <div className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                  {service}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            準備開始使用師傅快手了嗎？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            立即體驗台灣最便捷的居家維修服務
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-yellow-400 text-primary-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              立即預約
            </Link>
            <Link
              to="/user/auth"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all flex items-center justify-center"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              註冊會員
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;