
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Image {
  id: number;
  url: string;
  thumbnail: string;
  alt: string;
}

const images: Image[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    alt: "White robot near brown wall"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    alt: "Person holding blue light bulb"
  }
];

const ImageViewer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image>(images[0]);

  const handleImageSelect = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 min-h-screen px-4 py-8">
      {/* 左側 - 主圖片顯示與底部縮圖 */}
      <div className="w-full md:w-3/5 flex flex-col gap-4">
        <div className="flex-1 border rounded-lg overflow-hidden bg-gray-50">
          <img 
            src={selectedImage.url} 
            alt={selectedImage.alt} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex gap-3 mt-2">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => handleImageSelect(image)}
              className={cn(
                "w-16 h-16 border-2 rounded-md overflow-hidden transition-all",
                selectedImage.id === image.id 
                  ? "border-blue-500 shadow-md" 
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <img 
                src={image.thumbnail} 
                alt={`Thumbnail ${image.id}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* 右側 - 圖片庫 */}
      <div className="w-full md:w-2/5 bg-gray-50 p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">圖片庫</h2>
        <div className="grid grid-cols-2 gap-3">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="aspect-square cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div 
                onClick={() => handleImageSelect(image)}
                className={cn(
                  "w-full h-full border-2 rounded-md overflow-hidden",
                  selectedImage.id === image.id 
                    ? "border-blue-500 shadow-md" 
                    : "border-gray-200"
                )}
              >
                <img 
                  src={image.thumbnail} 
                  alt={`Gallery ${image.id}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-1 text-sm text-gray-600 truncate">{image.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
