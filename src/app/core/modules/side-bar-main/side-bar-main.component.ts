import { Component, ViewChild } from '@angular/core';
import {
  MenuItemCommandEvent,
  ConfirmationService,
  MenuItem,
} from 'primeng/api';
import { FileStructureCreateRequestModel } from 'src/app/core/models/file-structure/structure-item/file-structure-create-request.model';
import { FileStructureMoveRequestModel } from 'src/app/core/models/file-structure/structure-item/file-structure-move-request.model';
import { FileStructureModel } from 'src/app/core/models/file-structure/structure-item/file-structure.model';
import { FileCreateRequestModel } from 'src/app/core/models/file-structure/file/file-create-request.model';
import { SideBarStateService } from 'src/app/core/services/stateManagement/side-bar-state.service';
import { HttpFileStructureService } from 'src/app/core/services/http/httpFileStructure.service';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { EFileType } from 'src/app/core/enum/file-type.enum';
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

  public treeNodeContextItems!: MenuItem[];
  public treeComponentContextItems: MenuItem[] = [
    {
      label: 'New Folder',
      icon: 'fas fa-folder-plus',
      command: () => {
        this.parentSelectedId = null;
        this.openNewItemDialog(EFileType.FOLDER);
      },
    },
    {
      label: 'New File',
      icon: 'fas fa-file',
      command: () => {
        this.parentSelectedId = null;
        this.openNewItemDialog(EFileType.FILE);
      },
    },
  ];

  public parentSelectedId: null | string = null;
  public isLoading: boolean = false;

  public isNewItemDialogVisible: boolean = false;
  public newDialogType: EFileType = EFileType.FOLDER;
  public newFolderName: string | null = '';

  constructor(
    public sideBarState: SideBarStateService,
    private _confirmationService: ConfirmationService,
    private _fileStructService: HttpFileStructureService,
    private _fileService: HttpFileService
  ) {
    this.$fileStructure = this._fileStructService.$fileStructure;
  }

  private _setNodeContextItems(node: FileStructureModel): void {
    this.treeNodeContextItems = [
      {
        label: 'New Folder',
        icon: 'fas fa-folder-plus',
        command: () => this.openNewItemDialog(EFileType.FOLDER),
        visible: node.type === EFileType.FOLDER,
      },
      {
        label: 'New File',
        icon: 'fas fa-file',
        command: () => this.openNewItemDialog(EFileType.FILE),
      },
      {
        label: node.type === EFileType.FOLDER ? 'Delete Folder' : 'Delete File',
        icon: 'fas fa-trash',
        command: (event) => this.deleteFolder(event, node),
      },
    ];
  }

  public onTreeContextMenu(event: Event) {
    if (!(event.target as HTMLElement).closest('.p-treenode')) {
      event.preventDefault();
      this.treeComponentContext.show(event);
    }
  }

  public openNewItemDialog(type: EFileType): void {
    this.newFolderName = null;
    this.newDialogType = type;
    this.isNewItemDialogVisible = true;
  }

  public onItemMoved(event: any): void {
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
    this._fileStructService.moveFolder(body).subscribe(() => {});
  }

  public onRightClickItem(event: any) {
    this._setNodeContextItems(event.node);
    this.parentSelectedId = event.node.id;
  }

  public addFolder(name: string): void {
    const requestBody: FileStructureCreateRequestModel = {
      label: name,
      type: EFileType.FOLDER,
      parentFolder: this.parentSelectedId,
    };

    this.isLoading = true;
    this._fileStructService.createFolder(requestBody).subscribe((success) => {
      if (success) {
        this.parentSelectedId = null;
        this.isNewItemDialogVisible = false;
        this.isLoading = false;
      }
    });
  }

  public onItemSelect(event: any): void {
    if (event.node.type === EFileType.FOLDER) {
      event.node.expanded = !event.node.expanded;
    } else {
      this._fileService.selectFile(event.node.id);
    }
  }

  public addFile(name: string): void {
    const requestBody: FileCreateRequestModel = {
      label: name,
      type: EFileType.FILE,
      parentFolder: this.parentSelectedId,
      title: name,
      subtitle: '',
      tags: [],
      category: 0,
      fileClasses: [],
    };

    this.isLoading = true;
    this._fileService.createFile(requestBody).subscribe((success) => {
      if (success) {
        this.parentSelectedId = null;
        this.isNewItemDialogVisible = false;
        this.isLoading = false;
      }
    });
  }

  public deleteFolder(
    event: MenuItemCommandEvent,
    item: FileStructureModel
  ): void {
    if (this.parentSelectedId === null) {
      return;
    }

    this._confirmationService.confirm({
      target: event.originalEvent?.target as EventTarget,
      message: 'Do you want to delete' + item.label + '?',
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
        this.isLoading = true;
        if (this.newDialogType === EFileType.FOLDER) {
          this._fileStructService.deleteFolder(item.id).subscribe(() => {
            this.isLoading = false;
          });
        } else if (this.newDialogType === EFileType.FILE) {
          this._fileService.deleteFile(item.id).subscribe(() => {
            this.isLoading = false;
          });
        }
      },
      reject: () => {},
    });
  }

  public closeAddFolder(): void {
    this.isNewItemDialogVisible = false;
  }
}
