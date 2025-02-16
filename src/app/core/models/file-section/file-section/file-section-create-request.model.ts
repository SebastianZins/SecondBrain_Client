import { ESectionType } from 'src/app/core/enum/section-type.enum';

export interface FileSectionCreateRequestModel {
  structureId: string;
  title: string;
  subtitle: string;
  isExpanded: boolean;
  isVisible: boolean;
  sectionType: ESectionType;
}
