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

  public fetchFileStructure(): void {
    this.getFileStructure().subscribe(() => {});
  }

  public getFileStructure(): Observable<FileStructureModel[]> {
    return this.http.get(this.url.GET_STRUCTURE, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          console.log(result.body);
          this.$fileStructure.next(
            this.castToModel(result.body as FileStructureModel[])
          );
          return result.body as FileStructureModel[];
        }
        return [];
      })
    );
  }

  public createFolder(
    body: FileStructureCreateRequestModel
  ): Observable<FileStructureModel[]> {
    return this.http
      .put(this.url.CREATE_FOLDER, body, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(
              this.castToModel(result.body as FileStructureModel[])
            );
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }

  public updateFolder(
    body: FileStructureUpdateRequestModel
  ): Observable<FileStructureModel[]> {
    return this.http
      .patch(this.url.UPDATE_FOLDER, body, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(
              this.castToModel(result.body as FileStructureModel[])
            );
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }

  public deleteFolder(id: string): Observable<FileStructureModel[]> {
    const params = new HttpParams().set('id', id);
    return this.http
      .delete(this.url.DELETE_FOLDER, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(
              this.castToModel(result.body as FileStructureModel[])
            );
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }

  public moveFolder(
    data: FileStructureMoveRequestModel
  ): Observable<FileStructureModel[]> {
    return this.http
      .post(this.url.MOVE_FOLDER, data, { observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.$fileStructure.next(
              this.castToModel(result.body as FileStructureModel[])
            );
            return result.body as FileStructureModel[];
          }
          return [];
        })
      );
  }

  private castToModel(data: FileStructureModel[]): FileStructureModel[] {
    return data.map((d) => ({
      ...d,
      isEditing: false,
    }));
  }
}
