import { ESectionType } from 'src/app/core/enum/section-type.enum';

export interface FileSectionModel {
  structureId: string;
  title: string;
  subtitle: string;
  isExpanded: string;
  isVisisble: string;
  sectionType: ESectionType;
}
