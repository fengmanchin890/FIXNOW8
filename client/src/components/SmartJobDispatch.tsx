import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Star, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  X, 
  Phone,
  MessageSquare,
  Navigation,
  AlertTriangle
} from 'lucide-react';

interface JobMatch {
  id: string;
  service: string;
  customer: string;
  location: string;
  distance: number;
  urgency: 'low' | 'normal' | 'high';
  estimatedDuration: string;
  price: number;
  description: string;
  customerRating: number;
  postedTime: string;
  matchScore: number;
  skillMatch: number;
  locationScore: number;
  ratingBonus: number;
  images?: string[];
}

interface SmartJobDispatchProps {
  technicianId: string;
  technicianSkills: string[];
  technicianLocation: { lat: number; lng: number };
  technicianRating: number;
}

const SmartJobDispatch: React.FC<SmartJobDispatchProps> = ({
  technicianId,
  technicianSkills,
  technicianLocation,
  technicianRating
}) => {
  const [availableJobs, setAvailableJobs] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoAcceptEnabled, setAutoAcceptEnabled] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  useEffect(() => {
    fetchAvailableJobs();
    
    // Simulate real-time job updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        addNewJob();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchAvailableJobs = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockJobs: JobMatch[] = [
        {
          id: 'JOB-001',
          service: '水管漏水維修',
          customer: '王小明',
          location: '台北市大安區復興南路一段',
          distance: 1.2,
          urgency: 'high',
          estimatedDuration: '1-2小時',
          price: 800,
          description: '廚房水管接頭處漏水，需要立即處理',
          customerRating: 4.8,
          postedTime: '3分鐘前',
          matchScore: 95,
          skillMatch: 100,
          locationScore: 90,
          ratingBonus: 5,
          images: ['https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=300']
        },
        {
          id: 'JOB-002',
          service: '電燈安裝',
          customer: '李小華',
          location: '台北市信義區松仁路',
          distance: 2.5,
          urgency: 'normal',
          estimatedDuration: '30分鐘',
          price: 600,
          description: '客廳需要安裝2盞LED吸頂燈',
          customerRating: 4.9,
          postedTime: '8分鐘前',
          matchScore: 78,
          skillMatch: 80,
          locationScore: 75,
          ratingBonus: 3,
          images: ['https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=300']
        },
        {
          id: 'JOB-003',
          service: '馬桶疏通',
          customer: '陳先生',
          location: '台北市中山區',
          distance: 3.8,
          urgency: 'high',
          estimatedDuration: '45分鐘',
          price: 900,
          description: '馬桶完全堵塞，無法使用',
          customerRating: 4.6,
          postedTime: '12分鐘前',
          matchScore: 85,
          skillMatch: 90,
          locationScore: 70,
          ratingBonus: 10,
        }
      ];
      
      setAvailableJobs(mockJobs.sort((a, b) => b.matchScore - a.matchScore));
      setIsLoading(false);
    }, 1500);
  };

  const addNewJob = () => {
    const newJob: JobMatch = {
      id: `JOB-${Date.now()}`,
      service: '緊急維修',
      customer: '新客戶',
      location: '台北市',
      distance: Math.random() * 5 + 0.5,
      urgency: Math.random() > 0.5 ? 'high' : 'normal',
      estimatedDuration: '1小時',
      price: Math.floor(Math.random() * 500) + 500,
      description: '新的維修需求',
      customerRating: 4.0 + Math.random(),
      postedTime: '剛剛',
      matchScore: Math.floor(Math.random() * 30) + 70,
      skillMatch: Math.floor(Math.random() * 20) + 80,
      locationScore: Math.floor(Math.random() * 30) + 70,
      ratingBonus: Math.floor(Math.random() * 10)
    };
    
    setAvailableJobs(prev => [newJob, ...prev].sort((a, b) => b.matchScore - a.matchScore));
  };

  const handleAcceptJob = (job: JobMatch) => {
    if (autoAcceptEnabled) {
      acceptJob(job);
    } else {
      setSelectedJob(job);
      setShowJobDetails(true);
    }
  };

  const acceptJob = (job: JobMatch) => {
    // Remove job from available list
    setAvailableJobs(prev => prev.filter(j => j.id !== job.id));
    setShowJobDetails(false);
    setSelectedJob(null);
    
    // Show success notification
    alert(`已接受案件：${job.service}`);
  };

  const declineJob = (jobId: string) => {
    setAvailableJobs(prev => prev.filter(j => j.id !== jobId));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'normal': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="animate-spin">
            <TrendingUp className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900">智能媒合中...</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">智能派工系統</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">自動接單</span>
            <button
              onClick={() => setAutoAcceptEnabled(!autoAcceptEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                autoAcceptEnabled ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  autoAcceptEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-primary-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-primary-600">{availableJobs.length}</p>
            <p className="text-xs text-gray-600">可接案件</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-green-600">{technicianRating}</p>
            <p className="text-xs text-gray-600">您的評分</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-yellow-600">
              {availableJobs.filter(j => j.matchScore >= 90).length}
            </p>
            <p className="text-xs text-gray-600">高匹配度</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-red-600">
              {availableJobs.filter(j => j.urgency === 'high').length}
            </p>
            <p className="text-xs text-gray-600">緊急案件</p>
          </div>
        </div>
      </div>

      {/* Available Jobs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">推薦案件</h3>
          <p className="text-sm text-gray-600">根據您的技能、位置和評分智能排序</p>
        </div>
        
        <div className="p-6 space-y-4">
          {availableJobs.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">目前沒有合適的案件</p>
              <p className="text-sm text-gray-500">系統會持續為您尋找最佳匹配</p>
            </div>
          ) : (
            availableJobs.map((job) => (
              <div key={job.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{job.service}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job.urgency)}`}>
                        {job.urgency === 'high' ? '緊急' : job.urgency === 'normal' ? '一般' : '不急'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                        匹配度 {job.matchScore}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location} • {job.distance}km
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.estimatedDuration} • {job.postedTime}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        客戶評分 {job.customerRating.toFixed(1)}
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1 text-green-600" />
                        NT${job.price.toLocaleString()}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    {/* Match Score Breakdown */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{job.skillMatch}%</p>
                          <p className="text-gray-600">技能匹配</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{job.locationScore}%</p>
                          <p className="text-gray-600">距離評分</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">+{job.ratingBonus}%</p>
                          <p className="text-gray-600">評分加成</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {job.images && job.images.length > 0 && (
                    <img
                      src={job.images[0]}
                      alt={job.service}
                      className="w-20 h-20 rounded-lg object-cover ml-4"
                    />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAcceptJob(job)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      接受
                    </button>
                    <button
                      onClick={() => declineJob(job.id)}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      略過
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 p-2">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 p-2">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 p-2">
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {showJobDetails && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">案件詳情</h3>
                <button
                  onClick={() => setShowJobDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedJob.service}</h4>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">客戶</p>
                    <p className="font-medium">{selectedJob.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">費用</p>
                    <p className="font-medium text-green-600">NT${selectedJob.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">距離</p>
                    <p className="font-medium">{selectedJob.distance}km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">預估時間</p>
                    <p className="font-medium">{selectedJob.estimatedDuration}</p>
                  </div>
                </div>
                
                {selectedJob.images && selectedJob.images.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">問題照片</p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedJob.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`問題照片 ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => acceptJob(selectedJob)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  確認接受案件
                </button>
                <button
                  onClick={() => setShowJobDetails(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartJobDispatch;