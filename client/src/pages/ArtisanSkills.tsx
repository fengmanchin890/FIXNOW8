import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  Settings, 
  Award, 
  Plus, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Star,
  TrendingUp
} from 'lucide-react';

const ArtisanSkills = () => {
  const [activeTab, setActiveTab] = useState('certifications');

  const certifications = [
    {
      id: 1,
      name: '電工技術士證照',
      category: '電工',
      level: '甲級',
      issuer: '勞動部技能檢定中心',
      issueDate: '2023-03-15',
      expiryDate: '2028-03-15',
      status: 'active',
      verified: true,
      document: 'electrician_cert.pdf'
    },
    {
      id: 2,
      name: '水電配管技術士',
      category: '水電',
      level: '乙級',
      issuer: '勞動部技能檢定中心',
      issueDate: '2022-08-20',
      expiryDate: '2027-08-20',
      status: 'active',
      verified: true,
      document: 'plumbing_cert.pdf'
    },
    {
      id: 3,
      name: '冷凍空調裝修技術士',
      category: '冷氣',
      level: '丙級',
      issuer: '勞動部技能檢定中心',
      issueDate: '2021-12-10',
      expiryDate: '2026-12-10',
      status: 'expiring',
      verified: true,
      document: 'hvac_cert.pdf'
    },
    {
      id: 4,
      name: '建築物室內裝修技術士',
      category: '裝修',
      level: '乙級',
      issuer: '勞動部技能檢定中心',
      issueDate: '2024-01-15',
      expiryDate: '2029-01-15',
      status: 'pending',
      verified: false,
      document: 'interior_cert.pdf'
    }
  ];

  const skills = [
    {
      id: 1,
      name: '水電維修',
      level: 'expert',
      experience: '8年',
      completedJobs: 245,
      rating: 4.9,
      certifications: ['電工技術士證照', '水電配管技術士']
    },
    {
      id: 2,
      name: '冷氣清洗安裝',
      level: 'advanced',
      experience: '5年',
      completedJobs: 128,
      rating: 4.8,
      certifications: ['冷凍空調裝修技術士']
    },
    {
      id: 3,
      name: '電燈安裝',
      level: 'expert',
      experience: '6年',
      completedJobs: 189,
      rating: 4.9,
      certifications: ['電工技術士證照']
    },
    {
      id: 4,
      name: '管線疏通',
      level: 'intermediate',
      experience: '3年',
      completedJobs: 67,
      rating: 4.6,
      certifications: ['水電配管技術士']
    }
  ];

  const recommendedCertifications = [
    {
      name: '智能家居系統技術士',
      category: '智能家居',
      difficulty: 'medium',
      estimatedIncome: '+30%',
      description: '隨著智能家居需求增長，此證照可大幅提升收入'
    },
    {
      name: '太陽能發電系統技術士',
      category: '綠能',
      difficulty: 'hard',
      estimatedIncome: '+50%',
      description: '綠能產業蓬勃發展，專業人才需求量大'
    },
    {
      name: '消防設備士',
      category: '消防',
      difficulty: 'hard',
      estimatedIncome: '+40%',
      description: '建築法規要求，市場需求穩定'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '有效';
      case 'expiring': return '即將到期';
      case 'pending': return '審核中';
      case 'expired': return '已過期';
      default: return status;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      case 'beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'expert': return '專家';
      case 'advanced': return '進階';
      case 'intermediate': return '中級';
      case 'beginner': return '初級';
      default: return level;
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
                to="/artisan"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">技能認證管理</h1>
                <p className="text-gray-600">管理您的專業證照和技能等級</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              新增證照
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          {[
            { key: 'certifications', label: '證照管理', icon: Award },
            { key: 'skills', label: '技能等級', icon: Settings },
            { key: 'recommendations', label: '建議證照', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'certifications' && (
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary-50 rounded-lg">
                          <Award className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">等級：{cert.level}</span>
                            <span className="text-sm text-gray-500">類別：{cert.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {cert.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cert.status)}`}>
                          {getStatusText(cert.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>核發：{new Date(cert.issueDate).toLocaleDateString('zh-TW')}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>到期：{new Date(cert.expiryDate).toLocaleDateString('zh-TW')}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Upload className="h-4 w-4 mr-2" />
                        <span>{cert.document}</span>
                      </div>
                    </div>

                    {cert.status === 'expiring' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                          <span className="text-yellow-800 text-sm">此證照將於 6 個月內到期，請及時更新</span>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        查看證書
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                        <Edit className="h-4 w-4 mr-1" />
                        編輯
                      </button>
                      <button className="px-3 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" />
                        刪除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                            {getLevelText(skill.level)}
                          </span>
                          <span className="text-sm text-gray-600">經驗：{skill.experience}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{skill.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{skill.completedJobs} 個工作</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">相關證照：</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.certifications.map((cert, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
                        技能測試
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        查看詳情
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="space-y-4">
                {recommendedCertifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                        <p className="text-gray-600 mt-1">{cert.description}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-sm text-gray-600">類別：{cert.category}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            cert.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            cert.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cert.difficulty === 'easy' ? '容易' : cert.difficulty === 'medium' ? '中等' : '困難'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{cert.estimatedIncome}</div>
                        <p className="text-sm text-gray-600">預估收入增長</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
                        了解更多
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        報名考試
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">證照概覽</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">總證照數</span>
                  <span className="font-semibold">{certifications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">有效證照</span>
                  <span className="font-semibold text-green-600">
                    {certifications.filter(c => c.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">即將到期</span>
                  <span className="font-semibold text-yellow-600">
                    {certifications.filter(c => c.status === 'expiring').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">待審核</span>
                  <span className="font-semibold text-blue-600">
                    {certifications.filter(c => c.status === 'pending').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Level Distribution */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">技能等級分布</h3>
              <div className="space-y-3">
                {[
                  { level: 'expert', count: 2, label: '專家' },
                  { level: 'advanced', count: 1, label: '進階' },
                  { level: 'intermediate', count: 1, label: '中級' },
                  { level: 'beginner', count: 0, label: '初級' }
                ].map((item) => (
                  <div key={item.level} className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                      {item.label}
                    </span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Renewals */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">即將到期提醒</h3>
              <div className="space-y-3">
                {certifications
                  .filter(cert => cert.status === 'expiring')
                  .map((cert) => (
                    <div key={cert.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="font-medium text-yellow-900">{cert.name}</p>
                      <p className="text-sm text-yellow-700">
                        {new Date(cert.expiryDate).toLocaleDateString('zh-TW')} 到期
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition-colors">
                  申請證照驗證
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  技能評估測試
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  查看考試資訊
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">小提示</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• 定期更新證照可提高客戶信任度</li>
                <li>• 多元化技能有助於增加收入來源</li>
                <li>• 參加技能測試可獲得平台認證</li>
                <li>• 新興技能證照通常收入更高</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanSkills;