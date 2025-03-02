import { FileCreateRequestModel } from '../../models/file-structure/file/file-create-request.model';
import { FileSectionModel } from '../../models/file-section/file-section/file-section.model';
import { ListSectionModel } from '../../models/file-section/list-section/list-section.model';
import { FileDataModel } from '../../models/file-structure/file/file-data.model';
import { FileModel } from '../../models/file-structure/file/file.model';
import { HttpFileStructureService } from './httpFileStructure.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpFileService {
  private url = AppConstants.END_POINT.FILE;

  public $selectedFile = new BehaviorSubject<FileDataModel | null>(null);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _fileStructureService: HttpFileStructureService
  ) {}

  /**
   * Get file data and metadata by id
   * @param {string} fileId
   * @returns {Observable<any | null>}
   */
  private getFileData(fileId: string): Observable<any | null> {
    var params = new HttpParams().set('fileId', fileId);
    return this._http.get(this.url.GET, { params, observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          return result.body;
        }
        return null;
      })
    );
  }

  /**
   * refresh data and metadata for selected file
   */
  public refreshFileData(): void {
    this.selectFile(this.$selectedFile.getValue()?.id ?? '');
  }

  /**
   * select a file by id and load its data
   * @param {string} id
   */
  public selectFile(id: string): void {
    this.getFileData(id).subscribe((file: FileDataModel) => {
      if (file) {
        var sections = [
          ...(file.checkListSections ?? []),
          ...(file.listSections?.map((ls: ListSectionModel) => {
            ls.items = ls.items = ls.items.map((i: any) => ({
              value: i,
            }));
            return ls;
          }) ?? []),
          ...(file.tableSections ?? []),
          ...(file.overviewSections ?? []),
          ...(file.textSections ?? []),
          ...(file.markdownSections ?? []),
        ];
        file.sections = [];
        file.sectionsOrder.forEach((s1) => {
          var section = sections.find((s2: FileSectionModel) => s1 === s2.id);
          if (section) {
            file.sections.push(section);
          }
        });
        this.$selectedFile.next(file);
        this._router.navigate([AppConstants.ROUTES.FILE]);
      }
    });
  }

  /**
   * create a file
   * @param {FileCreateRequestModel} data
   * @returns {Observable<FileModel | null>}
   */
  public createFile(
    data: FileCreateRequestModel
  ): Observable<FileModel | null> {
    return this._http.put(this.url.CREATE, data, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          this._fileStructureService.getFileStructure().subscribe(() => {});
          this.$selectedFile.next({
            ...this.$selectedFile.value!,
            ...(result.body as FileModel),
          });
          this._router.navigate([AppConstants.ROUTES.FILE]);
          return result.body as FileModel;
        }
        return null;
      })
    );
  }

  /**
   * update the file metadata
   * @param {FileModel} data
   * @returns {Observable<boolean>}
   */
  public updateFile(data: FileModel): Observable<boolean> {
    return this._http
      .patch(this.url.UPDATE, data, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as boolean;
          }
          return false;
        })
      );
  }

  /**
   * update section order of file
   * @param {string[]} order
   * @returns {Observable<boolean>}
   */
  public updateOrderFile(order: string[]): Observable<boolean> {
    return this._http
      .patch(this.url.UPDATE_ORDER, order, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as boolean;
          }
          return false;
        })
      );
  }

  /**
   * Delete file and all containing sections, data and attachments
   * @param {string} fileId
   * @returns {Observable<boolean>}
   */
  public deleteFile(fileId: string): Observable<boolean> {
    var params = new HttpParams().set('fileId', fileId);
    return this._http
      .delete(this.url.UPDATE, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$selectedFile.next({
              ...this.$selectedFile.value!,
              ...(result.body as FileModel),
            });
            return true;
          }
          return false;
        })
      );
  }
}
