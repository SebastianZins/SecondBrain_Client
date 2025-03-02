import { FileSectionCreateRequestModel } from '../../models/file-section/file-section/file-section-create-request.model';
import { FileSectionModel } from '../../models/file-section/file-section/file-section.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/app.constants';
import { HttpFileService } from './httpFile.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpFileSectionService {
  private url = AppConstants.END_POINT.FILE_SECTION;

  constructor(
    private http: HttpClient,
    private _fileService: HttpFileService
  ) {}

  /**
   * Get section meta data by section id
   * @param {string} sectionId
   * @returns {Observable<FileSectionModel | null>}
   */
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

  /**
   * Get meta data of sections by file id
   * @param {string} fileId
   * @returns {Observable<FileSectionModel | null>}
   */
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

  /**
   * create a new section for a given file
   * @param {FileSectionCreateRequestModel} data
   * @returns {Observable<boolean>}
   */
  public createSection(
    data: FileSectionCreateRequestModel
  ): Observable<boolean> {
    return this.http.put(this.url.CREATE, data, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          this._fileService.refreshFileData();
          return true;
        }
        return false;
      })
    );
  }

  /**
   * Update section meta data
   * @param {FileSectionModel} data
   * @returns {Observable<boolean>}
   */
  public updateSection(data: FileSectionModel): Observable<boolean> {
    return this.http.patch(this.url.UPDATE, data, { observe: 'response' }).pipe(
      map((result) => {
        if (result.status === 200) {
          return result.body as boolean;
        }
        return false;
      })
    );
  }

  /**
   * Delete section data
   * @param {string} sectionId
   * @returns {Observable<boolean>}
   */
  public deleteSection(sectionId: string): Observable<boolean> {
    var params = new HttpParams().set('sectionId', sectionId);
    return this.http
      .delete(this.url.DELETE, { params, observe: 'response' })
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
