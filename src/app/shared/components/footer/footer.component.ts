import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  emailInput = '';

  constructor(private toastService: ToastService) {}

  onSubscribe(e: Event) {
    e.preventDefault();
    const email = this.emailInput.trim();
    if (email) {
      this.toastService.success(
        'Subscribed to SuperVet updates',
        `Thank you! Pet wellness tips and alerts will be sent to ${email}.`
      );
      this.emailInput = '';
    }
  }
}