import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
  loginEmail = 'ganesh@supervet.com';
  loginPassword = 'password123';
  regName = '';
  regEmail = '';
  regPhone = '';

  constructor(public authService: AuthService) {}

  onLogin(e: Event) {
    e.preventDefault();
    if (this.loginEmail) {
      this.authService.login(this.loginEmail, this.loginPassword);
    }
  }

  onRegister(e: Event) {
    e.preventDefault();
    if (this.regName && this.regEmail) {
      this.authService.register(this.regName, this.regEmail, this.regPhone);
    }
  }
}
