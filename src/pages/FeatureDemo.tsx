import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  MapPin, 
  Clock, 
  Star,
  Brain,
  DollarSign,
  Users,
  Camera,
  MessageSquare,
  Navigation,
  Award,
  TrendingUp,
  Shield,
  Bell,
  Settings,
  Phone,
  Video,
  Mic,
  Upload,
  CheckCircle,
  AlertTriangle,
  Target,
  Activity
} from 'lucide-react';
import AIClassification from '../components/AIClassification';
import RealTimeTracking from '../components/RealTimeTracking';
import DynamicPricing from '../components/DynamicPricing';
import RatingSystem from '../components/RatingSystem';
import SmartJobDispatch from '../components/SmartJobDispatch';

const FeatureDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: string, time: string}>>([]);
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 15420,
    onlineArtisans: 3847,
    activeJobs: 892,
    avgResponseTime: 8.3,
    satisfactionRate: 4.9,
    completionRate: 98.7
  });

  const demoSteps = [
    {
      id: 'user-request',
      title: '用戶一鍵預約',
      description: 'AI 智能問題分析與分類',
      features: ['ai-classification', 'image-upload', 'voice-input'],
      duration: 5000
    },
    {
      id: 'smart-matching',
      title: '智能媒合系統',
      description: '30秒內找到最適合的師傅',
      features: ['smart-dispatch', 'geo-matching', 'skill-analysis'],
      duration: 3000
    },
    {
      id: 'dynamic-pricing',
      title: '透明動態定價',
      description: '即時計算最優價格',
      features: ['pricing-engine', 'demand-analysis', 'cost-breakdown'],
      duration: 4000
    },
    {
      id: 'real-time-tracking',
      title: '即時追蹤服務',
      description: 'GPS 定位與 ETA 預測',
      features: ['gps-tracking', 'eta-calculation', 'proximity-alerts'],
      duration: 6000
    },
    {
      id: 'service-execution',
      title: '服務執行',
      description: '專業維修與進度回報',
      features: ['progress-photos', 'communication', 'quality-control'],
      duration: 4000
    },
    {
      id: 'rating-feedback',
      title: '評價回饋系統',
      description: '多維度評分與獎勵機制',
      features: ['multi-rating', 'photo-review', 'reward-system'],
      duration: 3000
    }
  ];

  const allFeatures = [
    { id: 'ai-classification', name: 'AI 問題分析', icon: Brain, color: 'text-purple-600 bg-purple-100' },
    { id: 'smart-dispatch', name: '智能派工', icon: Zap, color: 'text-blue-600 bg-blue-100' },
    { id: 'dynamic-pricing', name: '動態定價', icon: DollarSign, color: 'text-green-600 bg-green-100' },
    { id: 'gps-tracking', name: 'GPS 追蹤', icon: MapPin, color: 'text-red-600 bg-red-100' },
    { id: 'real-time-updates', name: '即時更新', icon: Activity, color: 'text-orange-600 bg-orange-100' },
    { id: 'voice-input', name: '語音輸入', icon: Mic, color: 'text-indigo-600 bg-indigo-100' },
    { id: 'image-upload', name: '圖片上傳', icon: Camera, color: 'text-pink-600 bg-pink-100' },
    { id: 'video-support', name: '影片支援', icon: Video, color: 'text-cyan-600 bg-cyan-100' },
    { id: 'multi-rating', name: '多維評分', icon: Star, color: 'text-yellow-600 bg-yellow-100' },
    { id: 'geo-matching', name: '地理媒合', icon: Target, color: 'text-emerald-600 bg-emerald-100' },
    { id: 'skill-analysis', name: '技能分析', icon: Award, color: 'text-violet-600 bg-violet-100' },
    { id: 'communication', name: '即時通訊', icon: MessageSquare, color: 'text-blue-600 bg-blue-100' }
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        onlineArtisans: prev.onlineArtisans + Math.floor(Math.random() * 10 - 5),
        activeJobs: prev.activeJobs + Math.floor(Math.random() * 6 - 3),
        avgResponseTime: Math.max(5, prev.avgResponseTime + (Math.random() - 0.5) * 0.5),
        satisfactionRate: Math.min(5, Math.max(4.5, prev.satisfactionRate + (Math.random() - 0.5) * 0.1)),
        completionRate: Math.min(100, Math.max(95, prev.completionRate + (Math.random() - 0.5) * 0.5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Demo automation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setDemoProgress(prev => {
          const newProgress = prev + 1;
          const currentStepData = demoSteps[currentStep];
          
          if (newProgress >= 100) {
            // Move to next step
            if (currentStep < demoSteps.length - 1) {
              setCurrentStep(currentStep + 1);
              setActiveFeatures(demoSteps[currentStep + 1].features);
              addNotification(`${demoSteps[currentStep + 1].title} 已啟動`, 'success');
              return 0;
            } else {
              // Demo completed
              setIsPlaying(false);
              addNotification('所有功能演示完成！', 'success');
              return 100;
            }
          }
          
          return newProgress;
        });
      }, currentStep < demoSteps.length ? demoSteps[currentStep].duration / 100 : 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const addNotification = (message: string, type: string) => {
    const newNotification = {
      id: Date.now().toString(),
      message,
      type,
      time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setDemoProgress(0);
    setActiveFeatures(demoSteps[0].features);
    addNotification('功能演示開始', 'info');
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setDemoProgress(0);
    setActiveFeatures([]);
    setNotifications([]);
  };

  const triggerFeature = (featureId: string) => {
    if (!activeFeatures.includes(featureId)) {
      setActiveFeatures(prev => [...prev, featureId]);
      const feature = allFeatures.find(f => f.id === featureId);
      addNotification(`${feature?.name} 功能已啟動`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Demo Control Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">🚀 全功能演示中心</h1>
            <p className="text-primary-100">體驗台灣最先進的師傅媒合平台所有功能</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={startDemo}
              disabled={isPlaying}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center disabled:opacity-50"
            >
              <Play className="mr-2 h-5 w-5" />
              開始演示
            </button>
            <button
              onClick={pauseDemo}
              disabled={!isPlaying}
              className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors flex items-center disabled:opacity-50"
            >
              <Pause className="mr-2 h-5 w-5" />
              暫停
            </button>
            <button
              onClick={resetDemo}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              重置
            </button>
          </div>
        </div>

        {/* Demo Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">演示進度</span>
            <span className="text-sm">{Math.round(demoProgress)}%</span>
          </div>
          <div className="w-full bg-primary-800 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${demoProgress}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        {demoSteps[currentStep] && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold mb-1">{demoSteps[currentStep].title}</h3>
            <p className="text-primary-100 text-sm">{demoSteps[currentStep].description}</p>
          </div>
        )}
      </div>

      {/* Real-time Platform Stats */}
      <div className="grid md:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{realTimeData.activeUsers.toLocaleString()}</p>
              <p className="text-gray-600">活躍用戶</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{realTimeData.onlineArtisans.toLocaleString()}</p>
              <p className="text-gray-600">在線師傅</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{realTimeData.activeJobs}</p>
              <p className="text-gray-600">進行中案件</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{realTimeData.avgResponseTime.toFixed(1)}分</p>
              <p className="text-gray-600">平均回應</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{realTimeData.satisfactionRate.toFixed(1)}</p>
              <p className="text-gray-600">滿意度</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{realTimeData.completionRate.toFixed(1)}%</p>
              <p className="text-gray-600">完成率</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">功能觸發面板</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {allFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => triggerFeature(feature.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    activeFeatures.includes(feature.id)
                      ? 'border-primary-600 bg-primary-50 scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activeFeatures.includes(feature.id) ? 'bg-primary-600 text-white' : feature.color
                    }`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{feature.name}</h3>
                      {activeFeatures.includes(feature.id) && (
                        <p className="text-xs text-primary-600 mt-1">✓ 已啟動</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">即時通知</h3>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">等待功能觸發...</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Live Feature Demonstrations */}
      <div className="space-y-8">
        {/* AI Classification Demo */}
        {activeFeatures.includes('ai-classification') && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-6 h-6 text-purple-600 mr-2" />
              AI 智能問題分析
            </h3>
            <AIClassification
              images={['https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=400']}
              description="廚房水龍頭一直滴水，聲音很大，影響睡眠。水量不大但持續不斷。"
              onClassification={(result) => addNotification('AI 分析完成', 'success')}
            />
          </div>
        )}

        {/* Smart Job Dispatch Demo */}
        {activeFeatures.includes('smart-dispatch') && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="w-6 h-6 text-blue-600 mr-2" />
              智能派工系統
            </h3>
            <SmartJobDispatch
              technicianId="tech-demo"
              technicianSkills={['plumbing', 'electrical']}
              technicianLocation={{ lat: 25.0330, lng: 121.5654 }}
              technicianRating={4.9}
            />
          </div>
        )}

        {/* Dynamic Pricing Demo */}
        {activeFeatures.includes('dynamic-pricing') && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-6 h-6 text-green-600 mr-2" />
              動態定價引擎
            </h3>
            <DynamicPricing
              serviceType="plumbing"
              urgency="high"
              location="台北市大安區"
              timeSlot="emergency"
              complexity="moderate"
            />
          </div>
        )}

        {/* Real-time Tracking Demo */}
        {activeFeatures.includes('gps-tracking') && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-6 h-6 text-red-600 mr-2" />
              即時 GPS 追蹤
            </h3>
            <RealTimeTracking
              orderId="DEMO-001"
              technicianId="tech-demo"
              destination={{
                lat: 25.0330,
                lng: 121.5654,
                address: "台北市大安區復興南路一段390號"
              }}
            />
          </div>
        )}

        {/* Rating System Demo */}
        {activeFeatures.includes('multi-rating') && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="w-6 h-6 text-yellow-600 mr-2" />
              多維度評價系統
            </h3>
            <RatingSystem
              orderId="DEMO-001"
              technicianName="林師傅"
              technicianAvatar="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150"
              serviceType="水管維修"
              onSubmitRating={(rating) => addNotification('評價已提交', 'success')}
            />
          </div>
        )}
      </div>

      {/* Demo Summary */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 演示總結</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">已啟動功能</h4>
            <div className="space-y-1">
              {activeFeatures.map(featureId => {
                const feature = allFeatures.find(f => f.id === featureId);
                return (
                  <div key={featureId} className="flex items-center text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {feature?.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">平台優勢</h4>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                30分鐘快速媒合保證
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                AI 驅動的智能分析
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-600" />
                透明定價與品質保證
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-purple-600" />
                即時追蹤與通訊
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDemo;