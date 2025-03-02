import { EFileType } from 'src/app/core/enum/file-type.enum';

export interface FileStructureUpdateRequestModel {
  id: string;
  label: string;
  type: EFileType;
}
