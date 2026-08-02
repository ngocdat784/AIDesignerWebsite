export interface Template {
  id: string;

  title: string;

  slug: string;

  description: string;

  thumbnail: string;

  gallery: string[];

  category: string;

  tags: string[];

  price: number;

  discountPrice?: number;

  rating: number;

  reviewCount: number;

  downloads: number;

  author: {
    id: string;
    name: string;
    avatar: string;
  };

  isFeatured: boolean;

  isPremium: boolean;

  createdAt: string;
}