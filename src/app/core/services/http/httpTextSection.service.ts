import { TextSectionUpdateRequestModel } from '../../models/file-section/text-section/text-section-update-request.mode';
import { TextSectionModel } from '../../models/file-section/text-section/text-section.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpTextSectionService {
  private url = AppConstants.END_POINT.TEXT_SECTION;

  constructor(private http: HttpClient) {}

  /**
   * get text section by section id
   * @param {string} sectionId
   * @returns {Observable<TextSectionModel | null> }
   */
  public getSectionById(
    sectionId: string
  ): Observable<TextSectionModel | null> {
    var params = new HttpParams().set('sectionId', sectionId);
    return this.http
      .get(this.url.GET_BY_ID, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as TextSectionModel;
          }
          return null;
        })
      );
  }

  /**
   * get text sections by file id
   * @param {string} fileId
   * @returns {Observable<TextSectionModel | null>}
   */
  public getSectionByFileId(
    fileId: string
  ): Observable<TextSectionModel | null> {
    var params = new HttpParams().set('fileId', fileId);
    return this.http
      .get(this.url.GET_BY_FILE, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as TextSectionModel;
          }
          return null;
        })
      );
  }

  /**
   * update text section data
   * @param {TextSectionUpdateRequestModel} data
   * @returns {Observable<boolean>}
   */
  public updateSection(
    data: TextSectionUpdateRequestModel
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
