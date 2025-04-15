import { ChecklistSectionUpdateRequestModel } from '../../models/file-section/checklist-section/checklist-section-update-request.mode';
import { ChecklistSectionModel } from '../../models/file-section/checklist-section/checklist-section.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/app.constants';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpChecklistSectionService {
  private url = AppConstants.END_POINT.CHECKLIST_SECTION;

  constructor(private http: HttpClient) {}

  /**
   * get section by section id
   * @param {string} sectionId
   * @returns {Observable<ChecklistSectionModel | null> }
   */
  public getSectionById(
    sectionId: string
  ): Observable<ChecklistSectionModel | null> {
    var params = new HttpParams().set('sectionId', sectionId);
    return this.http
      .get(this.url.GET_BY_ID, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as ChecklistSectionModel;
          }
          return null;
        })
      );
  }

  /**
   * get sections by file id
   * @param {string} fileId
   * @returns {Observable<ChecklistSectionModel | null>}
   */
  public getSectionByFileId(
    fileId: string
  ): Observable<ChecklistSectionModel | null> {
    var params = new HttpParams().set('fileId', fileId);
    return this.http
      .get(this.url.GET_BY_FILE, { params, observe: 'response' })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            return result.body as ChecklistSectionModel;
          }
          return null;
        })
      );
  }

  /**
   * update list section data
   * @param {ChecklistSectionUpdateRequestModel} data
   * @returns {Observable<boolean>}
   */
  public updateSection(
    data: ChecklistSectionUpdateRequestModel
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
