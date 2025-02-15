export interface FileStructureMoveRequestModel {
  id: string;
  parentId: string | null;
  oldTreeId: number;
  newTreeId: number;
}
