import { FileStructureModel } from '../../models/file-structure/structure-item/file-structure.model';
import { FileCreateRequestModel } from '../../models/file-structure/file/file-create-request.model';
import { FileUpdateRequestModel } from '../../models/file-structure/file/file-update-request.model';
import { HttpFileStructureService } from './httpFileStructure.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpFileService {
  private url = AppConstants.END_POINT.FILE;

  constructor(
    private http: HttpClient,
    private fileStructureService: HttpFileStructureService
  ) {}

  public getFileById(fileId: string): Observable<FileStructureModel | null> {
    var params = new HttpParams().set('fileId', fileId);
    return this.http.get(this.url.GET, { params, observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          this.fileStructureService.getFileStructure().subscribe(() => {});
          return result.body as FileStructureModel;
        }
        return null;
      })
    );
  }

  public createFile(data: FileCreateRequestModel): Observable<boolean> {
    return this.http.put(this.url.CREATE, data, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          this.fileStructureService.$fileStructure.next(
            result.body as FileStructureModel[]
          );
          return true;
        }
        return false;
      })
    );
  }

  public updateFile(data: FileUpdateRequestModel): Observable<boolean> {
    return this.http.patch(this.url.UPDATE, data, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          return result.body as boolean;
        }
        return false;
      })
    );
  }

  public deleteFile(fileId: string): Observable<boolean> {
    var params = new HttpParams().set('fileId', fileId);
    return this.http
      .delete(this.url.UPDATE, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.fileStructureService.$fileStructure.next(
              result.body as FileStructureModel[]
            );
            return true;
          }
          return false;
        })
      );
  }
}
