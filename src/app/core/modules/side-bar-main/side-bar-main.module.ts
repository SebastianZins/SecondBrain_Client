import { SideBarMainComponent } from './side-bar-main/side-bar-main.component';
import { TreeDragDropService, ConfirmationService } from 'primeng/api';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenu } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SideBarMainComponent],
  exports: [SideBarMainComponent],
  imports: [
    ButtonModule,
    TreeModule,
    AsyncPipe,
    NgIf,
    ContextMenu,
    InputTextModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ConfirmDialog,
  ],
  providers: [TreeDragDropService, ConfirmationService],
})
export class SideBarMainModule {}
