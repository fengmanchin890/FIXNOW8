import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Plus, 
  Trash2, 
  Save,
  AlertCircle,
  CheckCircle,
  MapPin
} from 'lucide-react';

const ArtisanAvailability = () => {
  const [workingHours, setWorkingHours] = useState({
    monday: { enabled: true, start: '09:00', end: '18:00' },
    tuesday: { enabled: true, start: '09:00', end: '18:00' },
    wednesday: { enabled: true, start: '09:00', end: '18:00' },
    thursday: { enabled: true, start: '09:00', end: '18:00' },
    friday: { enabled: true, start: '09:00', end: '18:00' },
    saturday: { enabled: true, start: '10:00', end: '16:00' },
    sunday: { enabled: false, start: '10:00', end: '16:00' }
  });

  const [serviceAreas, setServiceAreas] = useState([
    { id: 1, area: '台北市大安區', radius: 5 },
    { id: 2, area: '台北市信義區', radius: 8 },
    { id: 3, area: '台北市中山區', radius: 6 }
  ]);

  const [breakTimes, setBreakTimes] = useState([
    { id: 1, start: '12:00', end: '13:00', description: '午休時間' }
  ]);

  const [unavailableDates, setUnavailableDates] = useState([
    { id: 1, date: '2025-06-15', reason: '個人事務' },
    { id: 2, date: '2025-06-20', reason: '家庭聚會' }
  ]);

  const [autoAccept, setAutoAccept] = useState(false);
  const [maxDailyJobs, setMaxDailyJobs] = useState(6);
  const [minNoticeHours, setMinNoticeHours] = useState(2);

  const dayNames = {
    monday: '星期一',
    tuesday: '星期二', 
    wednesday: '星期三',
    thursday: '星期四',
    friday: '星期五',
    saturday: '星期六',
    sunday: '星期日'
  };

  const updateWorkingHours = (day: string, field: string, value: any) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const addServiceArea = () => {
    const newId = Math.max(...serviceAreas.map(a => a.id)) + 1;
    setServiceAreas([...serviceAreas, { id: newId, area: '', radius: 5 }]);
  };

  const removeServiceArea = (id: number) => {
    setServiceAreas(serviceAreas.filter(area => area.id !== id));
  };

  const addBreakTime = () => {
    const newId = Math.max(...breakTimes.map(b => b.id)) + 1;
    setBreakTimes([...breakTimes, { id: newId, start: '12:00', end: '13:00', description: '' }]);
  };

  const removeBreakTime = (id: number) => {
    setBreakTimes(breakTimes.filter(bt => bt.id !== id));
  };

  const addUnavailableDate = () => {
    const newId = Math.max(...unavailableDates.map(d => d.id)) + 1;
    setUnavailableDates([...unavailableDates, { id: newId, date: '', reason: '' }]);
  };

  const removeUnavailableDate = (id: number) => {
    setUnavailableDates(unavailableDates.filter(date => date.id !== id));
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
                <h1 className="text-2xl font-bold text-gray-900">設定可用時間</h1>
                <p className="text-gray-600">管理您的工作時間和服務範圍</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
              <Save className="h-4 w-4 mr-2" />
              儲存設定
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Working Hours */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                工作時間設定
              </h3>
              <div className="space-y-4">
                {Object.entries(workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-20">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={hours.enabled}
                          onChange={(e) => updateWorkingHours(day, 'enabled', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium">{dayNames[day]}</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={hours.start}
                        onChange={(e) => updateWorkingHours(day, 'start', e.target.value)}
                        disabled={!hours.enabled}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                      />
                      <span className="text-gray-500">至</span>
                      <input
                        type="time"
                        value={hours.end}
                        onChange={(e) => updateWorkingHours(day, 'end', e.target.value)}
                        disabled={!hours.enabled}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Break Times */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  休息時間
                </h3>
                <button
                  onClick={addBreakTime}
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  新增
                </button>
              </div>
              <div className="space-y-3">
                {breakTimes.map((breakTime) => (
                  <div key={breakTime.id} className="flex items-center space-x-3">
                    <input
                      type="time"
                      value={breakTime.start}
                      onChange={(e) => {
                        const updated = breakTimes.map(bt => 
                          bt.id === breakTime.id ? { ...bt, start: e.target.value } : bt
                        );
                        setBreakTimes(updated);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-gray-500">至</span>
                    <input
                      type="time"
                      value={breakTime.end}
                      onChange={(e) => {
                        const updated = breakTimes.map(bt => 
                          bt.id === breakTime.id ? { ...bt, end: e.target.value } : bt
                        );
                        setBreakTimes(updated);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="備註"
                      value={breakTime.description}
                      onChange={(e) => {
                        const updated = breakTimes.map(bt => 
                          bt.id === breakTime.id ? { ...bt, description: e.target.value } : bt
                        );
                        setBreakTimes(updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => removeBreakTime(breakTime.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  服務範圍
                </h3>
                <button
                  onClick={addServiceArea}
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  新增區域
                </button>
              </div>
              <div className="space-y-3">
                {serviceAreas.map((area) => (
                  <div key={area.id} className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="服務區域"
                      value={area.area}
                      onChange={(e) => {
                        const updated = serviceAreas.map(a => 
                          a.id === area.id ? { ...a, area: e.target.value } : a
                        );
                        setServiceAreas(updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">半徑</span>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={area.radius}
                        onChange={(e) => {
                          const updated = serviceAreas.map(a => 
                            a.id === area.id ? { ...a, radius: parseInt(e.target.value) } : a
                          );
                          setServiceAreas(updated);
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-sm text-gray-600">公里</span>
                    </div>
                    <button
                      onClick={() => removeServiceArea(area.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Unavailable Dates */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  不可用日期
                </h3>
                <button
                  onClick={addUnavailableDate}
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  新增日期
                </button>
              </div>
              <div className="space-y-3">
                {unavailableDates.map((date) => (
                  <div key={date.id} className="flex items-center space-x-3">
                    <input
                      type="date"
                      value={date.date}
                      onChange={(e) => {
                        const updated = unavailableDates.map(d => 
                          d.id === date.id ? { ...d, date: e.target.value } : d
                        );
                        setUnavailableDates(updated);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="原因"
                      value={date.reason}
                      onChange={(e) => {
                        const updated = unavailableDates.map(d => 
                          d.id === date.id ? { ...d, reason: e.target.value } : d
                        );
                        setUnavailableDates(updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => removeUnavailableDate(date.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Automatic Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">自動化設定</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={autoAccept}
                      onChange={(e) => setAutoAccept(e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">自動接受符合條件的訂單</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    每日最大接單數
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={maxDailyJobs}
                    onChange={(e) => setMaxDailyJobs(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最短提前通知時間（小時）
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="48"
                    value={minNoticeHours}
                    onChange={(e) => setMinNoticeHours(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">目前狀態</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">目前為可接單狀態</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700">本週已接 12 個訂單</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">下次可用時間：今天 14:00</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <button className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors">
                  暫時停止接單
                </button>
                <button className="w-full bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 transition-colors">
                  設為忙碌狀態
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  複製上週設定
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">小提示</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• 保持可用時間穩定可提高客戶信任度</li>
                <li>• 設定合理的服務範圍可減少通勤時間</li>
                <li>• 適當的休息時間有助於服務品質</li>
                <li>• 自動接單功能可幫您節省時間</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanAvailability;