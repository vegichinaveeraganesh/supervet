import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSignal = signal<Product[]>([]);
  public products = this.productsSignal.asReadonly();

  public categories = computed<string[]>(() => {
    const list = Array.from(new Set(this.productsSignal().map(p => p.category)));
    return ['All', ...list];
  });

  constructor(private mockData: MockDataService) {
    this.productsSignal.set(this.mockData.getProducts());
  }

  getProducts(): Product[] {
    return this.productsSignal();
  }

  getFeaturedProducts(): Product[] {
    return this.productsSignal().filter(p => p.isFeatured);
  }

  getBestSellers(): Product[] {
    return this.productsSignal().filter(p => p.isBestSeller);
  }

  getProductById(id: string): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  filterProducts(category?: string, petType?: string, query?: string, sortBy?: string): Product[] {
    let result = this.productsSignal();

    if (category && category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (petType && petType !== 'All') {
      result = result.filter(p => p.petType.includes(petType));
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }
}
