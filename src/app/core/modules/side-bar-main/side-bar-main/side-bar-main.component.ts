import { Component, ViewChild } from '@angular/core';
import {
  MenuItemCommandEvent,
  ConfirmationService,
  MenuItem,
} from 'primeng/api';
import { FileStructureCreateRequestModel } from 'src/app/core/models/file-structure/file-structure-create-request.model';
import { FileStructureMoveRequestModel } from 'src/app/core/models/file-structure/file-structure-move-request.model';
import { SideBarStateService } from 'src/app/core/services/stateManagement/side-bar-state.service';
import { HttpFileStructureService } from 'src/app/core/services/http/httpFileStructure.service';
import { FileStructureModel } from 'src/app/core/models/file-structure/file-structure.model';
import { EFileType } from 'src/app/core/enum/file-type.enum';
import { TreeNodeDoubleClickEvent } from 'primeng/tree';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-side-bar-main',
  templateUrl: './side-bar-main.component.html',
  styleUrl: './side-bar-main.component.scss',
  standalone: false,
})
export class SideBarMainComponent {
  @ViewChild('treeComponentContext') treeComponentContext: any;

  public $fileStructure!: BehaviorSubject<FileStructureModel[]>;

  public treeNodeContextItems: MenuItem[] = [
    {
      label: 'New Folder',
      icon: 'fas fa-folder-plus',
      command: () => this.openNewFolderDialog(),
    },
    {
      label: 'Delete Folder',
      icon: 'fas fa-trash',
      command: (event) => this.deleteFolder(event),
    },
  ];

  public treeComponentContextItems: MenuItem[] = [
    {
      label: 'New Folder',
      icon: 'fas fa-folder-plus',
      command: () => {
        this.folderSelectedId = null;
        this.openNewFolderDialog();
      },
    },
  ];

  public newFolderName: string | null = '';
  public isNewFolderDialogVisible: boolean = false;
  public folderSelectedId: null | string = null;

  public selectedFolder: FileStructureModel | null = null;

  constructor(
    public sideBarState: SideBarStateService,
    private _confirmationService: ConfirmationService,
    private _fileStructService: HttpFileStructureService
  ) {
    this.$fileStructure = this._fileStructService.$fileStructure;
  }

  public newRootFolder(): void {
    this.folderSelectedId = null;
    this.newFolderName = null;
    this.openNewFolderDialog();
  }

  public test(a: any) {
    console.log(a);
  }

  public onTreeContextMenu(event: Event) {
    console.log('test');
    if (!(event.target as HTMLElement).closest('.p-treenode')) {
      event.preventDefault();
      this.treeComponentContext.show(event);
    }
  }

  public openNewFolderDialog(): void {
    this.newFolderName = null;
    this.isNewFolderDialogVisible = true;
  }

  public onNodeDoubleClick(event: TreeNodeDoubleClickEvent): void {
    event.originalEvent.stopPropagation();
    this.selectedFolder!.isEditing = true;
  }
  public onEditComplete(item: FileStructureModel): void {
    console.log(item.label);
  }

  public folderMoved(event: any): void {
    console.log(event);
    var body: FileStructureMoveRequestModel = {
      id: event.dragNode.id,
      parentId:
        event.dropNode.children.findIndex(
          (c: any) => c.id === event.dragNode.id
        ) !== -1
          ? event.dropNode.id
          : null,
      oldTreeId: event.dragNode.treeId,
      newTreeId: event.index,
    };
    console.log(body);

    this._fileStructService.moveFolder(body).subscribe(() => {});
  }

  public selectFolder(event: any) {
    this.folderSelectedId = event.node.id;
  }

  public addFolder(): void {
    if (this.newFolderName === null) {
      return;
    }

    const requestBody: FileStructureCreateRequestModel = {
      label: this.newFolderName!,
      type: EFileType.FOLDER,
      parentFolder: this.folderSelectedId,
    };

    this._fileStructService.createFolder(requestBody).subscribe((res) => {
      this.newFolderName = null;
      this.folderSelectedId = null;
      this.isNewFolderDialogVisible = false;
    });
  }

  public deleteFolder(event: MenuItemCommandEvent): void {
    if (this.folderSelectedId === null) {
      return;
    }

    this._confirmationService.confirm({
      target: event.originalEvent?.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this._fileStructService
          .deleteFolder(this.folderSelectedId!)
          .subscribe((res) => {
            this.folderSelectedId = null;
          });
      },
      reject: () => {
        this.folderSelectedId = null;
      },
    });
  }

  public closeAddFolder(): void {
    this.newFolderName = null;
    this.folderSelectedId = null;
    this.isNewFolderDialogVisible = false;
  }
}
