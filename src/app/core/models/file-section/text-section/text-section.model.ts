import { FileSectionModel } from '../file-section/file-section.model';

export interface TextSectionModel extends FileSectionModel {
  text: string;
}
