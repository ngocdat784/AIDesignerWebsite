export interface Template {
  id: string;

  slug: string;

  title: string;

  description: string;

  thumbnail: string;

  // Ảnh lớn dùng ở trang chi tiết
  coverImage: string;

  // Danh sách ảnh preview
  gallery: string[];

  category: string;

  tags: string[];

  price: number;

  discountPrice?: number;

  rating: number;

  reviewCount: number;

  downloads: number;

  // Thống kê bổ sung
  favorites: number;

  views: number;

  author: {
    id: string;
    name: string;
    avatar: string;
  };

  // Công nghệ sử dụng
  techStack: string[];

  // File đi kèm
  includedFiles: string[];

  // Link demo
  demoUrl: string;

  // Giấy phép
  license: "Personal" | "Commercial";

  // Phiên bản hiện tại
  version: string;

  isFeatured: boolean;

  isPremium: boolean;

  createdAt: string;

  // Lần cập nhật gần nhất
  updatedAt: string;
}