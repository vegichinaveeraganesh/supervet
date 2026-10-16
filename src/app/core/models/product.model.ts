export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  subCategory?: string;
  brand: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  stock: number;
  isInStock: boolean;
  sku: string;
  weight?: string;
  dimensions?: string;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  tags: string[];
  petType: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  specifications?: Record<string, string>;
  createdAt: Date;
}

export type ProductCategory =
  | 'Pet Food'
  | 'Treats'
  | 'Supplements'
  | 'Grooming Products'
  | 'Toys'
  | 'Beds'
  | 'Collars'
  | 'Leashes'
  | 'Hygiene Products'
  | 'Accessories';

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
