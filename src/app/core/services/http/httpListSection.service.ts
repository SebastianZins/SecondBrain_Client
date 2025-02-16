import { FileSectionCreateRequestModel } from '../../models/file-section/file-section/file-section-create-request.model';
import { ListSectionUpdateRequestModel } from '../../models/file-section/list-section/list-section-update-request.mode';
import { FileStructureModel } from '../../models/file-structure/structure-item/file-structure.model';
import { ListSectionModel } from '../../models/file-section/list-section/list-section.model';
import { HttpFileStructureService } from './httpFileStructure.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpListSectionService {
  private url = AppConstants.END_POINT.LIST_SECTION;

  constructor(
    private http: HttpClient,
    private fileStructureService: HttpFileStructureService
  ) {}

  public getSectionById(
    sectionId: string
  ): Observable<ListSectionModel | null> {
    var params = new HttpParams().set('sectionId', sectionId);
    return this.http
      .get(this.url.GET_BY_ID, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as ListSectionModel;
          }
          return null;
        })
      );
  }

  public getSectionByFileId(
    fileId: string
  ): Observable<ListSectionModel | null> {
    var params = new HttpParams().set('fileId', fileId);
    return this.http
      .get(this.url.GET_BY_FILE, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as ListSectionModel;
          }
          return null;
        })
      );
  }

  public createSection(
    data: FileSectionCreateRequestModel
  ): Observable<boolean> {
    return this.http.patch(this.url.UPDATE, data, { observe: 'response' }).pipe(
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

  public updateSection(
    data: ListSectionUpdateRequestModel
  ): Observable<boolean> {
    return this.http.patch(this.url.UPDATE, data, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          return result.body as boolean;
        }
        return false;
      })
    );
  }

  public deleteSection(sectionId: string): Observable<boolean> {
    var params = new HttpParams().set('sectionId', sectionId);
    return this.http
      .delete(this.url.UPDATE, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as boolean;
          }
          return false;
        })
      );
  }
}
