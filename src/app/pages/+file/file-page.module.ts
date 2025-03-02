import { SectionOverviewDialogComponent } from './section-overview-dialog/section-overview-dialog.component';
import { ChangeMetadataDialogComponent } from './change-metadata-dialog/change-metadata-dialog.component';
import { AddSectionDialogComponent } from './add-section-dialog/add-section-dialog.component';
import { HttpListSectionService } from 'src/app/core/services/http/httpListSection.service';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { ListSectionComponent } from './list-section/list-section.component';
import { AsyncPipe, CommonModule, NgFor, NgSwitch } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FilePageComponent } from './file-page.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { provideRouter } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { routes } from './file-page.routes';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    TopBarComponent,
    FilePageComponent,
    ListSectionComponent,
    AddSectionDialogComponent,
    ChangeMetadataDialogComponent,
    SectionOverviewDialogComponent,
  ],
  imports: [
    NgFor,
    NgSwitch,
    AsyncPipe,
    FormsModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    DragDropModule,
    TableModule,
    InputTextModule,
    ContextMenuModule,
    ToggleSwitchModule,
  ],
  providers: [
    provideRouter(routes),
    HttpListSectionService,
    HttpFileSectionService,
  ],
})
export class FilePageModule {}
