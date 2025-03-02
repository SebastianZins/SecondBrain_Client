import { EFileType } from '../../../enum/file-type.enum';

export interface FileStructureModel {
  id: string;
  label: string;
  type: EFileType;
  treeId: number;
  children?: FileStructureModel[] | null;
}
