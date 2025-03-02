import { ListSectionUpdateRequestModel } from 'src/app/core/models/file-section/list-section/list-section-update-request.mode';
import { ListSectionModel } from 'src/app/core/models/file-section/list-section/list-section.model';
import { HttpListSectionService } from 'src/app/core/services/http/httpListSection.service';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { MenuItem } from 'primeng/api';
import {
  ViewChildren,
  ElementRef,
  Component,
  QueryList,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'sb-file-list-section',
  standalone: false,
  templateUrl: './list-section.component.html',
  styleUrl: './list-section.component.scss',
})
export class ListSectionComponent implements OnInit {
  @ViewChildren('input') inputElements!: QueryList<ElementRef>;
  @ViewChild('newInput') newInputElement!: ElementRef;
  @Input() data!: ListSectionModel;

  public newItem?: string;

  public shiftKeyPressed: boolean = false;
  public selectionStart?: number;
  public selectionEnd?: number;
  public lastSelected: number | undefined | null = undefined;

  public isChangeMetadataDialogVisible: boolean = false;

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
    private _listSectionService: HttpListSectionService,
    private _fileSectionService: HttpFileSectionService,
    private _fileService: HttpFileService
  ) {}

  ngOnInit(): void {}

  /**
   * Get a list of all selected items
   *
   * @private
   * @return {*}  {{ value: string; index: number }[]}
   * @memberof ListSectionComponent
   */
  private _getSelectedItems(): { value: string; index: number }[] {
    return this.data.items
      .map((d, i) => ({ ...d, index: i }))
      .filter((d) => d.isSelected === true)
      .map((d) => ({ value: d.value, index: d.index }));
  }

  /**
   * Handle up key is pressed
   * if shift is currectly pressed select or unselect other elements
   * else stop multi-selection
   *
   * @private
   * @param {number} index
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleArrowUpPressed(index: number): void {
    this.lastSelected = index;
    if (index === 0) {
      return;
    }
    if (this.shiftKeyPressed) {
      this.selectionEnd = index - 1;
      this.data.items[index - 1].isSelected = true;
      this.inputElements.toArray()[index - 1].nativeElement.focus();
      if (this.selectionStart! < index && this.selectionEnd! > index) {
        this.data.items[index + 1].isSelected = false;
      }
    } else {
      if (this.selectionStart) {
        this._resetSelection();
      }
      this.inputElements.toArray()[index - 1].nativeElement.focus();
      this.data.items[index].isSelected = false;
      this.data.items[index - 1].isSelected = true;
    }
  }

  /**
   * Handle down key is pressed
   * if shift is currectly pressed select or unselect other elements
   * else stop multi-selection
   *
   * @private
   * @param {number} index
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleArrowDownPressed(index: number): void {
    this.lastSelected = index;
    if (this.shiftKeyPressed) {
      this.selectionEnd = index + 1;
      this.data.items[index + 1].isSelected = true;
      this.inputElements.toArray()[index + 1].nativeElement.focus();
      if (this.selectionStart! > index && this.selectionEnd! < index) {
        this.data.items[index - 1].isSelected = false;
      }
    } else {
      if (this.selectionStart) {
        this._resetSelection();
      }
      if (index + 1 === this.inputElements.toArray().length) {
        this.newInputElement.nativeElement.focus();
        this._resetSelection();
        this.lastSelected = null;
      } else {
        this.inputElements.toArray()[index + 1].nativeElement.focus();
        this.data.items[index].isSelected = false;
        this.data.items[index + 1].isSelected = true;
      }
    }
  }

  /**
   * handle escape button press
   * -> stop selection
   *
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleEscapePressed(): void {
    if (this._getSelectedItems().length > 0) {
      this._resetSelection();
    }
  }

  /**
   * handle delete button press
   * -> delete selected items
   *
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleDeletePressed(): void {
    this.data.items = this.data.items.filter((item) => !item.isSelected);
    this.isDataChanged = true;
  }

  /**
   * handle shift button press
   * -> start or continue multi select
   *
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleShiftPressed(index: number): void {
    if (!this.shiftKeyPressed) {
      this.shiftKeyPressed = true;
      this.selectionStart = index;
      this.selectionEnd = index;
      this.data.items[index].isSelected = true;
      this.inputElements.toArray()[index].nativeElement.focus();
    }
  }

  /**
   * handle up button press on new element
   * -> go to last existing element
   *
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _handleNewItemArrowUpPressed(): void {
    if (this.data.items.length > 0) {
      this.data.items[this.data.items.length - 1].isSelected = true;
      const inputElements = this.inputElements.toArray();
      inputElements[inputElements.length - 1].nativeElement.focus();
    }
  }

  /**
   * reset selected items
   *
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  private _resetSelection(): void {
    this.selectionStart = undefined;
    this.selectionEnd = undefined;
    this.data.items.forEach((d) => (d.isSelected = undefined));
  }

  /**
   * hide this section
   *
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
   *
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
   * handle enter press on new item
   * -> create new item
   *
   * @private
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  public _handleNewItemEnterPressed(): void {
    if (this.newItem && this.newItem !== '') {
      this.data.items.push({ value: this.newItem! });
      this.isDataChanged = true;
      this.newItem = undefined;
    }
  }

  /**
   * update data
   *
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  public updateData(data: string, index: number): void {
    if (data === '') {
      this.data.items.splice(index, 1);
      this.isDataChanged = true;
    }
    if (index + 1 === this.inputElements.toArray().length) {
      this.newInputElement.nativeElement.focus();
    } else {
      this.inputElements.toArray()[index + 1].nativeElement.focus();
    }
  }

  /**
   * handle button presses on new item input
   *
   * @return {*}  {void}
   * @param {KeyboardEvent} event
   * @memberof ListSectionComponent
   */
  public onNewItemKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this._handleNewItemArrowUpPressed();
        break;
      case 'Enter':
        this._handleNewItemEnterPressed();
        break;
    }
  }

  /**
   * handle key presses on existing item
   *
   * @return {*}  {void}
   * @param {number} index
   * @param {KeyboardEvent} event
   * @memberof ListSectionComponent
   */
  public onItemKeydown(event: KeyboardEvent, index: number): void {
    switch (event.key) {
      case 'ArrowDown':
        this._handleArrowDownPressed(index);
        break;
      case 'ArrowUp':
        this._handleArrowUpPressed(index);
        break;
      case 'Escape':
        this._handleEscapePressed();
        break;
      case 'Delete':
        this._handleDeletePressed();
        break;
      case 'Shift':
        this._handleShiftPressed(index);
        break;
    }
  }

  /**
   * handle key up on existing item
   *
   * @return {*}  {void}
   * @param {KeyboardEvent} event
   * @memberof ListSectionComponent
   */
  public onItemKeyup(event: KeyboardEvent): void {
    if (event.key === 'Shift') {
      this.shiftKeyPressed = false;
    }
  }

  /**
   * handle existing item clicked
   *
   * @return {*}  {void}
   * @param {number} index
   * @memberof ListSectionComponent
   */
  public onItemClick(index: number): void {
    if (this._getSelectedItems().length === 0) {
      this.data.items[index].isSelected = true;
      this.inputElements.toArray()[index].nativeElement.focus();
    } else {
      this._resetSelection();
      this.data.items[index].isSelected = true;
      this.inputElements.toArray()[index].nativeElement.focus();
    }
    this.lastSelected = index;
  }

  /**
   * save data
   *
   * @return {*}  {void}
   * @memberof ListSectionComponent
   */
  public saveData(): void {
    const requestData: ListSectionUpdateRequestModel = {
      id: this.data.id,
      items: this.data.items.map((d) => d.value),
    };
    this._listSectionService.updateSection(requestData).subscribe((ok) => {
      if (ok) {
        this.isDataChanged = false;
      }
    });
  }
}
