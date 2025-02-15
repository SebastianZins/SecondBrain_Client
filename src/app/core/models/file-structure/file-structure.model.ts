import { EFileType } from '../../enum/file-type.enum';

export interface FileStructureModel {
  id: string;
  label: string;
  type: EFileType;
  treeId: number;
  icon?: string;
  fileClass?: string | null;
  showBtn: boolean;
  children?: FileStructureModel[] | null;
  isEditing: boolean;
}
