import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';


interface Image {
  id: number;
  url: string;
  // thumbnail: string;
  alt: string;
  filename: string;
}

const IMAGES = {
  normal: [
    {
      id: 1,
      url: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/building.jpg",
      // thumbnail: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/building.jpg",
      alt: "White concrete building",
      filename: "building.jpg"
    },
    {
      id: 2,
      url: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/ox.jpg",
      // thumbnail: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/ox.jpg",
      alt: "Brown ox on mountain",
      filename: "ox.jpg"
    }
  ],
  vary: [
    {
      id: 1,
      url: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/building.jpg&vary=origin",
      // thumbnail: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/building.jpg&vary=origin",
      alt: "White concrete building",
      filename: "building.jpg"
    },
    {
      id: 2,
      url: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/ox.jpg&vary=origin",
      // thumbnail: "https://bcjohn-cors-static.s3.ap-southeast-2.amazonaws.com/ox.jpg&vary=origin",
      alt: "Brown ox on mountain",
      filename: "ox.jpg"
    }
  ],
}

const ImageViewer: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image>();
  // const [selectedImage, setSelectedImage] = useState<Image>(IMAGES.normal[0]);

  useEffect(() => {
    if (window.localStorage.getItem('vary')) {
      setIsVaryChecked(true);
      setImages(IMAGES.vary);
      setSelectedImage(IMAGES.vary[0]);
    } else {
      setIsVaryChecked(false);
      setImages(IMAGES.normal);
      setSelectedImage(IMAGES.normal[0]);
    }
  }, [])

  const handleImageSelect = (image: Image) => {
    setSelectedImage(image);
  };

  const downloadImage = async (image: Image) => {
    try {
      const response = await fetch(image.url);
      if (!response.ok) {
        window.alert('圖片連結失效');
        return;
      }

      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlObject;
      a.download = image.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error('下載失敗', error);
      window.alert(`下載失敗: ${error.message}`);
    }
  };

  const [isVaryChecked, setIsVaryChecked] = useState(false);
  const onVaryCheckedChange = (checked: boolean) => {
    setIsVaryChecked(checked);

    if (checked) {
      window.localStorage.setItem('vary', 'origin');
      setImages(IMAGES.vary);
    } else {
      window.localStorage.removeItem('vary');
      setImages(IMAGES.normal);
    }
  }

  return (
    <>
      {/* <div className='px-4 inline-flex items-center gap-2 cursor-pointer'>
        <Checkbox id="vary" className='cursor-pointer' checked={isVaryChecked} onCheckedChange={onVaryCheckedChange} />
        <label htmlFor="vary" className='cursor-pointer'>
          Enable <b>Vary: Origin</b>
        </label>
      </div> */}

      <div className="flex flex-col md:flex-row w-full gap-6 min-h-40 px-4 py-2">
        {/* 左側 - 主圖片顯示與底部縮圖 */}
        {selectedImage &&
          <div className="w-full md:w-3/5 flex flex-col gap-4">
            <div className="flex-1 border rounded-lg overflow-hidden bg-gray-50">
              <img
                src={selectedImage.url}
                crossOrigin='anonymous'
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />
            </div>
            {/* <div className="flex gap-3 mt-2">
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
                    src={image.url}
                    crossOrigin='anonymous'
                    alt={`Thumbnail ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>
        }

        {/* 右側 - 圖片庫 */}
        <div className="w-full md:w-2/5 bg-gray-50 p-4 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">圖片庫</h2>
          <div className="grid grid-cols-2 gap-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="aspect-square cursor-pointer hover:opacity-90 transition-opacity relative"
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
                    src={image.url}
                    crossOrigin='anonymous'
                    alt={`Gallery ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-1 right-2 p-1">
                  <div className="absolute right-0 w-max bg-white border rounded-md shadow-lg">
                    <button
                      className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => downloadImage(image)}
                    >
                      下載
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600 truncate">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageViewer;
