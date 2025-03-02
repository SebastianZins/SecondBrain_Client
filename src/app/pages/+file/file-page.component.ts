import { FileDataModel } from 'src/app/core/models/file-structure/file/file-data.model';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-file-page',
  standalone: false,
  templateUrl: './file-page.component.html',
  styleUrl: './file-page.component.scss',
})
export class FilePageComponent implements OnInit {
  public filePath: string | null = null;
  public isAddDialogVisible: boolean = false;
  public addSectionOrderId: number = 0;

  public $fileData!: BehaviorSubject<FileDataModel | null>;

  constructor(
    private _route: ActivatedRoute,
    private _fileService: HttpFileService
  ) {
    this.$fileData = _fileService.$selectedFile;
  }

  ngOnInit(): void {
    this._route.url.subscribe((url) => {
      this.filePath = url.join('/');
    });
    this._fileService.selectFile('8b4fcdd6-b8ac-466f-972e-c21c33dce45a');
  }

  /**
   * show add section dialog
   */
  public addSection(i: number): void {
    this.isAddDialogVisible = true;
    this.addSectionOrderId = i;
  }
}
