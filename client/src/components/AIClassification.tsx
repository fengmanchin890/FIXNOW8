import { useState, useEffect } from 'react';
import { Brain, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface AIClassificationProps {
  images: string[];
  description: string;
  onClassification: (result: any) => void;
}

const AIClassification: React.FC<AIClassificationProps> = ({ images, description, onClassification }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (images.length > 0 || description.trim()) {
      analyzeIssue();
    }
  }, [images, description]);

  const analyzeIssue = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        category: 'plumbing',
        severity: 'medium',
        urgency: 'normal',
        estimatedDuration: '1-2 hours',
        confidence: 0.87,
        suggestedTools: ['pipe wrench', 'plumber\'s tape', 'pipe cutter'],
        estimatedCost: { min: 800, max: 1200 },
        recommendations: [
          '建議立即處理以避免水損',
          '可能需要更換管件',
          '檢查周圍是否有其他漏水點'
        ]
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      onClassification(mockResult);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return '嚴重';
      case 'medium': return '中等';
      case 'low': return '輕微';
      default: return '未知';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">AI 智能分析中...</h3>
            <p className="text-sm text-blue-700">正在分析問題類型和嚴重程度</p>
          </div>
        </div>
        <div className="mt-4 bg-blue-100 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-sm text-blue-800">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span>圖像識別處理中...</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-blue-800 mt-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>問題分類分析中...</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-blue-800 mt-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>生成維修建議中...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-green-100 p-2 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI 分析完成</h3>
          <p className="text-sm text-gray-600">信心度：{(result.confidence * 100).toFixed(0)}%</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">問題類型</span>
            <span className="font-medium">水管維修</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">嚴重程度</span>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
              {getSeverityText(result.severity)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">預估時間</span>
            <span className="font-medium">{result.estimatedDuration}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">預估費用</span>
            <span className="font-medium">NT${result.estimatedCost.min}-{result.estimatedCost.max}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">緊急程度</span>
            <span className="font-medium">
              {result.urgency === 'high' ? '緊急' : result.urgency === 'normal' ? '一般' : '不急'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">建議工具</h4>
          <div className="flex flex-wrap gap-2">
            {result.suggestedTools.map((tool: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">AI 建議</h4>
          <ul className="space-y-1">
            {result.recommendations.map((rec: string, index: number) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIClassification;