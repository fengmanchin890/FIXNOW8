import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, MapPin, AlertTriangle, TrendingUp, Info } from 'lucide-react';

interface PricingFactors {
  basePrice: number;
  locationSurcharge: number;
  urgencySurcharge: number;
  timeOfDaySurcharge: number;
  complexitySurcharge: number;
  demandMultiplier: number;
}

interface DynamicPricingProps {
  serviceType: string;
  urgency: 'low' | 'normal' | 'high';
  location: string;
  timeSlot: 'business' | 'evening' | 'emergency';
  complexity: 'simple' | 'moderate' | 'complex';
}

const DynamicPricing: React.FC<DynamicPricingProps> = ({
  serviceType,
  urgency,
  location,
  timeSlot,
  complexity
}) => {
  const [pricing, setPricing] = useState<PricingFactors>({
    basePrice: 800,
    locationSurcharge: 0,
    urgencySurcharge: 0,
    timeOfDaySurcharge: 0,
    complexitySurcharge: 0,
    demandMultiplier: 1.0
  });
  const [isCalculating, setIsCalculating] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    calculatePricing();
  }, [serviceType, urgency, location, timeSlot, complexity]);

  const calculatePricing = async () => {
    setIsCalculating(true);
    
    // Simulate API call for dynamic pricing
    setTimeout(() => {
      const basePrices: { [key: string]: number } = {
        'plumbing': 800,
        'electrical': 600,
        'appliance': 1000,
        'lock': 500,
        'furniture': 400,
        'general': 500
      };

      const basePrice = basePrices[serviceType] || 500;
      
      // Location-based pricing
      const locationMultipliers: { [key: string]: number } = {
        '台北市': 1.2,
        '新北市': 1.1,
        '桃園市': 1.0,
        '台中市': 0.95,
        '高雄市': 0.9
      };
      
      const locationKey = Object.keys(locationMultipliers).find(key => location.includes(key)) || '其他';
      const locationSurcharge = Math.round(basePrice * (locationMultipliers[locationKey] || 1.0) - basePrice);

      // Urgency surcharge
      const urgencyMultipliers = {
        'low': 0,
        'normal': 0.1,
        'high': 0.5
      };
      const urgencySurcharge = Math.round(basePrice * urgencyMultipliers[urgency]);

      // Time of day surcharge
      const timeMultipliers = {
        'business': 0,
        'evening': 0.2,
        'emergency': 0.5
      };
      const timeOfDaySurcharge = Math.round(basePrice * timeMultipliers[timeSlot]);

      // Complexity surcharge
      const complexityMultipliers = {
        'simple': 0,
        'moderate': 0.15,
        'complex': 0.3
      };
      const complexitySurcharge = Math.round(basePrice * complexityMultipliers[complexity]);

      // Demand multiplier (simulated real-time demand)
      const demandMultiplier = 0.9 + Math.random() * 0.4; // 0.9 to 1.3

      setPricing({
        basePrice,
        locationSurcharge,
        urgencySurcharge,
        timeOfDaySurcharge,
        complexitySurcharge,
        demandMultiplier
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const getTotalPrice = () => {
    const subtotal = pricing.basePrice + pricing.locationSurcharge + pricing.urgencySurcharge + 
                    pricing.timeOfDaySurcharge + pricing.complexitySurcharge;
    return Math.round(subtotal * pricing.demandMultiplier);
  };

  const getCalloutFee = () => {
    const distance = Math.random() * 10 + 2; // 2-12 km
    return Math.round(distance * 20); // NT$20 per km
  };

  const getDiagnosticFee = () => {
    return complexity === 'complex' ? 300 : complexity === 'moderate' ? 200 : 100;
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'normal': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDemandLevel = () => {
    if (pricing.demandMultiplier > 1.2) return { level: '高', color: 'text-red-600', icon: TrendingUp };
    if (pricing.demandMultiplier > 1.0) return { level: '中', color: 'text-yellow-600', icon: TrendingUp };
    return { level: '低', color: 'text-green-600', icon: TrendingUp };
  };

  if (isCalculating) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="animate-spin">
            <DollarSign className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900">計算最優價格中...</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const demandInfo = getDemandLevel();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">透明定價</h3>
        <div className="flex items-center space-x-2">
          <demandInfo.icon className={`w-4 h-4 ${demandInfo.color}`} />
          <span className={`text-sm font-medium ${demandInfo.color}`}>
            需求量：{demandInfo.level}
          </span>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-primary-50 rounded-lg p-6 mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary-600 mb-2">
            NT${getTotalPrice().toLocaleString()}
          </p>
          <p className="text-gray-600">預估總費用</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-primary-200">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">NT${getCalloutFee()}</p>
            <p className="text-xs text-gray-600">出車費</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">NT${getDiagnosticFee()}</p>
            <p className="text-xs text-gray-600">檢測費</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">NT${getTotalPrice() - getCalloutFee() - getDiagnosticFee()}</p>
            <p className="text-xs text-gray-600">維修費</p>
          </div>
        </div>
      </div>

      {/* Pricing Factors */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">服務類型</span>
          <span className="font-medium">{serviceType === 'plumbing' ? '水管維修' : '其他服務'}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">緊急程度</span>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getUrgencyColor(urgency)}`}>
            {urgency === 'high' ? '緊急' : urgency === 'normal' ? '一般' : '不急'}
            {pricing.urgencySurcharge > 0 && ` (+NT$${pricing.urgencySurcharge})`}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">服務時段</span>
          <span className="font-medium">
            {timeSlot === 'emergency' ? '緊急時段' : timeSlot === 'evening' ? '晚間時段' : '營業時段'}
            {pricing.timeOfDaySurcharge > 0 && (
              <span className="text-orange-600 ml-1">(+NT${pricing.timeOfDaySurcharge})</span>
            )}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">複雜程度</span>
          <span className="font-medium">
            {complexity === 'complex' ? '複雜' : complexity === 'moderate' ? '中等' : '簡單'}
            {pricing.complexitySurcharge > 0 && (
              <span className="text-orange-600 ml-1">(+NT${pricing.complexitySurcharge})</span>
            )}
          </span>
        </div>
      </div>

      {/* Price Breakdown Toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
      >
        <Info className="w-4 h-4 mr-2" />
        {showBreakdown ? '隱藏' : '顯示'}價格明細
      </button>

      {/* Detailed Breakdown */}
      {showBreakdown && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">價格計算明細</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">基本費用</span>
              <span>NT${pricing.basePrice}</span>
            </div>
            {pricing.locationSurcharge !== 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">地區調整</span>
                <span className={pricing.locationSurcharge > 0 ? 'text-red-600' : 'text-green-600'}>
                  {pricing.locationSurcharge > 0 ? '+' : ''}NT${pricing.locationSurcharge}
                </span>
              </div>
            )}
            {pricing.urgencySurcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">緊急加價</span>
                <span className="text-red-600">+NT${pricing.urgencySurcharge}</span>
              </div>
            )}
            {pricing.timeOfDaySurcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">時段加價</span>
                <span className="text-red-600">+NT${pricing.timeOfDaySurcharge}</span>
              </div>
            )}
            {pricing.complexitySurcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">複雜度加價</span>
                <span className="text-red-600">+NT${pricing.complexitySurcharge}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-600">小計</span>
                <span>NT${pricing.basePrice + pricing.locationSurcharge + pricing.urgencySurcharge + pricing.timeOfDaySurcharge + pricing.complexitySurcharge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">需求調整 (×{pricing.demandMultiplier.toFixed(2)})</span>
                <span className={pricing.demandMultiplier > 1 ? 'text-red-600' : 'text-green-600'}>
                  {pricing.demandMultiplier > 1 ? '+' : ''}NT${getTotalPrice() - (pricing.basePrice + pricing.locationSurcharge + pricing.urgencySurcharge + pricing.timeOfDaySurcharge + pricing.complexitySurcharge)}
                </span>
              </div>
            </div>
            <div className="border-t pt-2 mt-2 font-semibold">
              <div className="flex justify-between">
                <span>總計</span>
                <span>NT${getTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price Guarantee */}
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">價格保證</span>
        </div>
        <p className="text-xs text-green-700 mt-1">
          此為預估價格，實際費用不會超過預估價格的110%
        </p>
      </div>
    </div>
  );
};

export default DynamicPricing;