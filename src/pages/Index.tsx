
import ImageViewer from '@/components/ImageViewer';

const Index = () => {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">圖片切換展示</h1>
        <p className="text-gray-600">點擊縮圖來切換主圖片</p>
      </div>
      <ImageViewer />
    </div>
  );
};

export default Index;
