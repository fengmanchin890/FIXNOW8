import { useState } from 'react';
import { Star, Camera, MessageSquare, ThumbsUp, Flag, Award, CheckCircle } from 'lucide-react';

interface RatingSystemProps {
  orderId: string;
  technicianName: string;
  technicianAvatar: string;
  serviceType: string;
  onSubmitRating: (rating: any) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  orderId,
  technicianName,
  technicianAvatar,
  serviceType,
  onSubmitRating
}) => {
  const [ratings, setRatings] = useState({
    punctuality: 0,
    professionalism: 0,
    clarity: 0,
    quality: 0
  });
  const [overallRating, setOverallRating] = useState(0);
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [reportIssue, setReportIssue] = useState(false);

  const ratingCategories = [
    { key: 'punctuality', label: '準時性', icon: '⏰' },
    { key: 'professionalism', label: '專業度', icon: '👔' },
    { key: 'clarity', label: '溝通清晰', icon: '💬' },
    { key: 'quality', label: '服務品質', icon: '⭐' }
  ];

  const handleRatingChange = (category: string, rating: number) => {
    const newRatings = { ...ratings, [category]: rating };
    setRatings(newRatings);
    
    // Calculate overall rating
    const total = Object.values(newRatings).reduce((sum, val) => sum + val, 0);
    const average = total / Object.keys(newRatings).length;
    setOverallRating(Math.round(average * 10) / 10);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handleSubmit = () => {
    const ratingData = {
      orderId,
      overallRating,
      categoryRatings: ratings,
      review,
      photos,
      wouldRecommend,
      reportIssue,
      timestamp: new Date().toISOString()
    };
    
    onSubmitRating(ratingData);
    setIsSubmitted(true);
  };

  const canSubmit = () => {
    return overallRating > 0 && Object.values(ratings).every(rating => rating > 0);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">評價已提交！</h3>
        <p className="text-gray-600 mb-6">感謝您的寶貴意見，這將幫助我們提供更好的服務</p>
        
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-primary-900">獲得回饋獎勵</span>
          </div>
          <p className="text-sm text-primary-700">您已獲得 50 點回饋點數，可用於下次服務折扣</p>
        </div>
        
        <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
          返回首頁
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">服務評價</h3>
        <p className="text-gray-600">請為本次服務體驗評分</p>
      </div>

      {/* Technician Info */}
      <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <img
          src={technicianAvatar}
          alt={technicianName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{technicianName}</h4>
          <p className="text-sm text-gray-600">{serviceType}</p>
        </div>
      </div>

      {/* Overall Rating */}
      <div className="text-center mb-6">
        <p className="text-lg font-medium text-gray-900 mb-3">整體評分</p>
        <div className="flex justify-center space-x-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setOverallRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= overallRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 hover:text-yellow-200'
                }`}
              />
            </button>
          ))}
        </div>
        {overallRating > 0 && (
          <p className="text-2xl font-bold text-yellow-600">{overallRating} 星</p>
        )}
      </div>

      {/* Category Ratings */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900">詳細評分</h4>
        {ratingCategories.map((category) => (
          <div key={category.key} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="font-medium text-gray-700">{category.label}</span>
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(category.key, star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= ratings[category.key as keyof typeof ratings]
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 hover:text-yellow-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Written Review */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          服務心得 (選填)
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="分享您對本次服務的感想..."
        />
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          服務成果照片 (選填)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center">
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">上傳服務完成後的照片</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer inline-block"
            >
              選擇照片
            </label>
          </div>
          {photos.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`服務照片 ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">您會推薦這位師傅給朋友嗎？</p>
        <div className="flex space-x-4">
          <button
            onClick={() => setWouldRecommend(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
              wouldRecommend === true
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 text-gray-600 hover:border-green-300'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>會推薦</span>
          </button>
          <button
            onClick={() => setWouldRecommend(false)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
              wouldRecommend === false
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 text-gray-600 hover:border-red-300'
            }`}
          >
            <span>不推薦</span>
          </button>
        </div>
      </div>

      {/* Report Issue */}
      <div className="mb-6">
        <button
          onClick={() => setReportIssue(!reportIssue)}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm"
        >
          <Flag className="w-4 h-4" />
          <span>回報服務問題</span>
        </button>
        {reportIssue && (
          <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <textarea
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={3}
              placeholder="請詳細描述遇到的問題..."
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit()}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          canSubmit()
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        提交評價
      </button>
    </div>
  );
};

export default RatingSystem;