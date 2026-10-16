import { Injectable, computed, signal } from '@angular/core';
import { Product, CartItem } from '../models/product.model';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);
  public items = this.itemsSignal.asReadonly();

  public isDrawerOpen = signal<boolean>(false);

  public itemCount = computed(() => {
    return this.itemsSignal().reduce((total, item) => total + item.quantity, 0);
  });

  public subtotal = computed(() => {
    return this.itemsSignal().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  public discount = computed(() => {
    const sub = this.subtotal();
    return sub > 1500 ? Math.round(sub * 0.1) : 0; // 10% discount above ₹1500
  });

  public deliveryFee = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    return sub >= 999 ? 0 : 79; // Free delivery over ₹999
  });

  public total = computed(() => {
    return Math.max(0, this.subtotal() - this.discount() + this.deliveryFee());
  });

  constructor(private toastService: ToastService) {
    this.loadInitialCart();
  }

  private loadInitialCart() {
    // Initial sample item for instant demonstration
    // Product can be added by user
  }

  addToCart(product: Product, quantity: number = 1) {
    this.itemsSignal.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      if (existing) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { product, quantity }];
    });

    this.toastService.success(
      'Added to Cart',
      `${product.name} (Qty: ${quantity}) has been added to your cart.`
    );
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.itemsSignal.update(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  removeFromCart(productId: string) {
    const item = this.itemsSignal().find(i => i.product.id === productId);
    this.itemsSignal.update(items =>
      items.filter(i => i.product.id !== productId)
    );

    if (item) {
      this.toastService.info(
        'Item Removed',
        `${item.product.name} was removed from your cart.`
      );
    }
  }

  clearCart() {
    this.itemsSignal.set([]);
  }

  openDrawer() {
    this.isDrawerOpen.set(true);
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }

  toggleDrawer() {
    this.isDrawerOpen.update(v => !v);
  }
}
