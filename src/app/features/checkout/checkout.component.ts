import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconComponent],
  template: `
    <div class="checkout-page">
      <section class="page-hero">
        <div class="container">
          <span class="hero-badge">Secure Order Checkout</span>
          <h1>Pet Store Order & Pharmacy Delivery</h1>
          <p>Express doorstep delivery across Hyderabad or pickup from Banjara Hills hospital pharmacy.</p>
        </div>
      </section>

      <section class="checkout-section">
        <div class="container">
          @if (orderPlaced) {
            <div class="order-success-card">
              <div class="success-icon-wrap">
                <app-icon name="check-circle" size="64" color="#10B981"></app-icon>
              </div>
              <h2>Order Placed Successfully!</h2>
              <span class="order-id-badge">Order ID: #SV-{{ placedOrderId }}</span>
              <p class="success-msg">
                Thank you, <strong>{{ fullName }}</strong>! Your pet supplies order of <strong>₹{{ placedTotal }}</strong> is confirmed. A tracking link has been sent to {{ phone }}.
              </p>

              <div class="success-actions">
                <a routerLink="/store" class="btn btn-primary">Continue Shopping</a>
                <a routerLink="/" class="btn btn-secondary">Back to Home</a>
              </div>
            </div>
          } @else if (cartService.items().length === 0) {
            <div class="empty-cart-card">
              <app-icon name="shopping-bag" size="56" color="#94A3B8"></app-icon>
              <h3>Your Cart is Empty</h3>
              <p>Add some products, supplements, or prescription diets to proceed to checkout.</p>
              <a routerLink="/store" class="btn btn-primary">Browse Pet Store</a>
            </div>
          } @else {
            <div class="checkout-grid">
              <!-- Left Column: Delivery & Payment Details -->
              <div class="checkout-form-col">
                <div class="card-box">
                  <h3>1. Delivery & Contact Details</h3>

                  <div class="form-grid">
                    <div class="form-group">
                      <label>Pet Parent Full Name</label>
                      <input type="text" [(ngModel)]="fullName" placeholder="e.g. Ganesh Vegi" />
                    </div>

                    <div class="form-group">
                      <label>Mobile Number (for delivery OTP)</label>
                      <input type="tel" [(ngModel)]="phone" placeholder="+91 98765 43210" />
                    </div>

                    <div class="form-group full">
                      <label>Delivery Address</label>
                      <input type="text" [(ngModel)]="address" placeholder="Flat / House No, Building, Street" />
                    </div>

                    <div class="form-group">
                      <label>Area / Locality</label>
                      <input type="text" [(ngModel)]="locality" placeholder="e.g. Banjara Hills, Rd 12" />
                    </div>

                    <div class="form-group">
                      <label>Pincode (Hyderabad)</label>
                      <input type="text" [(ngModel)]="pincode" placeholder="500034" />
                    </div>
                  </div>
                </div>

                <div class="card-box">
                  <h3>2. Select Payment Method</h3>

                  <div class="payment-options">
                    <label class="pay-option" [class.selected]="paymentMethod === 'UPI'">
                      <input type="radio" [(ngModel)]="paymentMethod" value="UPI" name="pay" />
                      <div class="pay-info">
                        <strong>Instant UPI (Google Pay / PhonePe / Paytm / QR)</strong>
                        <span>Zero transaction fee • Instant order processing</span>
                      </div>
                    </label>

                    <label class="pay-option" [class.selected]="paymentMethod === 'Card'">
                      <input type="radio" [(ngModel)]="paymentMethod" value="Card" name="pay" />
                      <div class="pay-info">
                        <strong>Credit / Debit Card / NetBanking</strong>
                        <span>Visa, MasterCard, RuPay accepted</span>
                      </div>
                    </label>

                    <label class="pay-option" [class.selected]="paymentMethod === 'Pickup'">
                      <input type="radio" [(ngModel)]="paymentMethod" value="Pickup" name="pay" />
                      <div class="pay-info">
                        <strong>Pay on Hospital Pickup (Pharmacy Counter)</strong>
                        <span>Collect at Banjara Hills facility within 24 hours</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Right Column: Order Summary -->
              <div class="order-summary-col">
                <div class="card-box summary-card">
                  <h3>Order Summary ({{ cartService.itemCount() }} Items)</h3>

                  <div class="items-mini-list">
                    @for (item of cartService.items(); track item.product.id) {
                      <div class="mini-item">
                        <div class="mini-item-info">
                          <h5>{{ item.product.name }}</h5>
                          <span>Qty: {{ item.quantity }} × ₹{{ item.product.price }}</span>
                        </div>
                        <strong class="mini-item-total">₹{{ item.product.price * item.quantity }}</strong>
                      </div>
                    }
                  </div>

                  <div class="bill-breakdown">
                    <div class="row">
                      <span>Items Subtotal</span>
                      <span>₹{{ cartService.subtotal() }}</span>
                    </div>
                    @if (cartService.discount() > 0) {
                      <div class="row discount">
                        <span>Special Promo (10%)</span>
                        <span>-₹{{ cartService.discount() }}</span>
                      </div>
                    }
                    <div class="row">
                      <span>Express Delivery</span>
                      <span>{{ cartService.deliveryFee() === 0 ? 'FREE' : '₹' + cartService.deliveryFee() }}</span>
                    </div>
                    <div class="row total-line">
                      <span>Grand Total</span>
                      <span>₹{{ cartService.total() }}</span>
                    </div>
                  </div>

                  <button class="btn btn-primary place-order-btn" (click)="placeOrder()">
                    <app-icon name="check-circle" size="18" color="#FFFFFF"></app-icon>
                    <span>Place Order (₹{{ cartService.total() }})</span>
                  </button>

                  <div class="security-note">
                    <app-icon name="shield" size="14" color="#10B981"></app-icon>
                    <span>256-Bit Encrypted Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .checkout-page {
      background: #F8FBFE;
      padding-bottom: 80px;
    }

    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .page-hero {
      background: linear-gradient(135deg, #073B6F 0%, #1261A8 100%);
      color: #FFFFFF;
      padding: 50px 0;
      text-align: center;

      .hero-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        color: #FFFFFF;
        font-size: 0.8rem;
        font-weight: 700;
        padding: 4px 14px;
        border-radius: 999px;
        margin-bottom: 10px;
        text-transform: uppercase;
      }

      h1 {
        font-size: 2.4rem;
        color: #FFFFFF;
        font-weight: 900;
        margin-bottom: 8px;
      }

      p {
        font-size: 0.95rem;
        color: #E2E8F0;
      }
    }

    .checkout-section {
      margin-top: -30px;
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 24px;
    }

    .card-box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 20px;
      padding: 28px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
      margin-bottom: 24px;

      h3 {
        font-size: 1.2rem;
        color: #073B6F;
        font-weight: 800;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid #F1F5F9;
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      .full { grid-column: span 2; }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;

        label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
        }

        input {
          padding: 11px 14px;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          font-size: 0.92rem;
          outline: none;
          background: #FFFFFF;

          &:focus {
            border-color: #1261A8;
          }
        }
      }
    }

    .payment-options {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .pay-option {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 16px;
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.2s;

        &.selected {
          border-color: #1261A8;
          background: #F0F7FF;
        }

        input {
          margin-top: 3px;
        }

        .pay-info {
          strong {
            display: block;
            font-size: 0.95rem;
            color: #073B6F;
            margin-bottom: 2px;
          }
          span {
            font-size: 0.8rem;
            color: #64748B;
          }
        }
      }
    }

    .summary-card {
      .items-mini-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
        max-height: 240px;
        overflow-y: auto;

        .mini-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 10px;
          border-bottom: 1px solid #F1F5F9;

          .mini-item-info {
            h5 {
              font-size: 0.88rem;
              color: #152536;
              margin-bottom: 2px;
            }
            span {
              font-size: 0.75rem;
              color: #64748B;
            }
          }

          .mini-item-total {
            font-size: 0.92rem;
            color: #073B6F;
          }
        }
      }

      .bill-breakdown {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;

        .row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #4A5568;

          &.discount {
            color: #10B981;
            font-weight: 600;
          }

          &.total-line {
            padding-top: 10px;
            border-top: 1.5px dashed #CBD5E1;
            font-size: 1.2rem;
            font-weight: 800;
            color: #073B6F;
          }
        }
      }

      .place-order-btn {
        width: 100%;
        padding: 14px;
        border-radius: 12px;
        background: #1261A8;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background 0.2s;

        &:hover {
          background: #073B6F;
        }
      }

      .security-note {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-size: 0.76rem;
        color: #64748B;
        margin-top: 14px;
      }
    }

    .order-success-card, .empty-cart-card {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 60px 24px;
      text-align: center;
      box-shadow: 0 16px 40px rgba(7, 59, 111, 0.08);
      max-width: 600px;
      margin: 0 auto;

      h2 {
        font-size: 1.8rem;
        color: #073B6F;
        font-weight: 800;
        margin: 16px 0 8px;
      }

      .order-id-badge {
        display: inline-block;
        background: #ECFDF5;
        color: #059669;
        font-weight: 800;
        font-size: 0.92rem;
        padding: 4px 14px;
        border-radius: 999px;
        margin-bottom: 16px;
      }

      .success-msg {
        font-size: 0.95rem;
        color: #4A5568;
        line-height: 1.6;
        margin-bottom: 28px;
      }

      .success-actions {
        display: flex;
        justify-content: center;
        gap: 14px;
        flex-wrap: wrap;

        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;

          &.btn-primary {
            background: #1261A8;
            color: #FFFFFF;
          }
          &.btn-secondary {
            background: #F1F5F9;
            color: #475569;
          }
        }
      }
    }

    @media (max-width: 900px) {
      .checkout-grid {
        grid-template-columns: 1fr !important;
      }
      .form-grid {
        grid-template-columns: 1fr !important;
        .full { grid-column: span 1 !important; }
      }
    }
  `]
})
export class CheckoutComponent {
  fullName = 'Ganesh Vegi';
  phone = '+91 98765 43210';
  address = 'Flat 402, Royal Palms, Rd 12';
  locality = 'Banjara Hills';
  pincode = '500034';
  paymentMethod = 'UPI';

  orderPlaced = false;
  placedOrderId = '';
  placedTotal = 0;

  constructor(
    public cartService: CartService,
    private toastService: ToastService,
    public authService: AuthService,
    private router: Router
  ) {}

  placeOrder() {
    this.placedTotal = this.cartService.total();
    this.placedOrderId = Math.floor(100000 + Math.random() * 900000).toString();
    this.orderPlaced = true;
    this.cartService.clearCart();
    this.toastService.success(
      'Order Confirmed!',
      `Order #SV-${this.placedOrderId} placed successfully for ₹${this.placedTotal}.`
    );
  }
}
