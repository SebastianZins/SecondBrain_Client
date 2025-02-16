import { ESectionType } from 'src/app/core/enum/section-type.enum';

export interface FileSectionUpdateRequest {
  id: string;
  title: string;
  subtitle: string;
  isExpanded: boolean;
  isVisible: boolean;
  sectionType: ESectionType;
}
