import { SideBarStateService } from 'src/app/core/services/stateManagement/side-bar-state.service';
import { HttpFileStructureService } from 'src/app/core/services/http/httpFileStructure.service';
import { FileStructureModel } from 'src/app/core/models/file-structure/file-structure.model';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-side-bar-secondary',
  standalone: false,
  templateUrl: './side-bar-secondary.component.html',
  styleUrl: './side-bar-secondary.component.scss',
})
export class SideBarSecondaryComponent {
  public $fileStructure!: BehaviorSubject<FileStructureModel[]>;

  constructor(
    public sideBarState: SideBarStateService,
    private _fileStructService: HttpFileStructureService
  ) {
    this.$fileStructure = this._fileStructService.$fileStructure;
  }
}
