import { FileStructureModel } from '../structure-item/file-structure.model';

export interface FileModel extends FileStructureModel {
  title: string;
  subtitle: string;
  tags: string[];
  category: string;
  fileClasses: string[];
  sectionsOrder: string[];
}
