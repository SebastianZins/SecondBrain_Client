import { FileStructureModel } from '../structure-item/file-structure.model';

export interface FileResponseModel extends FileStructureModel {
  title: string;
  subtitle: string;
  tags: string[];
  category: string;
  fileClasses: string[];
}
