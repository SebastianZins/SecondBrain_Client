import { StyledTextComponent } from './styled-text.component';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [StyledTextComponent],
  exports: [StyledTextComponent],
  imports: [CommonModule, TooltipModule],
})
export class StyledTextModule {}
