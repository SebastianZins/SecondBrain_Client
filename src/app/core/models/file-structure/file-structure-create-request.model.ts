import { EFileType } from '../../enum/file-type.enum';

export interface FileStructureCreateRequestModel {
  label: string;
  type: EFileType;
  parentFolder: string | null;
}
