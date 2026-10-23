import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  private static readonly STORAGE_KEY = 'supervet_splash_shown';
  
  isVisible = false;
  isFadingOut = false;
  private fadeTimer?: any;
  private endTimer?: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Expose replay function globally for developer testing
    (window as any).replaySuperVetSplash = () => this.replay();

    // Check if force query param is present or if it has not been seen this session
    const urlParams = new URLSearchParams(window.location.search);
    const forceSplash = urlParams.has('splash');
    const hasSeen = sessionStorage.getItem(SplashScreenComponent.STORAGE_KEY);

    if (forceSplash || !hasSeen) {
      this.startSplash();
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.restoreScroll();
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isVisible) {
      this.dismiss();
    }
  }

  startSplash(): void {
    this.isVisible = true;
    this.isFadingOut = false;
    this.lockScroll();

    // Begin fade-out sequence after logo presentation (2.3s)
    this.fadeTimer = setTimeout(() => {
      this.isFadingOut = true;
      // Complete removal after transition finishes (2.8s)
      this.endTimer = setTimeout(() => {
        this.finish();
      }, 550);
    }, 2300);
  }

  dismiss(): void {
    if (!this.isVisible || this.isFadingOut) return;
    this.clearTimers();
    this.isFadingOut = true;
    this.endTimer = setTimeout(() => {
      this.finish();
    }, 400);
  }

  replay(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(SplashScreenComponent.STORAGE_KEY);
      this.clearTimers();
      this.startSplash();
    }
  }

  private finish(): void {
    this.isVisible = false;
    this.isFadingOut = false;
    this.restoreScroll();
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(SplashScreenComponent.STORAGE_KEY, 'true');
    }
  }

  private lockScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  private restoreScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  private clearTimers(): void {
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = undefined;
    }
    if (this.endTimer) {
      clearTimeout(this.endTimer);
      this.endTimer = undefined;
    }
  }
}
