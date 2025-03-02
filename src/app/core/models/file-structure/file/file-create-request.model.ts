import { FileStructureCreateRequestModel } from '../structure-item/file-structure-create-request.model';

export interface FileCreateRequestModel
  extends FileStructureCreateRequestModel {
  title: string;
  subtitle: string;
  tags: string[];
  category: 0;
  fileClasses: string[];
}
