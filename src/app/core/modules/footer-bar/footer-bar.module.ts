import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { FooterBarComponent } from './footer-bar.component';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FooterBarComponent],
  imports: [CommonModule, ButtonModule, NgIf, AsyncPipe],
  exports: [FooterBarComponent],
})
export class FooterBarModule {}
