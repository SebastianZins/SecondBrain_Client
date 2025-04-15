import { ChecklistSectionItemModel } from './checklist-section-item.model';
import { FileSectionModel } from '../file-section/file-section.model';

export interface ChecklistSectionModel extends FileSectionModel {
  items: ChecklistSectionItemModel[];
}
