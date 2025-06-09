import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Share2, Edit, Trash2, Copy, Heart, Flag, Info, ChevronLeft, ChevronRight, Maximize, Minimize, Move, Crop, Filter, Palette, Copyright as Brightness4, Contrast, Scissors, Undo, Redo, Save, Upload, Grid3X3, Eye, EyeOff, Star, MessageSquare, Tag, Clock, User, MapPin, Camera } from 'lucide-react';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onImageChange?: (index: number) => void;
  onImageUpdate?: (updatedImage: string) => void;
  metadata?: {
    title?: string;
    description?: string;
    timestamp?: string;
    location?: string;
    photographer?: string;
    tags?: string[];
  };
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onImageChange,
  onImageUpdate,
  metadata
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sepia: 0,
    grayscale: 0
  });
  const [showInfo, setShowInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: '林師傅', text: '維修前的狀況照片', time: '2分鐘前' },
    { id: 2, user: '系統', text: '照片已自動分析完成', time: '1分鐘前' }
  ]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
          handleRotate();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onImageChange?.(currentIndex - 1);
      resetTransforms();
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onImageChange?.(currentIndex + 1);
      resetTransforms();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetTransforms = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sepia: 0,
      grayscale: 0
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `image-${currentIndex + 1}.jpg`;
    link.click();
  };

  const handleShare = (platform: string) => {
    const imageUrl = images[currentIndex];
    const text = '查看這張照片';
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(imageUrl);
        alert('圖片連結已複製到剪貼板');
        break;
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(imageUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(text)}`);
        break;
    }
    setShowShareMenu(false);
  };

  const applyFilter = (filterName: string, value: number) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        blur(${filters.blur}px)
        sepia(${filters.sepia}%)
        grayscale(${filters.grayscale}%)
      `
    };
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: '您',
        text: newComment,
        time: '剛剛'
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      {/* Header Controls */}
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">
              {currentIndex + 1} / {images.length}
            </span>
            {metadata?.title && (
              <h3 className="text-xl font-semibold">{metadata.title}</h3>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="圖片資訊"
            >
              <Info className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 hover:bg-white/20 rounded-lg transition-colors ${isLiked ? 'text-red-500' : ''}`}
              title="喜歡"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="分享"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {showShareMenu && (
                <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-2 min-w-[150px]">
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                    <span>複製連結</span>
                  </button>
                  <button
                    onClick={() => handleShare('line')}
                    className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-gray-700"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>LINE 分享</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-gray-700"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Facebook</span>
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="下載"
            >
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setEditMode(!editMode)}
              className={`p-2 hover:bg-white/20 rounded-lg transition-colors ${editMode ? 'bg-blue-600' : ''}`}
              title="編輯模式"
            >
              <Edit className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="全螢幕"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="關閉"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => setShowControls(!showControls)}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
            ...getFilterStyle()
          }}
          draggable={false}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all ${showControls ? 'opacity-100' : 'opacity-0'} disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all ${showControls ? 'opacity-100' : 'opacity-0'} disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-center space-x-4 text-white">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="縮小"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-medium min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="放大"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-white/30"></div>
          
          <button
            onClick={handleRotate}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="旋轉"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          
          <button
            onClick={resetTransforms}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="重置"
          >
            <Undo className="w-5 h-5" />
          </button>
        </div>
        
        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageChange?.(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Edit Panel */}
      {editMode && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-64 max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">圖片編輯</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                亮度: {filters.brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={filters.brightness}
                onChange={(e) => applyFilter('brightness', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                對比度: {filters.contrast}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={filters.contrast}
                onChange={(e) => applyFilter('contrast', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                飽和度: {filters.saturation}%
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={filters.saturation}
                onChange={(e) => applyFilter('saturation', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                模糊: {filters.blur}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={filters.blur}
                onChange={(e) => applyFilter('blur', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                復古: {filters.sepia}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.sepia}
                onChange={(e) => applyFilter('sepia', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                灰階: {filters.grayscale}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.grayscale}
                onChange={(e) => applyFilter('grayscale', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="flex space-x-2 pt-4 border-t">
              <button
                onClick={resetTransforms}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                重置
              </button>
              <button
                onClick={() => {
                  // Save edited image logic here
                  alert('圖片已儲存！');
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-64 max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">圖片資訊</h3>
          
          <div className="space-y-3">
            {metadata?.title && (
              <div>
                <p className="text-sm font-medium text-gray-700">標題</p>
                <p className="text-sm text-gray-600">{metadata.title}</p>
              </div>
            )}
            
            {metadata?.description && (
              <div>
                <p className="text-sm font-medium text-gray-700">描述</p>
                <p className="text-sm text-gray-600">{metadata.description}</p>
              </div>
            )}
            
            {metadata?.timestamp && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">拍攝時間</p>
                  <p className="text-sm text-gray-600">{metadata.timestamp}</p>
                </div>
              </div>
            )}
            
            {metadata?.photographer && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">拍攝者</p>
                  <p className="text-sm text-gray-600">{metadata.photographer}</p>
                </div>
              </div>
            )}
            
            {metadata?.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">位置</p>
                  <p className="text-sm text-gray-600">{metadata.location}</p>
                </div>
              </div>
            )}
            
            {metadata?.tags && metadata.tags.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">標籤</p>
                <div className="flex flex-wrap gap-1">
                  {metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Comments Section */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">評論</h4>
            
            <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-gray-700">{comment.user}</span>
                    <span className="text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{comment.text}</p>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="新增評論..."
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                發送
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageViewer;