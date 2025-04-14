import { ChecklistSectionItemModel } from './checklist-section-item.model';

export interface ChecklistSectionUpdateRequestModel {
  id: string;
  items: ChecklistSectionItemModel[];
  tags: string[];
}
