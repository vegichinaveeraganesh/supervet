export interface GroomingPackage {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  originalPrice?: number;
  duration: string;
  includes: string[];
  petTypes: string[];
  isPopular: boolean;
  image?: string;
}
