import { FileSectionModel } from 'src/app/core/models/file-section/file-section/file-section.model';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sb-change-metadata-dialog',
  standalone: false,
  templateUrl: './change-metadata-dialog.component.html',
  styleUrl: './change-metadata-dialog.component.scss',
})
export class ChangeMetadataDialogComponent {
  @Input() sectionData?: FileSectionModel;
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor(
    private _fileSectionService: HttpFileSectionService,
    private _fileService: HttpFileService
  ) {}

  /**
   * Update the file section metadata
   *
   * @return {*}  {void}
   * @memberof ChangeMetadataDialogComponent
   */
  public updateData(): void {
    if (this.sectionData === undefined) {
      return;
    }
    this.sectionData.subtitle =
      this.sectionData.subtitle === '' ? undefined : this.sectionData.subtitle;
    this._fileSectionService
      .updateSection(this.sectionData!)
      .subscribe((ok) => {
        if (ok) {
          this._fileService.refreshFileData();
          this.onClose();
        }
      });
  }

  /**
   * close dialog
   *
   * @memberof ChangeMetadataDialogComponent
   */
  public onClose() {
    this.isVisibleChange.emit(false);
  }
}
