import { FileSectionUpdateRequest } from '../../models/file-section/file-section/file-section-update-request.model';
import { FileSectionModel } from '../../models/file-section/file-section/file-section.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpFileSectionService {
  private url = AppConstants.END_POINT.FILE_SECTION;

  constructor(private http: HttpClient) {}

  public getSectionById(
    sectionId: string
  ): Observable<FileSectionModel | null> {
    var params = new HttpParams().set('sectionId', sectionId);
    return this.http
      .get(this.url.GET_BY_ID, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as FileSectionModel;
          }
          return null;
        })
      );
  }

  public getSectionByFileId(
    fileId: string
  ): Observable<FileSectionModel | null> {
    var params = new HttpParams().set('fileId', fileId);
    return this.http
      .get(this.url.GET_BY_FILE, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as FileSectionModel;
          }
          return null;
        })
      );
  }

  public updateSection(data: FileSectionUpdateRequest): Observable<boolean> {
    return this.http.patch(this.url.UPDATE, data, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          return result.body as boolean;
        }
        return false;
      })
    );
  }
}
