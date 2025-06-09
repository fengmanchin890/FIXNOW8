import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, MessageSquare, Car, AlertCircle } from 'lucide-react';

interface TechnicianLocation {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  timestamp: number;
}

interface RealTimeTrackingProps {
  orderId: string;
  technicianId: string;
  destination: { lat: number; lng: number; address: string };
}

const RealTimeTracking: React.FC<RealTimeTrackingProps> = ({ orderId, technicianId, destination }) => {
  const [technicianLocation, setTechnicianLocation] = useState<TechnicianLocation>({
    lat: 25.0478,
    lng: 121.5319,
    heading: 45,
    speed: 25,
    timestamp: Date.now()
  });
  const [eta, setEta] = useState(12);
  const [distance, setDistance] = useState(1.2);
  const [status, setStatus] = useState<'en_route' | 'nearby' | 'arrived'>('en_route');
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; time: string; type: string }>>([]);

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTechnicianLocation(prev => {
        const newLat = prev.lat + (Math.random() - 0.5) * 0.001;
        const newLng = prev.lng + (Math.random() - 0.5) * 0.001;
        
        // Calculate distance to destination
        const newDistance = Math.sqrt(
          Math.pow(destination.lat - newLat, 2) + Math.pow(destination.lng - newLng, 2)
        ) * 111; // Rough conversion to km
        
        setDistance(newDistance);
        
        // Update ETA based on distance
        const newEta = Math.max(1, Math.round(newDistance / 0.5 * 60)); // Assuming 30km/h average speed
        setEta(newEta);
        
        // Update status based on distance
        if (newDistance < 0.2) {
          if (status !== 'arrived') {
            setStatus('arrived');
            addNotification('師傅已到達您的位置', 'success');
          }
        } else if (newDistance < 0.5) {
          if (status === 'en_route') {
            setStatus('nearby');
            addNotification('師傅即將到達（距離200公尺內）', 'warning');
          }
        }
        
        return {
          lat: newLat,
          lng: newLng,
          heading: prev.heading + (Math.random() - 0.5) * 10,
          speed: 20 + Math.random() * 20,
          timestamp: Date.now()
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [destination, status]);

  const addNotification = (message: string, type: string) => {
    const newNotification = {
      id: Date.now().toString(),
      message,
      time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'en_route': return 'text-blue-600 bg-blue-100';
      case 'nearby': return 'text-yellow-600 bg-yellow-100';
      case 'arrived': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (currentStatus: string) => {
    switch (currentStatus) {
      case 'en_route': return '前往中';
      case 'nearby': return '即將到達';
      case 'arrived': return '已到達';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getStatusColor(status)}`}>
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">師傅狀態</h3>
              <p className={`text-sm font-medium ${getStatusColor(status).split(' ')[0]}`}>
                {getStatusText(status)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{eta}分鐘</p>
            <p className="text-sm text-gray-600">預計到達</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-gray-900">{distance.toFixed(1)}km</p>
            <p className="text-xs text-gray-600">距離</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-gray-900">{Math.round(technicianLocation.speed)}km/h</p>
            <p className="text-xs text-gray-600">行駛速度</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-gray-900">
              {new Date(technicianLocation.timestamp).toLocaleTimeString('zh-TW', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            <p className="text-xs text-gray-600">最後更新</p>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">即時位置追蹤</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            <Navigation className="w-4 h-4 mr-1" />
            開啟導航
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 relative overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400"></div>
          </div>
          
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 50 200 Q 150 100 250 150"
              stroke="#2563eb"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
          
          {/* Technician Position */}
          <div 
            className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"
            style={{ 
              left: `${20 + (distance / 2) * 30}%`, 
              top: `${60 - (distance / 2) * 20}%`,
              transform: `rotate(${technicianLocation.heading}deg)`
            }}
          >
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-600 rounded-full opacity-30 animate-ping"></div>
          </div>
          
          {/* Destination */}
          <div className="absolute bottom-8 right-8 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg">
            <MapPin className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
          </div>
          
          {/* Distance Indicator */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-sm font-medium text-gray-900">{distance.toFixed(1)} km</p>
            <p className="text-xs text-gray-600">剩餘距離</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              <span>師傅位置</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>目的地</span>
            </div>
          </div>
          <span>即時更新中</span>
        </div>
      </div>

      {/* Communication Panel */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">聯絡師傅</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
            <Phone className="w-5 h-5 mr-2" />
            撥打電話
          </button>
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            發送訊息
          </button>
        </div>
      </div>

      {/* Real-time Notifications */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">即時通知</h3>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">暫無新通知</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${
                  notification.type === 'success' ? 'bg-green-100' :
                  notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <AlertCircle className={`w-4 h-4 ${
                    notification.type === 'success' ? 'text-green-600' :
                    notification.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracking;