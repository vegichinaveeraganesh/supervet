import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {
  constructor(public cartService: CartService, private router: Router) {}

  goToStore() {
    this.cartService.closeDrawer();
    this.router.navigate(['/store']);
  }

  proceedToCheckout() {
    this.cartService.closeDrawer();
    this.router.navigate(['/checkout']);
  }
}
