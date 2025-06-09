// AI Service for analyzing booking requests and providing intelligent recommendations
export interface AIAnalysisResult {
  severity: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  estimatedTime: number; // minutes
  estimatedCost: number;
  recommendedTools: string[];
  riskFactors: string[];
  confidence: number;
  skillsRequired: string[];
  urgencyScore: number;
}

export class AIService {
  static async analyzeBooking(
    description: string,
    images: string[],
    serviceType: string,
    urgency: string
  ): Promise<AIAnalysisResult> {
    // Simulate AI analysis based on keywords and context
    // In production, this would integrate with OpenAI, computer vision APIs, etc.
    
    const keywords = description.toLowerCase();
    let severity: AIAnalysisResult['severity'] = 'medium';
    let estimatedTime = 60;
    let estimatedCost = 800;
    let riskFactors: string[] = [];
    let recommendedTools: string[] = [];
    let skillsRequired: string[] = [];
    let urgencyScore = 5;

    // Analyze by service type
    if (serviceType.includes('plumbing') || keywords.includes('水')) {
      recommendedTools = ['扳手', '水管鉗', '水管膠', '疏通器'];
      skillsRequired = ['水電技術士', '管線安裝經驗'];
      
      if (keywords.includes('漏水') || keywords.includes('破裂')) {
        severity = 'high';
        riskFactors.push('水損風險', '結構損害可能');
        estimatedTime = 90;
        estimatedCost = 1200;
        urgencyScore = 8;
      }
      
      if (keywords.includes('堵塞') || keywords.includes('不通')) {
        severity = 'medium';
        riskFactors.push('衛生問題');
        estimatedTime = 45;
        estimatedCost = 600;
        urgencyScore = 6;
      }
    }

    if (serviceType.includes('electrical') || keywords.includes('電')) {
      recommendedTools = ['萬用表', '絕緣工具', '電線剝皮器', '螺絲起子組'];
      skillsRequired = ['室內配線技術士', '電器修護經驗'];
      
      if (keywords.includes('跳電') || keywords.includes('短路') || keywords.includes('火花')) {
        severity = 'urgent';
        riskFactors.push('火災風險', '觸電危險', '設備損壞');
        estimatedTime = 120;
        estimatedCost = 1500;
        urgencyScore = 10;
      }
      
      if (keywords.includes('燈不亮') || keywords.includes('插座')) {
        severity = 'low';
        estimatedTime = 30;
        estimatedCost = 400;
        urgencyScore = 3;
      }
    }

    if (serviceType.includes('appliance') || keywords.includes('家電')) {
      recommendedTools = ['家電檢修工具', '清潔用品', '零件替換工具'];
      skillsRequired = ['家電維修經驗', '電器檢修能力'];
      
      if (keywords.includes('冷氣') || keywords.includes('空調')) {
        recommendedTools.push('冷媒檢測器', '真空泵');
        skillsRequired.push('冷凍空調技術士');
        estimatedTime = 90;
        estimatedCost = 1200;
      }
      
      if (keywords.includes('洗衣機') || keywords.includes('冰箱')) {
        estimatedTime = 75;
        estimatedCost = 1000;
      }
    }

    // Adjust based on urgency
    if (urgency === 'high') {
      urgencyScore += 3;
      estimatedCost *= 1.3; // 30% surcharge for high urgency
    } else if (urgency === 'low') {
      urgencyScore -= 2;
      estimatedCost *= 0.9; // 10% discount for low urgency
    }

    // Time of day adjustments (simulate dynamic pricing)
    const hour = new Date().getHours();
    if (hour < 8 || hour > 18) {
      estimatedCost *= 1.2; // 20% surcharge for after hours
      riskFactors.push('非營業時間服務');
    }

    // Image analysis simulation
    if (images.length > 0) {
      // Simulate computer vision analysis
      urgencyScore += 1; // Having images generally helps with analysis
      riskFactors.push('已提供現場照片，可更準確評估');
    }

    // Calculate confidence based on available information
    let confidence = 0.7; // Base confidence
    if (images.length > 0) confidence += 0.1;
    if (description.length > 50) confidence += 0.1;
    if (serviceType) confidence += 0.1;

    return {
      severity,
      category: serviceType,
      estimatedTime,
      estimatedCost: Math.round(estimatedCost),
      recommendedTools,
      riskFactors,
      confidence: Math.min(confidence, 1.0),
      skillsRequired,
      urgencyScore: Math.min(urgencyScore, 10)
    };
  }

