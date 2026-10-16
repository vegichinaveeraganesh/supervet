import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-emergency-strip',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './emergency-strip.component.html',
  styleUrl: './emergency-strip.component.scss'
})
export class EmergencyStripComponent {}
