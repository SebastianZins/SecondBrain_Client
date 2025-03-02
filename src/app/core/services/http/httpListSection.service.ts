import { ListSectionUpdateRequestModel } from '../../models/file-section/list-section/list-section-update-request.mode';
import { ListSectionModel } from '../../models/file-section/list-section/list-section.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpListSectionService {
  private url = AppConstants.END_POINT.LIST_SECTION;

  constructor(private http: HttpClient) {}

  /**
   * get section by section id
   * @param {string} sectionId
   * @returns {Observable<ListSectionModel | null> }
   */
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

  /**
   * get sections by file id
   * @param {string} fileId
   * @returns {Observable<ListSectionModel | null>}
   */
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

  /**
   * update list section data
   * @param {ListSectionUpdateRequestModel} data
   * @returns {Observable<boolean>}
   */
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
}