  static async findBestArtisans(
    analysis: AIAnalysisResult,
    availableArtisans: any[],
    userLocation: { lat: number; lng: number }
  ): Promise<any[]> {
    // Score artisans based on various factors
    const scoredArtisans = availableArtisans.map(artisan => {
      let score = 0;
      
      // Skill matching
      const artisanSkills = artisan.specialties || [];
      const requiredSkills = analysis.skillsRequired;
      const skillMatch = requiredSkills.filter(skill => 
        artisanSkills.some((aSkill: string) => aSkill.includes(skill))
      ).length / Math.max(requiredSkills.length, 1);
      score += skillMatch * 30;

      // Rating
      score += parseFloat(artisan.rating || 0) * 10;

      // Experience (total jobs completed)
      score += Math.min(artisan.completedJobs || 0, 100) * 0.1;

      // Distance (simulate - in real app would use actual coordinates)
      const distance = Math.random() * 20; // km
      score += Math.max(0, 20 - distance);

      // Availability
      if (artisan.isOnline) score += 10;

      return {
        ...artisan,
        matchScore: Math.round(score),
        skillMatch: Math.round(skillMatch * 100),
        distance: Math.round(distance * 10) / 10
      };
    });

    // Sort by score and return top matches
    return scoredArtisans
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }

  static calculateDynamicPricing(
    basePrice: number,
    urgency: string,
    timeOfDay: string,
    location: string,
    demand: number = 1
  ): {
    finalPrice: number;
    breakdown: {
      basePrice: number;
      urgencySurcharge: number;
      timeOfDaySurcharge: number;
      locationSurcharge: number;
      demandMultiplier: number;
    };
  } {
    let finalPrice = basePrice;
    const breakdown = {
      basePrice,
      urgencySurcharge: 0,
      timeOfDaySurcharge: 0,
      locationSurcharge: 0,
      demandMultiplier: 1
    };

    // Urgency pricing
    if (urgency === 'high') {
      breakdown.urgencySurcharge = basePrice * 0.3;
      finalPrice += breakdown.urgencySurcharge;
    } else if (urgency === 'urgent') {
      breakdown.urgencySurcharge = basePrice * 0.5;
      finalPrice += breakdown.urgencySurcharge;
    }

    // Time of day pricing
    const hour = new Date().getHours();
    if (hour < 8 || hour > 18) {
      breakdown.timeOfDaySurcharge = basePrice * 0.2;
      finalPrice += breakdown.timeOfDaySurcharge;
    } else if (hour >= 18 && hour <= 22) {
      breakdown.timeOfDaySurcharge = basePrice * 0.1;
      finalPrice += breakdown.timeOfDaySurcharge;
    }

    // Location surcharge (simulate premium areas)
    if (location.includes('信義區') || location.includes('大安區')) {
      breakdown.locationSurcharge = basePrice * 0.15;
      finalPrice += breakdown.locationSurcharge;
    }

    // Demand multiplier
    if (demand > 1.5) {
      breakdown.demandMultiplier = 1.2;
      finalPrice *= breakdown.demandMultiplier;
    } else if (demand < 0.8) {
      breakdown.demandMultiplier = 0.9;
      finalPrice *= breakdown.demandMultiplier;
    }

    return {
      finalPrice: Math.round(finalPrice),
      breakdown
    };
  }
}