import { ESectionType } from 'src/app/core/enum/section-type.enum';

export interface FileSectionModel {
  id: string;
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  isVisible: boolean;
  sectionType: ESectionType;
}
