import { ListSectionModel } from '../../file-section/list-section/list-section.model';
import { FileModel } from './file.model';

export interface FileDataModel extends FileModel {
  textSections?: any[];
  markdownSections?: any[];
  listSections?: ListSectionModel[];
  checkListSections?: any[];
  tableSections?: any[];
  overviewSections?: any[];
  sections: ListSectionModel[] | any[];
}
