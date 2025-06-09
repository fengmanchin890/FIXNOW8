import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare,
  Star,
  Navigation,
  User,
  Shield,
  CheckCircle,
  Camera,
  AlertTriangle,
  X,
  Send,
  Mic,
  Image,
  FileText,
  Video,
  Paperclip,
  MoreHorizontal,
  Zap,
  Bell,
  Settings,
  Upload,
  Eye,
  Heart,
  ThumbsUp,
  Share2,
  Download,
  Copy,
  Edit,
  Trash2,
  Flag,
  Info,
  Grid3X3,
  ZoomIn,
  Filter,
  Maximize
} from 'lucide-react';
import RealTimeTracking from '../components/RealTimeTracking';
import RatingSystem from '../components/RatingSystem';
import ImageViewer from '../components/ImageViewer';

const TrackingPage = () => {
  const { orderId } = useParams();
  const [currentStatus, setCurrentStatus] = useState('confirmed');
  const [showRating, setShowRating] = useState(false);
  const [showCommunication, setShowCommunication] = useState(false);
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [showPhotoReport, setShowPhotoReport] = useState(false);
  const [showProblemReport, setShowProblemReport] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'artisan',
      message: '您好！我是林師傅，已接受您的維修預約，正在前往您的位置。',
      timestamp: '14:30',
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      sender: 'user',
      message: '好的，謝謝師傅！',
      timestamp: '14:32',
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      sender: 'artisan',
      message: '預計15分鐘後到達，請您準備一下現場。',
      timestamp: '14:35',
      type: 'text',
      status: 'delivered'
    },
    {
      id: 4,
      sender: 'system',
      message: '師傅已確認接單，正在準備工具中',
      timestamp: '14:40',
      type: 'system',
      status: 'system'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [reportPhotos, setReportPhotos] = useState<string[]>([
    'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]);
  const [problemDescription, setProblemDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [communicationFeatures, setCommunicationFeatures] = useState({
    call: true,
    message: true,
    photo: true,
    report: true,
    emergency: true,
    navigation: true
  });

  const artisan = {
    name: '林師傅',
    rating: 4.9,
    completedJobs: 2847,
    phone: '0912-345-678',
    speciality: '水電維修專家',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    location: {
      lat: 25.0330,
      lng: 121.5654
    },
    isOnline: true,
    lastSeen: '剛剛',
    responseTime: '平均 3 分鐘內回覆'
  };

  const orderDetails = {
    id: orderId,
    service: '水管漏水維修',
    address: '台北市大安區復興南路一段390號',
    urgency: 'high',
    estimatedPrice: 'NT$800',
    description: '廚房水管接頭處漏水，需要立即處理',
    bookedTime: '今日 15:00',
    estimatedDuration: '1-2 小時'
  };

  const statusSteps = [
    { id: 'submitted', title: '已提交', description: '您的預約已提交', completed: true },
    { id: 'matched', title: '已媒合', description: '已找到合適的師傅', completed: true },
    { id: 'confirmed', title: '已確認', description: '師傅已確認接單', completed: true },
    { id: 'on_way', title: '前往中', description: '師傅正在前往您的位置', completed: false },
    { id: 'arrived', title: '已到達', description: '師傅已到達服務地點', completed: false },
    { id: 'in_progress', title: '服務中', description: '正在進行維修服務', completed: false },
    { id: 'completed', title: '已完成', description: '服務已完成', completed: false }
  ];

  // Image metadata for enhanced viewer
  const imageMetadata = {
    title: '維修現場照片',
    description: '廚房水管漏水狀況記錄',
    timestamp: '2024-01-20 14:30',
    photographer: '林師傅',
    location: '台北市大安區復興南路一段390號',
    tags: ['水管', '漏水', '維修', '廚房']
  };

  // Simulate status progression
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStatus === 'confirmed') {
        // Auto-trigger communication features when confirmed
        triggerCommunicationFeatures();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStatus]);

  const triggerCommunicationFeatures = () => {
    // Add system notification about active features
    const systemMessage = {
      id: chatMessages.length + 1,
      sender: 'system',
      message: '✅ 通訊功能已啟動！您現在可以與師傅即時聯絡',
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      type: 'system',
      status: 'system'
    };
    setChatMessages(prev => [...prev, systemMessage]);
  };

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.id === currentStatus);
  };

  const handleServiceComplete = () => {
    setCurrentStatus('completed');
    setShowRating(true);
  };

  const handleRatingSubmit = (ratingData: any) => {
    console.log('Rating submitted:', ratingData);
    setShowRating(false);
  };

  const handlePhoneCall = () => {
    // Simulate phone call with enhanced feedback
    const callMessage = {
      id: chatMessages.length + 1,
      sender: 'system',
      message: `📞 正在撥打電話給 ${artisan.name}：${artisan.phone}`,
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      type: 'system',
      status: 'system'
    };
    setChatMessages(prev => [...prev, callMessage]);
    
    // Show call interface
    alert(`📞 正在撥打電話給 ${artisan.name}：${artisan.phone}\n\n通話功能已啟動！`);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'user' as const,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
        type: 'text' as const,
        status: 'sending' as const
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      
      // Simulate message delivery
      setTimeout(() => {
        setChatMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);
    }
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage = {
          id: chatMessages.length + 1,
          sender: 'user' as const,
          message: '🎤 語音訊息 (0:05)',
          timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
          type: 'voice' as const,
          status: 'delivered' as const
        };
        setChatMessages(prev => [...prev, voiceMessage]);
      }, 3000);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setReportPhotos([...reportPhotos, ...newPhotos]);
      
      // Add photo message to chat
      const photoMessage = {
        id: chatMessages.length + 1,
        sender: 'user' as const,
        message: `📸 已上傳 ${files.length} 張照片`,
        timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
        type: 'photo' as const,
        status: 'delivered' as const
      };
      setChatMessages(prev => [...prev, photoMessage]);
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageViewer(true);
  };

  const handleSubmitPhotoReport = () => {
    const reportMessage = {
      id: chatMessages.length + 1,
      sender: 'system',
      message: '📋 照片回報已提交，師傅將會查看並回覆',
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      type: 'system',
      status: 'system'
    };
    setChatMessages(prev => [...prev, reportMessage]);
    
    alert('📸 照片回報已提交！師傅將會查看您的照片並給予回覆。');
    setShowPhotoReport(false);
  };

  const handleSubmitProblemReport = () => {
    const problemMessage = {
      id: chatMessages.length + 1,
      sender: 'system',
      message: '⚠️ 問題回報已提交，客服團隊將立即處理',
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      type: 'system',
      status: 'system'
    };
    setChatMessages(prev => [...prev, problemMessage]);
    
    alert('⚠️ 問題回報已提交！客服團隊將立即為您處理。');
    setShowProblemReport(false);
    setProblemDescription('');
  };

  const handleEmergencyCall = () => {
    const emergencyMessage = {
      id: chatMessages.length + 1,
      sender: 'system',
      message: '🆘 正在撥打24小時客服專線：0800-123-456',
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      type: 'system',
      status: 'system'
    };
    setChatMessages(prev => [...prev, emergencyMessage]);
    
    alert('🆘 正在撥打24小時客服專線：0800-123-456\n\n緊急聯絡功能已啟動！');
  };

  const handleNavigation = () => {
    const navMessage = {
      id: chatMessages.length + 1,
      sender: 'system',
      message: '🧭 正在開啟導航到師傅位置',
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      type: 'system',
      status: 'system'
    };
    setChatMessages(prev => [...prev, navMessage]);
    
    alert('🧭 導航功能已啟動！正在開啟地圖導航。');
  };

  const quickMessages = [
    '師傅什麼時候到？',
    '需要準備什麼工具嗎？',
    '大概需要多久時間？',
    '費用是多少？',
    '可以提前到嗎？'
  ];

  if (showRating) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RatingSystem
          orderId={orderId || ''}
          technicianName={artisan.name}
          technicianAvatar={artisan.avatar}
          serviceType={orderDetails.service}
          onSubmitRating={handleRatingSubmit}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Enhanced Header with Active Status */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-lg border p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">🚀 即時追蹤 - 通訊已啟動</h1>
            <p className="text-green-100">訂單編號：{orderId}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-200 mb-1">
              <div className="w-3 h-3 bg-green-300 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium">師傅已確認 ✅</span>
            </div>
            <p className="text-sm text-green-100">所有通訊功能已激活</p>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.completed 
                    ? 'bg-white border-white text-green-600'
                    : index === getCurrentStepIndex()
                    ? 'bg-green-200 border-white text-green-800 animate-pulse'
                    : 'bg-green-400 border-green-300 text-white'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${
                    step.completed || index === getCurrentStepIndex() 
                      ? 'text-white' 
                      : 'text-green-200'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < statusSteps.length - 1 && (
                  <div className={`absolute top-5 left-10 w-20 h-0.5 ${
                    step.completed ? 'bg-white' : 'bg-green-400'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <RealTimeTracking
            orderId={orderId || ''}
            technicianId="tech-001"
            destination={{
              lat: 25.0330,
              lng: 121.5654,
              address: orderDetails.address
            }}
          />
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Enhanced Artisan Info with Active Status */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">您的專業師傅</h3>
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">線上</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{artisan.name}</h4>
                <p className="text-sm text-gray-600">{artisan.speciality}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{artisan.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({artisan.completedJobs}件)</span>
                </div>
                <p className="text-xs text-green-600 mt-1">{artisan.responseTime}</p>
              </div>
            </div>

            {/* Enhanced Communication Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handlePhoneCall}
                className="w-full bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-semibold">撥打電話</span>
                <Zap className="w-4 h-4 ml-2 text-yellow-300" />
              </button>
              
              <button 
                onClick={() => setShowCommunication(true)}
                className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span className="font-semibold">發送訊息</span>
                <Bell className="w-4 h-4 ml-2 text-yellow-300" />
              </button>

              <button 
                onClick={handleNavigation}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Navigation className="w-5 h-5 mr-2" />
                開啟導航
              </button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                已通過身份驗證及技能認證
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">服務詳情</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{orderDetails.service}</h4>
                  <p className="text-gray-600 text-sm mt-1">{orderDetails.description}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">服務地址</h4>
                  <p className="text-gray-600 text-sm mt-1">{orderDetails.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">預約時間</h4>
                  <p className="text-gray-600 text-sm mt-1">{orderDetails.bookedTime}</p>
                  <p className="text-gray-500 text-xs mt-1">預估 {orderDetails.estimatedDuration}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-green-600 font-bold text-sm">NT$</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">預估費用</h4>
                  <p className="text-gray-600 text-sm mt-1">{orderDetails.estimatedPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Photo Gallery */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">📸 服務照片</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowImageViewer(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  <Maximize className="w-4 h-4 mr-1" />
                  查看全部
                </button>
                <button
                  onClick={() => setShowPhotoReport(true)}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                >
                  <Camera className="w-4 h-4 mr-1" />
                  新增照片
                </button>
              </div>
            </div>
            
            {reportPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {reportPhotos.slice(0, 4).map((photo, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={photo}
                      alt={`服務照片 ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {index === 3 && reportPhotos.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">+{reportPhotos.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Camera className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">尚無服務照片</p>
                <button
                  onClick={() => setShowPhotoReport(true)}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  上傳第一張照片
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowPhotoReport(true)}
                className="bg-blue-100 text-blue-700 p-3 rounded-lg hover:bg-blue-200 transition-colors flex flex-col items-center"
              >
                <Camera className="w-5 h-5 mb-1" />
                <span className="text-sm font-medium">拍照回報</span>
              </button>
              
              <button 
                onClick={() => setShowProblemReport(true)}
                className="bg-orange-100 text-orange-700 p-3 rounded-lg hover:bg-orange-200 transition-colors flex flex-col items-center"
              >
                <AlertTriangle className="w-5 h-5 mb-1" />
                <span className="text-sm font-medium">回報問題</span>
              </button>
              
              <button className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex flex-col items-center">
                <Share2 className="w-5 h-5 mb-1" />
                <span className="text-sm font-medium">分享位置</span>
              </button>
              
              <button className="bg-purple-100 text-purple-700 p-3 rounded-lg hover:bg-purple-200 transition-colors flex flex-col items-center">
                <Settings className="w-5 h-5 mb-1" />
                <span className="text-sm font-medium">設定</span>
              </button>
            </div>
            
            {currentStatus === 'in_progress' && (
              <button 
                onClick={handleServiceComplete}
                className="w-full mt-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                確認完成
              </button>
            )}
            
            <button className="w-full mt-3 bg-red-100 text-red-700 p-3 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center">
              <X className="w-5 h-5 mr-2" />
              取消預約
            </button>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">🆘 緊急聯絡</h3>
            <p className="text-sm text-red-700 mb-4">如遇緊急狀況，請立即聯絡客服</p>
            <button 
              onClick={handleEmergencyCall}
              className="w-full bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              <span className="font-semibold">24小時客服專線</span>
              <Zap className="w-4 h-4 ml-2 text-yellow-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Image Viewer */}
      <ImageViewer
        images={reportPhotos}
        currentIndex={currentImageIndex}
        isOpen={showImageViewer}
        onClose={() => setShowImageViewer(false)}
        onImageChange={setCurrentImageIndex}
        metadata={imageMetadata}
      />

      {/* Enhanced Communication Modal */}
      {showCommunication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{artisan.name}</h3>
                    <p className="text-sm text-blue-100 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      線上 • {artisan.lastSeen}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCommunication(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 
                    message.sender === 'system' ? 'justify-center' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.sender === 'system'
                        ? 'bg-yellow-100 text-yellow-800 text-center'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${
                        message.sender === 'user' ? 'text-blue-200' : 
                        message.sender === 'system' ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                      {message.sender === 'user' && message.status && (
                        <div className="flex items-center">
                          {message.status === 'sending' && <Clock className="w-3 h-3 text-blue-200" />}
                          {message.status === 'delivered' && <CheckCircle className="w-3 h-3 text-blue-200" />}
                          {message.status === 'read' && <Eye className="w-3 h-3 text-blue-200" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Messages */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(msg)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs whitespace-nowrap hover:bg-blue-200 transition-colors"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t bg-white rounded-b-2xl">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  
                  {showAttachmentMenu && (
                    <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg border p-2 space-y-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="chat-photo-upload"
                      />
                      <label
                        htmlFor="chat-photo-upload"
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <Camera className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">照片</span>
                      </label>
                      <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm">文件</span>
                      </button>
                      <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="text-sm">位置</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="輸入訊息..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                
                <button
                  onClick={handleVoiceMessage}
                  className={`p-2 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {isRecording && (
                <div className="mt-2 flex items-center justify-center text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm">正在錄音中...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Photo Report Modal */}
      {showPhotoReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">📸 拍照回報</h3>
                <button
                  onClick={() => setShowPhotoReport(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 hover:border-blue-400 transition-colors">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">上傳服務進度照片</p>
                  <p className="text-xs text-gray-500 mb-3">支援 JPG、PNG 格式，最大 10MB</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-report-upload"
                  />
                  <label
                    htmlFor="photo-report-upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                  >
                    選擇照片
                  </label>
                </div>
                {reportPhotos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">已有 {reportPhotos.length} 張照片</p>
                    <div className="grid grid-cols-3 gap-2">
                      {reportPhotos.slice(-3).map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo}
                            alt={`回報照片 ${index + 1}`}
                            className="w-full h-16 object-cover rounded-lg cursor-pointer"
                            onClick={() => handleImageClick(reportPhotos.length - 3 + index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPhotoReport(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmitPhotoReport}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  提交回報
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Problem Report Modal */}
      {showProblemReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">⚠️ 回報問題</h3>
                <button
                  onClick={() => setShowProblemReport(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  問題類型
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>服務品質問題</option>
                  <option>師傅遲到</option>
                  <option>溝通問題</option>
                  <option>費用爭議</option>
                  <option>其他問題</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  問題描述
                </label>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="請詳細描述遇到的問題，我們會立即為您處理..."
                />
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-orange-600 mt-0.5" />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium">客服承諾</p>
                    <p>我們將在 5 分鐘內回覆您的問題，並提供解決方案。</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowProblemReport(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmitProblemReport}
                  disabled={!problemDescription.trim()}
                  className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  提交問題
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;