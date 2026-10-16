import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-pet-store',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="store">
      <!-- HERO -->
      <section class="hero">
        <div class="wrap hero-inner">
          <div class="hero-copy">
            <span class="pill-badge">Vet-approved pet store</span>
            <h1>Good things for <em>good companions.</em></h1>
            <p>Prescription diets, joint care, flea and tick protection and everyday essentials,
               chosen by our doctors and delivered across Hyderabad.</p>
            <div class="hero-cta">
              <button class="btn-coral" (click)="scrollToCatalog()">Shop all products</button>
              <button class="btn-ghost" (click)="selectCategory('All'); selectPetType('Dog'); scrollToCatalog()">Shop for dogs</button>
            </div>
          </div>

          <div class="hero-stats">
            <div><strong>100%</strong><span>Genuine, sealed products</span></div>
            <div><strong>24 hrs</strong><span>Delivery in Hyderabad</span></div>
            <div><strong>Vet</strong><span>Chat support on every order</span></div>
          </div>
        </div>
      </section>

      <!-- TRUST BAR -->
      <section class="trust">
        <div class="wrap trust-row">
          <div class="trust-item"><app-icon name="shield" size="20" color="#0F3D33"></app-icon><span>Authentic brands only</span></div>
          <div class="trust-item"><app-icon name="truck" size="20" color="#0F3D33"></app-icon><span>Free delivery over ₹999</span></div>
          <div class="trust-item"><app-icon name="heart" size="20" color="#0F3D33"></app-icon><span>Doctor-recommended picks</span></div>
          <div class="trust-item"><app-icon name="refresh-cw" size="20" color="#0F3D33"></app-icon><span>Easy returns on unopened items</span></div>
        </div>
      </section>

      <!-- CONTROLS -->
      <section class="controls" id="catalog">
        <div class="wrap">
          <div class="controls-row">
            <label class="search">
              <app-icon name="search" size="18" color="#5B6F68"></app-icon>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="applyFilters()"
                placeholder="Search food, supplements, tick treatments, toys"
                aria-label="Search products"
              />
              @if (searchQuery) {
                <button class="clear" (click)="searchQuery = ''; applyFilters()" aria-label="Clear search">✕</button>
              }
            </label>

            <div class="pets" role="group" aria-label="Pet type">
              @for (pet of petTypes; track pet.value) {
                <button class="pet" [class.active]="selectedPetType === pet.value" (click)="selectPetType(pet.value)">
                  <span class="emoji">{{ pet.emoji }}</span>{{ pet.label }}
                </button>
              }
            </div>

            <select class="sort" [(ngModel)]="sortBy" (ngModelChange)="applyFilters()" aria-label="Sort products">
              <option value="featured">Featured first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>

          <div class="cats" role="group" aria-label="Category">
            @for (cat of productService.categories(); track cat) {
              <button class="cat" [class.active]="selectedCategory === cat" (click)="selectCategory(cat)">{{ cat }}</button>
            }
          </div>
        </div>
      </section>

      <!-- CATALOG -->
      <section class="catalog">
        <div class="wrap">
          <div class="results">
            <p>Showing <strong>{{ filteredProducts.length }}</strong> genuine veterinary products</p>
            <span class="ship-tag">Free delivery on orders over ₹999 across Hyderabad</span>
          </div>

          @if (filteredProducts.length === 0) {
            <div class="empty">
              <app-icon name="shopping-bag" size="44" color="#8AA39A"></app-icon>
              <h3>Nothing matches that search</h3>
              <p>Clear a filter or search for a different product to see more.</p>
              <button class="btn-coral" (click)="resetFilters()">Reset filters</button>
            </div>
          } @else {
            <div class="grid">
              @for (prod of filteredProducts; track prod.id) {
                <article class="card">
                  <div class="media" (click)="openQuickView(prod)">
                    <div class="tags">
                      @if (prod.isBestSeller) { <span class="tag best">Best seller</span> }
                      @if (discount(prod) > 0) { <span class="tag off">{{ discount(prod) }}% off</span> }
                    </div>
                    <button
                      class="wish"
                      [class.on]="isWished(prod)"
                      (click)="toggleWish(prod, $event)"
                      [attr.aria-label]="isWished(prod) ? 'Remove from wishlist' : 'Save to wishlist'"
                    >
                      <app-icon name="heart" size="16" [color]="isWished(prod) ? '#E8643C' : '#5B6F68'"></app-icon>
                    </button>
                    <div class="art"><app-icon name="package" size="56" color="#0F3D33"></app-icon></div>
                    <span class="peek">Quick view</span>
                  </div>

                  <div class="body">
                    <div class="meta">
                      <span class="brand">{{ prod.brand }}</span>
                      <span class="rating">★ {{ prod.rating }} <small>({{ prod.reviewCount }})</small></span>
                    </div>
                    <h3 (click)="openQuickView(prod)">{{ prod.name }}</h3>
                    <p class="desc">{{ prod.shortDescription }}</p>
                    <span class="cat-name">{{ prod.category }}</span>

                    <div class="buy">
                      <div class="price">
                        <strong>₹{{ prod.price }}</strong>
                        @if (prod.originalPrice) { <s>₹{{ prod.originalPrice }}</s> }
                      </div>
                      <button class="add" (click)="cartService.addToCart(prod)">
                        <app-icon name="shopping-bag" size="15" color="#FFFFFF"></app-icon>Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              }
            </div>
          }
        </div>
      </section>

      <!-- VET HELP BANNER -->
      <section class="wrap">
        <div class="vet-banner">
          <div>
            <h2>Not sure what your pet needs?</h2>
            <p>Our veterinarians can recommend the right diet or supplement for your pet's age, breed and health.</p>
          </div>
          <a class="btn-coral" href="/contact">Ask a vet</a>
        </div>
      </section>

      <!-- QUICK VIEW -->
      @if (quickViewProduct) {
        <div class="backdrop" (click)="closeQuickView()"></div>
        <div class="modal" role="dialog" aria-modal="true" [attr.aria-label]="quickViewProduct.name">
          <button class="close" (click)="closeQuickView()" aria-label="Close">
            <app-icon name="x" size="18" color="#0F3D33"></app-icon>
          </button>

          <div class="modal-grid">
            <div class="modal-art">
              <div class="big"><app-icon name="package" size="84" color="#0F3D33"></app-icon></div>
              <span class="sku">SKU: {{ quickViewProduct.sku }}</span>
            </div>

            <div class="modal-info">
              <span class="brand">{{ quickViewProduct.brand }}</span>
              <h2>{{ quickViewProduct.name }}</h2>
              <p class="rating">★ {{ quickViewProduct.rating }} <small>({{ quickViewProduct.reviewCount }} verified pet parent ratings)</small></p>

              <div class="modal-price">
                <strong>₹{{ quickViewProduct.price }}</strong>
                @if (quickViewProduct.originalPrice) { <s>₹{{ quickViewProduct.originalPrice }}</s> }
                @if (discount(quickViewProduct) > 0) { <span class="tag off">{{ discount(quickViewProduct) }}% off</span> }
              </div>
              <p class="stock">✓ In stock and ready to ship</p>

              <p class="modal-desc">{{ quickViewProduct.description }}</p>

              <button class="btn-coral full" (click)="cartService.addToCart(quickViewProduct); closeQuickView()">
                <app-icon name="shopping-bag" size="18" color="#FFFFFF"></app-icon>
                Add to cart · ₹{{ quickViewProduct.price }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      --green-900: #0A2E26;
      --green-800: #0F3D33;
      --green-700: #17503F;
      --mint-100: #E8F4EE;
      --mint-50: #F3FAF6;
      --coral: #E8643C;
      --coral-dark: #CF512B;
      --ink: #16302A;
      --muted: #5B6F68;
      --line: #DCE9E2;
      --serif: 'Fraunces', 'Playfair Display', Georgia, serif;
      display: block;
    }

    .store { background: var(--mint-50); color: var(--ink); padding-bottom: 80px; }
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    button { font-family: inherit; }
    :is(button, a, input, select):focus-visible { outline: 2px solid var(--coral); outline-offset: 2px; }

    .btn-coral {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      background: var(--coral); color: #fff; border: none; border-radius: 999px;
      padding: 13px 26px; font-weight: 700; font-size: .92rem; cursor: pointer;
      text-decoration: none; transition: background .2s;
    }
    .btn-coral:hover { background: var(--coral-dark); }
    .btn-coral.full { width: 100%; padding: 16px; font-size: 1rem; }
    .btn-ghost {
      background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.4);
      border-radius: 999px; padding: 12px 24px; font-weight: 600; font-size: .92rem; cursor: pointer;
      transition: background .2s;
    }
    .btn-ghost:hover { background: rgba(255,255,255,.12); }

    /* HERO */
    .hero { background: var(--green-800); color: #fff; padding: 72px 0 64px; }
    .hero-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: end; }
    .pill-badge {
      display: inline-block; background: rgba(255,255,255,.12); font-size: .82rem; font-weight: 600;
      padding: 6px 16px; border-radius: 999px; margin-bottom: 20px;
    }
    .hero h1 { font-family: var(--serif); font-size: clamp(2.2rem, 4.6vw, 3.7rem); line-height: 1.05; font-weight: 600; margin: 0 0 18px; color: #fff; }
    .hero h1 em { font-weight: 400; color: #BFE3D1; }
    .hero p { color: #CFE3DA; font-size: 1.05rem; line-height: 1.65; max-width: 560px; margin: 0 0 28px; }
    .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-stats { display: grid; gap: 14px; }
    .hero-stats div {
      display: flex; align-items: baseline; gap: 16px; padding: 16px 22px;
      background: rgba(255,255,255,.07); border-radius: 18px;
    }
    .hero-stats strong { font-family: var(--serif); font-size: 1.9rem; font-weight: 600; min-width: 90px; }
    .hero-stats span { color: #CFE3DA; font-size: .9rem; }

    /* TRUST */
    .trust { background: #fff; border-bottom: 1px solid var(--line); }
    .trust-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding-top: 18px; padding-bottom: 18px; }
    .trust-item { display: flex; align-items: center; gap: 10px; font-size: .86rem; font-weight: 600; color: var(--green-800); }

    /* CONTROLS */
    .controls { background: #fff; border-bottom: 1px solid var(--line); padding: 24px 0 20px; position: sticky; top: 0; z-index: 20; }
    .controls-row { display: grid; grid-template-columns: 1fr auto auto; gap: 14px; align-items: center; margin-bottom: 16px; }
    .search {
      display: flex; align-items: center; gap: 12px; height: 48px; padding: 0 18px;
      background: var(--mint-50); border: 1.5px solid var(--line); border-radius: 999px;
    }
    .search:focus-within { border-color: var(--green-800); }
    .search input { flex: 1; border: none; background: none; outline: none; font-size: .92rem; color: var(--ink); }
    .search .clear { border: none; background: none; color: var(--muted); cursor: pointer; }
    .pets { display: flex; gap: 8px; }
    .pet {
      display: inline-flex; align-items: center; gap: 6px; background: var(--mint-50);
      border: 1.5px solid var(--line); border-radius: 999px; padding: 10px 16px;
      font-size: .84rem; font-weight: 600; color: var(--muted); cursor: pointer; transition: all .2s;
    }
    .pet:hover { border-color: var(--green-800); color: var(--green-800); }
    .pet.active { background: var(--green-800); border-color: var(--green-800); color: #fff; }
    .sort {
      height: 48px; padding: 0 16px; border: 1.5px solid var(--line); border-radius: 999px;
      background: #fff; font-size: .88rem; color: var(--ink);
    }
    .cats { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: thin; }
    .cat {
      white-space: nowrap; background: transparent; border: 1px solid var(--line); color: var(--muted);
      font-size: .84rem; font-weight: 600; padding: 7px 18px; border-radius: 999px; cursor: pointer; transition: all .2s;
    }
    .cat:hover { border-color: var(--green-800); color: var(--green-800); }
    .cat.active { background: var(--mint-100); border-color: var(--green-800); color: var(--green-800); }

    /* CATALOG */
    .catalog { padding: 36px 0 24px; }
    .results { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .results p { margin: 0; color: var(--muted); font-size: .9rem; }
    .ship-tag { background: var(--mint-100); color: var(--green-700); font-weight: 600; font-size: .82rem; padding: 6px 14px; border-radius: 999px; }

    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
    .card {
      background: #fff; border: 1px solid var(--line); border-radius: 24px; padding: 14px;
      display: flex; flex-direction: column; transition: border-color .2s, box-shadow .2s;
    }
    .card:hover { border-color: var(--green-800); box-shadow: 0 14px 34px rgba(15, 61, 51, .1); }

    .media {
      position: relative; height: 190px; border-radius: 18px; background: var(--mint-100);
      display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden;
    }
    .art { transition: transform .3s; }
    .media:hover .art { transform: scale(1.08); }
    .tags { position: absolute; top: 12px; left: 12px; display: flex; gap: 6px; flex-wrap: wrap; max-width: 70%; }
    .tag { font-size: .7rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; }
    .tag.best { background: var(--green-800); color: #fff; }
    .tag.off { background: var(--coral); color: #fff; }
    .wish {
      position: absolute; top: 10px; right: 10px; width: 34px; height: 34px; border-radius: 50%;
      border: none; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .wish.on { background: #FDEBE4; }
    .peek {
      position: absolute; bottom: 12px; left: 50%; transform: translate(-50%, 8px); opacity: 0;
      background: #fff; color: var(--green-800); font-size: .78rem; font-weight: 700;
      padding: 6px 14px; border-radius: 999px; transition: all .25s;
    }
    .media:hover .peek { opacity: 1; transform: translate(-50%, 0); }

    .body { display: flex; flex-direction: column; flex: 1; padding: 16px 8px 8px; }
    .meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .brand { font-size: .78rem; font-weight: 700; color: var(--green-700); }
    .rating { font-size: .8rem; font-weight: 700; color: #C77A12; margin: 0; }
    .rating small { color: #8AA39A; font-weight: 500; }
    .body h3 {
      font-family: var(--serif); font-size: 1.12rem; font-weight: 600; line-height: 1.3;
      color: var(--green-800); margin: 0 0 6px; cursor: pointer;
    }
    .body h3:hover { color: var(--coral); }
    .desc { font-size: .84rem; line-height: 1.55; color: var(--muted); margin: 0 0 10px; flex: 1; }
    .cat-name { font-size: .76rem; color: #8AA39A; font-weight: 600; margin-bottom: 14px; }
    .buy { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-top: 14px; border-top: 1px solid var(--line); }
    .price strong { font-family: var(--serif); font-size: 1.35rem; font-weight: 600; color: var(--green-800); }
    .price s { color: #8AA39A; font-size: .84rem; margin-left: 6px; }
    .add {
      display: inline-flex; align-items: center; gap: 6px; background: var(--green-800); color: #fff;
      border: none; border-radius: 999px; padding: 10px 16px; font-size: .82rem; font-weight: 700; cursor: pointer; transition: background .2s;
    }
    .add:hover { background: var(--coral); }

    .empty { text-align: center; background: #fff; border: 1px dashed #B8D2C6; border-radius: 24px; padding: 64px 20px; }
    .empty h3 { font-family: var(--serif); font-size: 1.5rem; color: var(--green-800); margin: 14px 0 6px; }
    .empty p { color: var(--muted); margin: 0 0 20px; }

    /* VET BANNER */
    .vet-banner {
      margin-top: 40px; background: var(--green-800); color: #fff; border-radius: 28px;
      padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
    }
    .vet-banner h2 { font-family: var(--serif); font-size: 1.9rem; font-weight: 600; margin: 0 0 8px; color: #fff; }
    .vet-banner p { color: #CFE3DA; margin: 0; max-width: 520px; line-height: 1.6; }

    /* MODAL */
    .backdrop { position: fixed; inset: 0; background: rgba(10, 46, 38, .6); backdrop-filter: blur(4px); z-index: 10000; }
    .modal {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 92%; max-width: 720px; max-height: 92vh; overflow-y: auto;
      background: #fff; border-radius: 28px; padding: 36px; z-index: 10001;
      box-shadow: 0 28px 70px rgba(10, 46, 38, .3);
    }
    .close {
      position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; border-radius: 50%;
      border: none; background: var(--mint-100); display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .modal-grid { display: grid; grid-template-columns: 230px 1fr; gap: 32px; }
    .modal-art { display: flex; flex-direction: column; align-items: center; }
    .big { width: 100%; aspect-ratio: 1; border-radius: 22px; background: var(--mint-100); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
    .sku { font-size: .76rem; color: #8AA39A; font-weight: 600; }
    .modal-info h2 { font-family: var(--serif); font-size: 1.7rem; font-weight: 600; line-height: 1.2; color: var(--green-800); margin: 4px 0 8px; }
    .modal-price { display: flex; align-items: center; gap: 12px; margin: 14px 0 4px; }
    .modal-price strong { font-family: var(--serif); font-size: 1.8rem; font-weight: 600; color: var(--green-800); }
    .modal-price s { color: #8AA39A; }
    .stock { color: #1E8E5A; font-weight: 700; font-size: .82rem; margin: 0 0 16px; }
    .modal-desc { font-size: .92rem; line-height: 1.65; color: var(--muted); margin: 0 0 24px; }

    @media (max-width: 1100px) {
      .grid { grid-template-columns: repeat(3, 1fr); }
      .hero-inner { grid-template-columns: 1fr; }
    }
    @media (max-width: 900px) {
      .controls-row { grid-template-columns: 1fr; }
      .controls { position: static; }
      .pets { overflow-x: auto; }
      .trust-row { grid-template-columns: 1fr 1fr; }
      .grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
      .trust-row { grid-template-columns: 1fr; }
      .modal-grid { grid-template-columns: 1fr; }
      .vet-banner { padding: 28px; }
      .hero { padding: 48px 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; }
    }
  `]
})
export class PetStoreComponent implements OnInit {
  selectedCategory = 'All';
  selectedPetType = 'All';
  searchQuery = '';
  sortBy = 'featured';

  filteredProducts: Product[] = [];
  quickViewProduct: Product | null = null;
  private wishlist = new Set<string | number>();

  readonly petTypes = [
    { value: 'All', label: 'All pets', emoji: '🐾' },
    { value: 'Dog', label: 'Dogs', emoji: '🐶' },
    { value: 'Cat', label: 'Cats', emoji: '🐱' },
    { value: 'Bird', label: 'Birds', emoji: '🦜' },
  ];

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.applyFilters();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeQuickView();
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  selectPetType(pet: string) {
    this.selectedPetType = pet;
    this.applyFilters();
  }

  resetFilters() {
    this.selectedCategory = 'All';
    this.selectedPetType = 'All';
    this.searchQuery = '';
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.productService.filterProducts(
      this.selectedCategory,
      this.selectedPetType,
      this.searchQuery,
      this.sortBy
    );
  }

  discount(p: Product): number {
    return p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0;
  }

  isWished(p: Product) {
    return this.wishlist.has(p.id);
  }

  toggleWish(p: Product, e: Event) {
    e.stopPropagation();
    this.wishlist.has(p.id) ? this.wishlist.delete(p.id) : this.wishlist.add(p.id);
  }

  openQuickView(product: Product) {
    this.quickViewProduct = product;
  }

  closeQuickView() {
    this.quickViewProduct = null;
  }

  scrollToCatalog() {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  }
}