import { SectionOverviewDialogComponent } from './section-overview-dialog/section-overview-dialog.component';
import { ChangeMetadataDialogComponent } from './change-metadata-dialog/change-metadata-dialog.component';
import { HttpChecklistSectionService } from 'src/app/core/services/http/httpChecklistSection.service';
import { CheckChecklistSectionComponent } from './checklist-section/checklist-section.component';
import { AddSectionDialogComponent } from './add-section-dialog/add-section-dialog.component';
import { HttpListSectionService } from 'src/app/core/services/http/httpListSection.service';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { HttpTextSectionService } from 'src/app/core/services/http/httpTextSection.service';
import { StyledTextModule } from '../../core/modules/styled-text/styled-text.module';
import { ListSectionComponent } from './list-section/list-section.component';
import { TextSectionComponent } from './text-section/text-section.component';
import { AsyncPipe, CommonModule, NgFor, NgSwitch } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FilePageComponent } from './file-page.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { provideRouter } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
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
    TextSectionComponent,
    AddSectionDialogComponent,
    ChangeMetadataDialogComponent,
    SectionOverviewDialogComponent,
    CheckChecklistSectionComponent,
  ],
  imports: [
    NgFor,
    NgSwitch,
    AsyncPipe,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    TooltipModule,
    CheckboxModule,
    TextareaModule,
    DragDropModule,
    InputTextModule,
    StyledTextModule,
    ContextMenuModule,
    ToggleSwitchModule,
  ],
  providers: [
    provideRouter(routes),
    HttpListSectionService,
    HttpTextSectionService,
    HttpFileSectionService,
    HttpChecklistSectionService,
  ],
})
export class FilePageModule {}
