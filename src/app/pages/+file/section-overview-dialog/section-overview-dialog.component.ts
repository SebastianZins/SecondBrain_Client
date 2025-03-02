import { FileSectionModel } from 'src/app/core/models/file-section/file-section/file-section.model';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'sb-section-overview-dialog',
  standalone: false,
  templateUrl: './section-overview-dialog.component.html',
  styleUrl: './section-overview-dialog.component.scss',
})
export class SectionOverviewDialogComponent {
  @Input() sectionData!: FileSectionModel[];
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  public elementsDraged: boolean = false;

  constructor(
    private _fileSectionService: HttpFileSectionService,
    private _fileService: HttpFileService
  ) {}

  /**
   * update section meta data
   */
  public updateData(): void {
    if (this.sectionData === undefined) {
      return;
    }
    var tasks: Observable<any>[] = [];
    this.sectionData.forEach((element) => {
      tasks.push(this._fileSectionService.updateSection(element));
    });

    if (this.elementsDraged) {
      var sectionsOrder = this._fileService.$selectedFile.value!.sectionsOrder;
      sectionsOrder = this.sectionData.map((s) => s.id);
      tasks.push(this._fileService.updateOrderFile(sectionsOrder));
    }
    forkJoin(tasks).subscribe((_) => {
      this.onClose();
    });
  }

  /**
   * close dialog
   */
  public onClose() {
    this.isVisibleChange.emit(false);
  }

  /**
   *  delete selected section
   */
  public deleteSection(id: string): void {
    this._fileSectionService.deleteSection(id).subscribe((ok) => {
      if (ok) {
        this.sectionData = this.sectionData?.filter((s) => s.id !== id);
        this._fileService.refreshFileData();
      }
    });
  }
}
