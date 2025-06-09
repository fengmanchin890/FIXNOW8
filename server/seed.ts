import { db } from './db';
import { serviceCategories } from '@shared/schema';
import { hashPassword } from './auth';

export async function seedDatabase() {
  try {
    console.log('開始建立種子資料...');

    // 建立服務類別
    const categories = [
      {
        name: '水電維修',
        description: '水管漏水、電路維修、開關插座',
        icon: 'droplets',
        basePrice: '800'
      },
      {
        name: '電器維修',
        description: '家電維修、照明安裝、電路問題',
        icon: 'zap',
        basePrice: '600'
      },
      {
        name: '家電服務',
        description: '冷氣清洗、洗衣機維修、冰箱檢修',
        icon: 'settings',
        basePrice: '1200'
      },
      {
        name: '家具安裝',
        description: '組裝、修理、調整各類家具',
        icon: 'home',
        basePrice: '500'
      },
      {
        name: '鎖具服務',
        description: '開鎖、換鎖、修鎖專業服務',
        icon: 'shield',
        basePrice: '600'
      },
      {
        name: '一般維修',
        description: '其他居家維修需求',
        icon: 'wrench',
        basePrice: '700'
      }
    ];

    await db.insert(serviceCategories).values(categories).onConflictDoNothing();
    console.log('✓ 服務類別種子資料建立完成');

    console.log('種子資料建立完成！');
  } catch (error) {
    console.error('種子資料建立失敗:', error);
  }
}