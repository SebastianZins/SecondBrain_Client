import { TopBarComponent } from './top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
  imports: [CommonModule],
})
export class TopBarModule {}
