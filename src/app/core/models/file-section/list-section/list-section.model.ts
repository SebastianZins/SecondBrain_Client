import { FileSectionModel } from '../file-section/file-section.model';

export interface ListSectionModel extends FileSectionModel {
  items: { value: string; isSelected?: boolean }[];
}
