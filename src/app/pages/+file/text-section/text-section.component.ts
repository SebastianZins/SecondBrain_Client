import { TextSectionUpdateRequestModel } from 'src/app/core/models/file-section/text-section/text-section-update-request.mode';
import { TextSectionModel } from 'src/app/core/models/file-section/text-section/text-section.model';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { HttpTextSectionService } from 'src/app/core/services/http/httpTextSection.service';
import { ElementRef, Component, ViewChild, OnInit, Input } from '@angular/core';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sb-file-text-section',
  standalone: false,
  templateUrl: './text-section.component.html',
  styleUrl: './text-section.component.scss',
})
export class TextSectionComponent implements OnInit {
  @ViewChild('textInput') textArea!: ElementRef;
  @Input() data!: TextSectionModel;

  public ctrlKeyPressed: boolean = false;

  public isActive: boolean = false;

  public isChangeMetadataDialogVisible: boolean = false;

  public tags: string[] = [];

  public isDataChanged: boolean = false;
  public contextMenuItems: MenuItem[] = [
    {
      label: 'Hide',
      command: () => this._hideSection(),
    },
    {
      label: 'Edit Meta Data',
      command: () => (this.isChangeMetadataDialogVisible = true),
    },
    {
      label: 'Delete',
      command: () => this._deleteSection(),
    },
  ];

  constructor(
    private _textSectionService: HttpTextSectionService,
    private _fileSectionService: HttpFileSectionService,
    private _fileService: HttpFileService
  ) {}

  ngOnInit(): void {}

  /**
   * handle existing item clicked
   * @return {*}  {void}
   * @param {number} index
   * @memberof ListSectionComponent
   */
  public onItemClick(): void {
    this.isActive = true;
    this.ctrlKeyPressed = false;
    this._focus();
  }

  /**
   * handle key presses on existing item
   * @return {*}  {void}
   * @param {number} index
   * @param {KeyboardEvent} event
   * @memberof ListSectionComponent
   */
  public onItemKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this._handleEscapePressed();
        break;
      case 'Control':
        this._handleCtrlPressed();
        break;
      case 's':
        this._handleSPressed(event);
        break;
      default:
        if (this.isActive === false) {
          this.isActive = true;
        }
        break;
    }
  }

  /**
   * handle key up on existing item
   * @return {*}  {void}
   * @param {KeyboardEvent} event
   * @memberof ListSectionComponent
   */
  public onItemKeyup(event: KeyboardEvent): void {
    if (event.key === 'Control') {
      this.ctrlKeyPressed = false;
    }
  }

  /**
   * handle escape button press
   * -> stop selection
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleEscapePressed(): void {
    if (this.isActive) {
      this.isActive = false;
    }
  }

  /**
   * handle ctrl button press
   * -> mark ctrl as pressed
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleCtrlPressed(): void {
    this.ctrlKeyPressed = true;
  }

  /**
   * handle ctrl button press
   * -> save data when ctrl and s key are pressed together
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleSPressed(event: KeyboardEvent): void {
    if (this.ctrlKeyPressed) {
      event.preventDefault();
      this.saveData();
    }
  }

  /**
   * hide this section
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _hideSection(): void {
    this.data.isVisible = false;
    this._fileSectionService.updateSection(this.data).subscribe((ok) => {
      if (ok) {
        this._fileService.refreshFileData();
      }
    });
  }

  /**
   * delete this section
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _deleteSection(): void {
    this._fileSectionService.deleteSection(this.data.id).subscribe((ok) => {
      if (ok) {
        this._fileService.refreshFileData();
      }
    });
  }

  /**
   * save data
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  public saveData(): void {
    this.tags = [];

    const requestData: TextSectionUpdateRequestModel = {
      id: this.data.id,
      text: this.data.text,
      tags: this.tags,
    };
    this._textSectionService.updateSection(requestData).subscribe((ok) => {
      if (ok) {
        this.isDataChanged = false;
      }
    });
  }

  test() {
    console.log(this.data.text);
  }

  /**
   * focus on a item
   * @private
   * @param {index} index
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _focus(): void {
    var element = this.textArea.nativeElement;
    setTimeout(() => {
      element.firstElementChild.focus();
    });
  }
}
