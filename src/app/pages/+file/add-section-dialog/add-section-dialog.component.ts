import { FileSectionCreateRequestModel } from 'src/app/core/models/file-section/file-section/file-section-create-request.model';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ESectionType } from 'src/app/core/enum/section-type.enum';

@Component({
  selector: 'sb-add-section-dialog',
  standalone: false,
  templateUrl: './add-section-dialog.component.html',
  styleUrl: './add-section-dialog.component.scss',
})
export class AddSectionDialogComponent {
  @Input() isVisible: boolean = false;
  @Input() sectionOrderId: number = 0;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() sectionOrderIdChange = new EventEmitter<number>();

  public sectionTypes: { id: ESectionType; label: string }[] = [
    { id: ESectionType.TEXT, label: 'Text' },
    { id: ESectionType.MARKDOWN, label: 'Markdown' },
    { id: ESectionType.LIST, label: 'List' },
    { id: ESectionType.CHECK_LIST, label: 'Check List' },
    { id: ESectionType.TABLE, label: 'Table' },
    { id: ESectionType.OVERVIEW, label: 'Overview' },
  ];
  public selectedType: ESectionType = ESectionType.TEXT;

  public title?: string;
  public subtitle?: string;

  constructor(
    private _fileSectionService: HttpFileSectionService,
    private _fileService: HttpFileService
  ) {}

  /**
   * select a type of section
   *
   * @param {ESectionType} type
   * @memberof AddSectionDialogComponent
   */
  public selectType(type: ESectionType): void {
    this.selectedType = type;
  }

  /**
   * add a new section to the file
   * @memberof AddSectionDialogComponent
   */
  public addSection(): void {
    this._fileSectionService
      .createSection({
        sectionOrderId: this.sectionOrderId,
        structureId: this._fileService.$selectedFile.value!.id,
        title: this.title!,
        subtitle: this.subtitle === '' ? undefined : this.subtitle,
        sectionType: this.selectedType,
      } as FileSectionCreateRequestModel)
      .subscribe((ok) => {
        if (ok) {
          this._fileService.refreshFileData();
          this.onClose();
        }
      });
  }

  /**
   * close the dialog
   *
   * @memberof AddSectionDialogComponent
   */
  public onClose() {
    this.selectedType = ESectionType.TEXT;
    this.title = undefined;
    this.subtitle = undefined;
    this.isVisibleChange.emit(false);
    this.sectionOrderIdChange.emit(0);
  }
}
