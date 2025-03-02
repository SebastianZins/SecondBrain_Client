import { FileStructureCreateRequestModel } from '../../models/file-structure/structure-item/file-structure-create-request.model';
import { FileStructureUpdateRequestModel } from '../../models/file-structure/structure-item/file-structure-update-request.model';
import { FileStructureMoveRequestModel } from '../../models/file-structure/structure-item/file-structure-move-request.model';
import { FileStructureModel } from '../../models/file-structure/structure-item/file-structure.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpFileStructureService {
  private url = AppConstants.END_POINT.FILE_STRUCTURE;

  public $fileStructure = new BehaviorSubject<FileStructureModel[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Get and load complete file structure
   */
  public fetchFileStructure(): void {
    this.getFileStructure().subscribe(() => {});
  }

  /**
   * Get complete file structure as observable
   * @returns {Observable<FileStructureModel[]>}
   */
  public getFileStructure(): Observable<FileStructureModel[]> {
    return this.http.get(this.url.GET_STRUCTURE, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          this.$fileStructure.next(result.body as FileStructureModel[]);
          return result.body as FileStructureModel[];
        }
        return [];
      })
    );
  }

  /**
   * create a new folder in the file structure
   * @param {FileStructureCreateRequestModel} body
   * @returns {Observable<FileStructureModel[]>}
   */
  public createFolder(
    body: FileStructureCreateRequestModel
  ): Observable<FileStructureModel[]> {
    return this.http
      .put(this.url.CREATE_FOLDER, body, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(result.body as FileStructureModel[]);
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }

  /**
   * update folder name
   * @param {FileStructureUpdateRequestModel} body
   * @returns {Observable<FileStructureModel[]>}
   */
  public updateFolder(
    body: FileStructureUpdateRequestModel
  ): Observable<FileStructureModel[]> {
    return this.http
      .patch(this.url.UPDATE_FOLDER, body, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(result.body as FileStructureModel[]);
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }

  /**
   * delete folder
   */
  public deleteFolder(id: string): Observable<FileStructureModel[]> {
    const params = new HttpParams().set('id', id);
    return this.http
      .delete(this.url.DELETE_FOLDER, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(result.body as FileStructureModel[]);
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }

  /**
   * move folder -> change order in same folder or move to other folder
   * @param {FileStructureMoveRequestModel} data
   * @returns {Observable<FileStructureModel[]>}
   */
  public moveFolder(
    data: FileStructureMoveRequestModel
  ): Observable<FileStructureModel[]> {
    return this.http
      .post(this.url.MOVE_FOLDER, data, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(result.body as FileStructureModel[]);
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }
}
