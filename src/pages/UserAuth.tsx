import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Camera, 
  Upload, 
  MapPin, 
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Star,
  Calendar,
  CreditCard,
  Shield,
  FileText,
  Home,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Award,
  Heart,
  Building
} from 'lucide-react';

const UserAuth = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Basic Info
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    
    // Personal Info
    birthDate: '',
    gender: '',
    occupation: '',
    
    // Address Info
    address: '',
    city: '',
    district: '',
    postalCode: '',
    
    // Preferences
    preferredServices: [] as string[],
    emergencyContact: '',
    specialRequests: '',
    
    // Profile
    avatar: '',
    bio: '',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    promotionalEmails: false
  });

  const serviceOptions = [
    { id: 'plumbing', name: '水電維修', icon: '🔧', description: '水管、電路維修' },
    { id: 'appliance', name: '家電維修', icon: '🔌', description: '冷氣、洗衣機、冰箱' },
    { id: 'furniture', name: '家具安裝', icon: '🪑', description: '組裝、修理、調整' },
    { id: 'cleaning', name: '清潔服務', icon: '🧹', description: '居家、辦公室清潔' },
    { id: 'locksmith', name: '鎖具服務', icon: '🔐', description: '開鎖、換鎖、修鎖' },
    { id: 'painting', name: '油漆粉刷', icon: '🎨', description: '室內外油漆工程' },
    { id: 'gardening', name: '園藝服務', icon: '🌱', description: '庭院設計、植栽' },
    { id: 'moving', name: '搬家服務', icon: '📦', description: '搬家、搬運服務' }
  ];

  const cityOptions = [
    '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
    '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣',
    '雲林縣', '嘉義市', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
    '台東縣', '澎湖縣', '金門縣', '連江縣'
  ];

  const registrationSteps = [
    { number: 1, title: '基本資料', description: '帳號與個人信息' },
    { number: 2, title: '聯絡資訊', description: '地址與聯絡方式' },
    { number: 3, title: '服務偏好', description: '常用服務設定' },
    { number: 4, title: '完成註冊', description: '確認與啟用' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredServices: prev.preferredServices.includes(serviceId)
        ? prev.preferredServices.filter(id => id !== serviceId)
        : [...prev.preferredServices, serviceId]
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      alert('登入成功！歡迎回來');
      // Redirect to user dashboard
      window.location.href = '/user';
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
    }, 2000);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && formData.fullName && formData.phone;
      case 2:
        return formData.address && formData.city;
      case 3:
        return true; // Optional step
      default:
        return true;
    }
  };

  if (authMode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">用戶登入</h1>
            <p className="text-gray-600">歡迎回到師傅快手平台</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電子郵件
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="請輸入您的電子郵件"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密碼
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="請輸入您的密碼"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">記住我</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                忘記密碼？
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  登入中...
                </>
              ) : (
                '登入'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              還不是會員？
              <button
                onClick={() => setAuthMode('register')}
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                立即註冊
              </button>
            </p>
          </div>

          {/* Quick Demo Login */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">🚀 快速體驗</p>
            <button
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  email: 'demo@user.com',
                  password: 'demo123'
                }));
              }}
              className="text-sm text-blue-700 hover:text-blue-800 underline"
            >
              使用示範帳號登入
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">加入師傅快手</h1>
          <p className="text-gray-600">註冊成為會員，享受便捷的居家維修服務</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {registrationSteps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.number <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {step.number < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    step.number <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < registrationSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">基本資料</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電子郵件 *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手機號碼 *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0912-345-678"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    密碼 *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="至少8個字符"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    確認密碼 *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="再次輸入密碼"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    真實姓名 *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="請輸入真實姓名"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出生日期
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    性別
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">請選擇</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    職業
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="例：軟體工程師"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  個人照片 (選填)
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    上傳照片
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">聯絡資訊</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    詳細地址 *
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="請輸入完整地址，例：台北市大安區復興南路一段390號12樓"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    縣市 *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">請選擇縣市</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    行政區
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例：大安區"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    郵遞區號
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例：106"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    緊急聯絡人
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="姓名 / 電話"
                  />
                </div>
              </div>

              {/* Notification Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  通知設定
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">接收電子郵件通知</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">接收簡訊通知</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.promotionalEmails}
                      onChange={(e) => handleInputChange('promotionalEmails', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">接收優惠活動通知</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Service Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">服務偏好</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  常用服務類型 (可複選)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceOptions.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.preferredServices.includes(service.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{service.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  特殊需求或備註
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例：家中有寵物、需要脫鞋、特殊時間要求等..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  自我介紹 (選填)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="簡單介紹自己，讓師傅更了解您的需求..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Registration Complete */}
          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">註冊成功！</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                歡迎加入師傅快手！您的帳號已經創建完成，現在可以開始使用我們的服務了。
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-medium text-blue-900 mb-3">🎉 註冊完成獎勵</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center justify-center">
                    <Award className="w-5 h-5 mr-2" />
                    <span>獲得 100 點會員積分</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span>首次服務享 9 折優惠</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Heart className="w-5 h-5 mr-2" />
                    <span>免費享受優先客服</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-medium text-gray-900 mb-3">接下來您可以：</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>立即預約您需要的服務</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>完善個人資料獲得更好體驗</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>查看附近的優質師傅</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>享受會員專屬優惠</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => window.location.href = '/user'}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  進入用戶中心
                </button>
                <button
                  onClick={() => window.location.href = '/book'}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  立即預約服務
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={currentStep === 1 ? () => setAuthMode('login') : handlePrevStep}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {currentStep === 1 ? '返回登入' : '上一步'}
              </button>

              <button
                onClick={currentStep === 3 ? handleRegister : handleNextStep}
                disabled={!canProceedToNext() || isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    處理中...
                  </>
                ) : currentStep === 3 ? (
                  '完成註冊'
                ) : (
                  '下一步'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Back to Login */}
        {currentStep < 4 && (
          <div className="text-center mt-6">
            <p className="text-gray-600">
              已經有帳號了？
              <button
                onClick={() => setAuthMode('login')}
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                立即登入
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuth;