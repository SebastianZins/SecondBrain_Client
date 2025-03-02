import { ESectionType } from 'src/app/core/enum/section-type.enum';

export interface FileSectionCreateRequestModel {
  sectionOrderId: number;
  structureId: string;
  title: string;
  subtitle?: string;
  sectionType: ESectionType;
}
