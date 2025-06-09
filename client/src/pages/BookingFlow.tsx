import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Camera, 
  MapPin, 
  Clock, 
  DollarSign,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  AlertTriangle,
  Wrench,
  Zap,
  Droplets,
  Settings,
  Home,
  Lock,
  Video,
  Mic
} from 'lucide-react';
import AIClassification from '../components/AIClassification';
import DynamicPricing from '../components/DynamicPricing';

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [location, setLocationState] = useState('台北市大安區復興南路一段');
  const [scheduledTime, setScheduledTime] = useState('asap');
  const [aiClassification, setAiClassification] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [, navigate] = useLocation();

  const services = [
    { id: 'plumbing', name: '水管維修', icon: Droplets, price: 'NT$800-1,200', description: '水管漏水、堵塞、安裝' },
    { id: 'electrical', name: '電力維修', icon: Zap, price: 'NT$600-1,000', description: '電燈、插座、電路問題' },
    { id: 'appliance', name: '家電維修', icon: Settings, price: 'NT$1,000-2,000', description: '冷氣、洗衣機、冰箱' },
    { id: 'lock', name: '鎖具服務', icon: Lock, price: 'NT$500-800', description: '開鎖、換鎖、修鎖' },
    { id: 'furniture', name: '家具安裝', icon: Home, price: 'NT$400-800', description: '組裝、修理、調整' },
    { id: 'general', name: '一般維修', icon: Wrench, price: 'NT$500-1,000', description: '其他居家維修需求' }
  ];

  const steps = [
    { number: 1, title: '選擇服務', description: '告訴我們您需要什麼服務' },
    { number: 2, title: '問題描述', description: '詳細描述問題並上傳照片' },
    { number: 3, title: '智能分析', description: 'AI 分析問題並提供建議' },
    { number: 4, title: '確認詳情', description: '確認地點和時間' },
    { number: 5, title: '完成預約', description: '等待師傅接單' }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate order ID and navigate to tracking
      const orderId = 'ORD-' + Date.now();
      navigate(`/track/${orderId}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newVideos = Array.from(files).map(file => URL.createObjectURL(file));
      setVideos([...videos, ...newVideos]);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      setDescription(prev => prev + (prev ? ' ' : '') + '[語音轉文字] 廚房水龍頭一直滴水，聲音很大，影響睡眠。');
    }, 3000);
  };

  const detectLocation = () => {
    // Simulate GPS detection
    setLocationState('台北市大安區復興南路一段390號12樓');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== '';
      case 2:
        return description.trim() !== '' || images.length > 0;
      case 3:
        return aiClassification !== null;
      case 4:
        return location.trim() !== '';
      default:
        return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">一鍵預約維修服務</h1>
        <p className="text-gray-600">AI 智能分析 • 30分鐘快速媒合 • 透明定價</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
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
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step.number < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">選擇您需要的服務</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    selectedService === service.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedService === service.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                      <p className="text-primary-600 font-medium">{service.price}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Problem Description */}
        {currentStep === 2 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">詳細描述問題</h2>
            
            {/* Urgency Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">緊急程度</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setUrgency('low')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    urgency === 'low' ? 'border-green-600 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">不急</p>
                    <p className="text-xs text-gray-600">可安排時間</p>
                  </div>
                </button>
                <button
                  onClick={() => setUrgency('normal')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    urgency === 'normal' ? 'border-yellow-600 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                    <p className="font-medium">一般</p>
                    <p className="text-xs text-gray-600">今日處理</p>
                  </div>
                </button>
                <button
                  onClick={() => setUrgency('high')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    urgency === 'high' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-red-600" />
                    <p className="font-medium">緊急</p>
                    <p className="text-xs text-gray-600">立即處理</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Description with Voice Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">問題描述</label>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="請詳細描述遇到的問題，例如：廚房水龍頭漏水，水量不大但持續滴水..."
                />
                <button
                  onClick={startRecording}
                  disabled={isRecording}
                  className={`absolute right-3 top-3 p-2 rounded-lg transition-colors ${
                    isRecording 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              {isRecording && (
                <p className="text-sm text-red-600 mt-2 flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></div>
                  正在錄音中...
                </p>
              )}
            </div>

            {/* Enhanced Media Upload */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">上傳照片</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">拍攝或上傳問題照片</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer inline-block"
                    >
                      選擇照片
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`上傳照片 ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">上傳影片 (選填)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">錄製問題影片</p>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer inline-block"
                    >
                      選擇影片
                    </label>
                  </div>
                  {videos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-green-600">已上傳 {videos.length} 個影片</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AI Classification */}
        {currentStep === 3 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI 智能分析</h2>
            <AIClassification
              images={images}
              description={description}
              onClassification={setAiClassification}
            />
          </div>
        )}

        {/* Step 4: Confirm Details with Dynamic Pricing */}
        {currentStep === 4 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">確認服務詳情</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">服務地址</label>
                  <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 border-none focus:ring-0 focus:outline-none"
                    />
                    <button 
                      onClick={detectLocation}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      重新定位
                    </button>
                  </div>
                </div>

                {/* Scheduling */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">預約時間</label>
                  <div className="space-y-3">
                    <button
                      onClick={() => setScheduledTime('asap')}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        scheduledTime === 'asap' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">立即預約</p>
                          <p className="text-sm text-gray-600">30分鐘內媒合師傅</p>
                        </div>
                        <Zap className="w-5 h-5 text-primary-600" />
                      </div>
                    </button>
                    <button
                      onClick={() => setScheduledTime('schedule')}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        scheduledTime === 'schedule' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">預約時間</p>
                          <p className="text-sm text-gray-600">選擇合適的服務時間</p>
                        </div>
                        <Clock className="w-5 h-5 text-primary-600" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                {/* Dynamic Pricing */}
                <DynamicPricing
                  serviceType={selectedService}
                  urgency={urgency as 'low' | 'normal' | 'high'}
                  location={location}
                  timeSlot={scheduledTime === 'asap' ? 'emergency' : 'business'}
                  complexity={aiClassification?.severity === 'high' ? 'complex' : 'moderate'}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">預約摘要</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">服務類型</span>
                  <span className="font-medium">{services.find(s => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">緊急程度</span>
                  <span className="font-medium">
                    {urgency === 'high' ? '緊急' : urgency === 'normal' ? '一般' : '不急'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AI 分析結果</span>
                  <span className="font-medium">
                    {aiClassification?.severity === 'high' ? '複雜' : '中等'}複雜度
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">預約時間</span>
                  <span className="font-medium">
                    {scheduledTime === 'asap' ? '立即' : '預約時間'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Completion */}
        {currentStep === 5 && (
          <div className="animate-slide-up text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">預約已提交！</h2>
            <p className="text-gray-600 mb-6">
              AI 智能媒合系統正在為您尋找最適合的師傅，預計在30分鐘內完成媒合
            </p>
            <div className="bg-primary-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                <span className="text-primary-600 font-medium">智能媒合中...</span>
              </div>
              <p className="text-sm text-gray-600">系統正在根據距離、評分、專業技能和即時需求為您篩選師傅</p>
            </div>
            
            {/* Matching Progress */}
            <div className="bg-white border rounded-lg p-4 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">✓ AI 問題分析完成</span>
                  <span className="text-green-600">已完成</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">⏳ 師傅媒合中</span>
                  <span className="text-blue-600">進行中</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">⏸ 等待師傅確認</span>
                  <span className="text-gray-400">等待中</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          上一步
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            canProceed()
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentStep === 5 ? '前往追蹤' : '下一步'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default BookingFlow;