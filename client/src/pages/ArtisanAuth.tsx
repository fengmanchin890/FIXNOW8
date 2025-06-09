import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Camera, 
  Upload, 
  MapPin, 
  Award, 
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Star,
  Calendar,
  CreditCard,
  Shield,
  FileText,
  Wrench,
  Zap,
  Droplets,
  Settings,
  Home,
  Car,
  Briefcase,
  Clock,
  DollarSign
} from 'lucide-react';

const ArtisanAuth = () => {
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
    idNumber: '',
    birthDate: '',
    
    // Professional Info
    specialties: [] as string[],
    experience: '',
    certifications: [] as string[],
    workingAreas: [] as string[],
    
    // Business Info
    businessLicense: '',
    insurance: '',
    emergencyContact: '',
    bankAccount: '',
    
    // Profile
    avatar: '',
    bio: '',
    hourlyRate: '',
    availability: {
      monday: { start: '09:00', end: '18:00', available: true },
      tuesday: { start: '09:00', end: '18:00', available: true },
      wednesday: { start: '09:00', end: '18:00', available: true },
      thursday: { start: '09:00', end: '18:00', available: true },
      friday: { start: '09:00', end: '18:00', available: true },
      saturday: { start: '09:00', end: '17:00', available: true },
      sunday: { start: '10:00', end: '16:00', available: false }
    }
  });

  const specialtyOptions = [
    { id: 'plumbing', name: '水電維修', icon: Droplets, description: '水管、電路、開關插座' },
    { id: 'electrical', name: '電器維修', icon: Zap, description: '家電、照明、電路安裝' },
    { id: 'appliance', name: '家電服務', icon: Settings, description: '冷氣、洗衣機、冰箱' },
    { id: 'furniture', name: '家具安裝', icon: Home, description: '組裝、修理、調整' },
    { id: 'locksmith', name: '鎖具服務', icon: Shield, description: '開鎖、換鎖、修鎖' },
    { id: 'general', name: '一般維修', icon: Wrench, description: '其他居家維修' }
  ];

  const workingAreaOptions = [
    '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
    '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣',
    '雲林縣', '嘉義市', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
    '台東縣', '澎湖縣', '金門縣', '連江縣'
  ];

  const certificationOptions = [
    '室內配線技術士', '工業配線技術士', '自來水管配管技術士',
    '冷凍空調裝修技術士', '家具木工技術士', '建築物室內設計技術士',
    '電器修護技術士', '汽車修護技術士', '機械加工技術士',
    '焊接技術士', '泥水技術士', '油漆技術士'
  ];

  const registrationSteps = [
    { number: 1, title: '基本資料', description: '個人基本信息' },
    { number: 2, title: '專業技能', description: '技能與認證' },
    { number: 3, title: '營業資訊', description: '執照與保險' },
    { number: 4, title: '服務設定', description: '價格與時間' },
    { number: 5, title: '完成註冊', description: '審核與啟用' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecialtyToggle = (specialtyId: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialtyId)
        ? prev.specialties.filter(id => id !== specialtyId)
        : [...prev.specialties, specialtyId]
    }));
  };

  const handleWorkingAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      workingAreas: prev.workingAreas.includes(area)
        ? prev.workingAreas.filter(a => a !== area)
        : [...prev.workingAreas, area]
    }));
  };

  const handleCertificationToggle = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      alert('登入成功！歡迎回來，林師傅');
      // Redirect to artisan dashboard
      window.location.href = '/artisan';
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
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
      setCurrentStep(5);
    }, 3000);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && formData.fullName && formData.phone && formData.idNumber;
      case 2:
        return formData.specialties.length > 0 && formData.experience;
      case 3:
        return formData.businessLicense && formData.insurance;
      case 4:
        return formData.hourlyRate && formData.workingAreas.length > 0;
      default:
        return true;
    }
  };

  if (authMode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">師傅登入</h1>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-600">記住我</span>
              </label>
              <button type="button" className="text-sm text-primary-600 hover:text-primary-700">
                忘記密碼？
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center"
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
              還不是師傅會員？
              <button
                onClick={() => setAuthMode('register')}
                className="text-primary-600 hover:text-primary-700 font-medium ml-1"
              >
                立即註冊
              </button>
            </p>
          </div>

          {/* Quick Demo Login */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">🚀 快速體驗</p>
            <button
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  email: 'demo@artisan.com',
                  password: 'demo123'
                }));
              }}
              className="text-sm text-yellow-700 hover:text-yellow-800 underline"
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
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">成為專業師傅</h1>
          <p className="text-gray-600">加入台灣最大的師傅媒合平台，開始您的專業服務之路</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {registrationSteps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.number <= currentStep 
                    ? 'bg-primary-600 border-primary-600 text-white' 
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
                    step.number <= currentStep ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < registrationSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.number < currentStep ? 'bg-primary-600' : 'bg-gray-200'
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="請輸入真實姓名"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    身分證字號 *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="A123456789"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    緊急聯絡人
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="姓名 / 電話"
                  />
                </div>
              </div>

              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  個人照片
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

          {/* Step 2: Professional Skills */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">專業技能</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  專業領域 * (可複選)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {specialtyOptions.map((specialty) => (
                    <button
                      key={specialty.id}
                      type="button"
                      onClick={() => handleSpecialtyToggle(specialty.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.specialties.includes(specialty.id)
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          formData.specialties.includes(specialty.id) 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <specialty.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{specialty.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{specialty.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  工作經驗 *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">請選擇工作經驗</option>
                  <option value="1-2">1-2年</option>
                  <option value="3-5">3-5年</option>
                  <option value="6-10">6-10年</option>
                  <option value="10+">10年以上</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  專業證照 (可複選)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {certificationOptions.map((cert) => (
                    <label key={cert} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.certifications.includes(cert)}
                        onChange={() => handleCertificationToggle(cert)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  自我介紹
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="請簡單介紹您的專業背景和服務特色..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Business Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">營業資訊</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    營業執照號碼 *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.businessLicense}
                      onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="請輸入營業執照號碼"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    責任保險 *
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="保險公司 / 保單號碼"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    銀行帳戶
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="銀行代碼-帳戶號碼"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">證件上傳</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">身分證正反面</p>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        選擇檔案
                      </button>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">營業執照</p>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        選擇檔案
                      </button>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">保險證明</p>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        選擇檔案
                      </button>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">技術證照</p>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        選擇檔案
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Service Settings */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">服務設定</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    基本時薪 * (NT$)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="500"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">建議範圍：NT$400-800/小時</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  服務區域 * (可複選)
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {workingAreaOptions.map((area) => (
                    <label key={area} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.workingAreas.includes(area)}
                        onChange={() => handleWorkingAreaToggle(area)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  工作時間設定
                </label>
                <div className="space-y-3">
                  {Object.entries(formData.availability).map(([day, schedule]) => {
                    const dayNames: { [key: string]: string } = {
                      monday: '星期一',
                      tuesday: '星期二',
                      wednesday: '星期三',
                      thursday: '星期四',
                      friday: '星期五',
                      saturday: '星期六',
                      sunday: '星期日'
                    };

                    return (
                      <div key={day} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-20">
                          <span className="text-sm font-medium text-gray-700">{dayNames[day]}</span>
                        </div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={schedule.available}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                availability: {
                                  ...prev.availability,
                                  [day]: { ...schedule, available: e.target.checked }
                                }
                              }));
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">可接案</span>
                        </label>
                        {schedule.available && (
                          <>
                            <input
                              type="time"
                              value={schedule.start}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  availability: {
                                    ...prev.availability,
                                    [day]: { ...schedule, start: e.target.value }
                                  }
                                }));
                              }}
                              className="px-3 py-1 border border-gray-300 rounded text-sm"
                            />
                            <span className="text-gray-500">至</span>
                            <input
                              type="time"
                              value={schedule.end}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  availability: {
                                    ...prev.availability,
                                    [day]: { ...schedule, end: e.target.value }
                                  }
                                }));
                              }}
                              className="px-3 py-1 border border-gray-300 rounded text-sm"
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Registration Complete */}
          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">註冊申請已提交！</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                感謝您加入師傅快手平台！我們將在1-3個工作天內完成審核，審核通過後會發送通知到您的電子郵件。
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-medium text-blue-900 mb-3">接下來的流程：</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>資料審核（1-2個工作天）</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>證照驗證（1個工作天）</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>帳號啟用通知</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>開始接收案件</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setAuthMode('login')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  前往登入
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  返回首頁
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={currentStep === 1 ? () => setAuthMode('login') : handlePrevStep}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {currentStep === 1 ? '返回登入' : '上一步'}
              </button>

              <button
                onClick={currentStep === 4 ? handleRegister : handleNextStep}
                disabled={!canProceedToNext() || isLoading}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    處理中...
                  </>
                ) : currentStep === 4 ? (
                  '提交申請'
                ) : (
                  '下一步'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Back to Login */}
        {currentStep < 5 && (
          <div className="text-center mt-6">
            <p className="text-gray-600">
              已經有帳號了？
              <button
                onClick={() => setAuthMode('login')}
                className="text-primary-600 hover:text-primary-700 font-medium ml-1"
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

export default ArtisanAuth;