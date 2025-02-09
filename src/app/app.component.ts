import { PageLayoutComponent } from './core/components/page-layout/page-layout.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ButtonModule, PageLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SecondBrain.Client';

  constructor() {}
}
