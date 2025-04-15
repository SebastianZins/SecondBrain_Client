import { ChecklistSectionModel } from 'src/app/core/models/file-section/checklist-section/checklist-section.model';
import { HttpChecklistSectionService } from 'src/app/core/services/http/httpChecklistSection.service';
import { HttpFileSectionService } from 'src/app/core/services/http/httpFileSection.service';
import { HttpFileService } from 'src/app/core/services/http/httpFile.service';
import { getTagsFromText } from 'src/app/core/helper/getTags.helper';
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
import { ChecklistSectionUpdateRequestModel } from 'src/app/core/models/file-section/checklist-section/checklist-section-update-request.mode';
import { ChecklistSectionItemModel } from 'src/app/core/models/file-section/checklist-section/checklist-section-item.model';

@Component({
  selector: 'sb-file-checklist-section',
  standalone: false,
  templateUrl: './checklist-section.component.html',
  styleUrl: './checklist-section.component.scss',
})
export class CheckChecklistSectionComponent implements OnInit {
  @ViewChildren('listItem') listElements!: QueryList<ElementRef>;
  @ViewChild('newInput') newInputElement!: ElementRef;
  @Input() data!: ChecklistSectionModel;

  public newItem?: string;

  public shiftKeyPressed: boolean = false;
  public ctrlKeyPressed: boolean = false;

  public selectionStart?: number;
  public selectionEnd?: number;
  public activeElement?: number;
  public newElementActive: boolean = false;

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
    private _checklistSectionService: HttpChecklistSectionService,
    private _fileSectionService: HttpFileSectionService,
    private _fileService: HttpFileService
  ) {}

  ngOnInit(): void {}

  /**
   * handle existing item clicked
   * @return {*}  {void}
   * @param {number} index
   * @memberof ChecklistSectionComponent
   */
  public onItemClick(index: number): void {
    this._selectItem(index);
    this.activeElement = this.selectionEnd!;
    this.shiftKeyPressed = false;
    this.ctrlKeyPressed = false;
    this._focusItem(this.selectionEnd!);
  }

  /**
   * handle key presses on existing item
   * @return {*}  {void}
   * @param {number} index
   * @param {KeyboardEvent} event
   * @memberof ChecklistSectionComponent
   */
  public onItemKeydown(event: KeyboardEvent): void {
    console.log(event);
    switch (event.key) {
      case 'ArrowDown':
        this._handleArrowDownPressed();
        break;
      case 'ArrowUp':
        this._handleArrowUpPressed();
        break;
      case 'Escape':
        this._handleEscapePressed();
        break;
      case 'Delete':
        this._handleDeletePressed();
        break;
      case 'Shift':
        this._handleShiftPressed();
        break;
      case 'Control':
        this._handleCtrlPressed();
        break;
      case 's':
        this._handleSPressed(event);
        break;
      default:
        if (this.selectionEnd !== undefined) {
          this._activateItem(this.selectionEnd!);
        }
        break;
    }
  }

  /**
   * handle key up on existing item
   * @return {*}  {void}
   * @param {KeyboardEvent} event
   * @memberof ChecklistSectionComponent
   */
  public onItemKeyup(event: KeyboardEvent): void {
    if (event.key === 'Shift') {
      this.shiftKeyPressed = false;
    }
    if (event.key === 'Control') {
      this.ctrlKeyPressed = false;
    }
  }

  /**
   * handle key up on existing item
   * @return {*}  {void}
   * @param {KeyboardEvent} event
   * @memberof ChecklistSectionComponent
   */
  public onNewItemKeyup(event: KeyboardEvent): void {
    if (event.key === 'Control') {
      this.ctrlKeyPressed = false;
    }
  }

  /**
   * handle button presses on new item input
   * @return {*}  {void}
   * @param {KeyboardEvent} event
   * @memberof ChecklistSectionComponent
   */
  public onNewItemKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this._handleNewItemArrowUpPressed();
        break;
      case 'Enter':
        this._handleNewItemEnterPressed();
        break;
      case 'Control':
        this._handleCtrlPressed();
        break;
      case 's':
        this._handleSPressed(event);
        break;
    }
  }

  /**
   * Handle up key is pressed
   * if shift is currectly pressed select or unselect other elements
   * else stop multi-selection
   * @private
   * @param {number} index
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleArrowUpPressed(): void {
    if (this.selectionEnd === 0) {
      return;
    }
    // check if multi select active
    if (this.shiftKeyPressed) {
      this._selectNextItem(this.selectionEnd! - 1);
    } else {
      this._selectItem(this.selectionEnd! - 1);
    }
  }

  /**
   * Handle down key is pressed
   * if shift is currectly pressed select or unselect other elements
   * else stop multi-selection
   * @private
   * @param {number} index
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleArrowDownPressed(): void {
    // check if multi select active
    if (this.shiftKeyPressed) {
      this._selectNextItem(this.selectionEnd! + 1);
    } else {
      if (this.selectionEnd === this.listElements.toArray().length - 1) {
        this._activateNewItem(this.selectionEnd!);
      } else {
        this._selectItem(this.selectionEnd! + 1);
      }
    }
  }

  /**
   * handle escape button press
   * -> stop selection
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleEscapePressed(): void {
    if (this.activeElement !== undefined || this.newElementActive) {
      this.activeElement = undefined;
      this.newElementActive = false;
      if (
        this.selectionStart !== undefined ||
        this.selectionEnd !== undefined
      ) {
        this._focusItem(this.selectionEnd ?? this.selectionStart!);
      }
    } else {
      this.resetSelection();
    }
  }

  /**
   * handle delete button press
   * -> delete selected items
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleDeletePressed(): void {
    if (this.selectionStart === undefined) {
      return;
    }
    this.data.items = this.data.items.filter((_, index) => {
      if (this.selectionStart === index) {
        return false;
      }
      if (this.selectionEnd === undefined) {
        return true;
      }
      return !(
        (index >= this.selectionStart! && index <= this.selectionEnd) ||
        (index <= this.selectionStart! && index >= this.selectionEnd)
      );
    });
    this.activeElement = undefined;
    this.newElementActive = false;
    var newIndex = Math.min(this.selectionStart!, this.selectionEnd!);
    if (this.data.items.length === 0) {
      this.selectionStart = undefined;
      this.selectionEnd = undefined;
    } else {
      this.selectionStart =
        newIndex >= this.data.items.length
          ? this.data.items.length - 1
          : newIndex;
      this.selectionEnd = this.selectionStart;
    }
    this.isDataChanged = true;
  }

  /**
   * handle shift button press
   * -> start or continue multi select
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleShiftPressed(): void {
    this.shiftKeyPressed = true;
    this.ctrlKeyPressed = false;
  }

  /**
   * handle ctrl button press
   * -> mark ctrl as pressed
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleCtrlPressed(): void {
    this.ctrlKeyPressed = true;
    this.shiftKeyPressed = false;
  }

  /**
   * handle ctrl button press
   * -> save data when ctrl and s key are pressed together
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleSPressed(event: KeyboardEvent): void {
    if (this.ctrlKeyPressed) {
      event.preventDefault();
      this.saveData();
    } else if (
      this.selectionEnd !== undefined &&
      this.activeElement !== undefined
    ) {
      this._activateItem(this.selectionEnd!);
    }
  }

  /**
   * handle up button press on new element
   * -> go to last existing element
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleNewItemArrowUpPressed(): void {
    this._selectItem(this.data.items.length - 1);
  }

  /**
   * reset selected items
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  public resetSelection(): void {
    this.selectionStart = undefined;
    this.selectionEnd = undefined;
    this.activeElement = undefined;
    this.newElementActive = false;
  }

  /**
   * hide this section
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
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
   * @memberof ChecklistSectionComponent
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
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _handleNewItemEnterPressed(): void {
    if (this.newItem && this.newItem !== '') {
      this.data.items.push({
        text: this.newItem!,
        isChecked: false,
        checkedDate: null,
      });
      this.isDataChanged = true;
      this.newItem = undefined;
    }
  }

  /**
   * update data
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  public updateData(data: string, index: number): void {
    if (data === '') {
      this.data.items.splice(index, 1);
      this.isDataChanged = true;
    }
    this._selectItem(index);
  }

  /**
   * save data
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  public saveData(): void {
    this.tags = [];
    this.data.items.forEach((text) => {
      var tags = getTagsFromText(text.text);
      this.tags.push(...tags);
    });

    const requestData: ChecklistSectionUpdateRequestModel = {
      id: this.data.id,
      items: this.data.items,
      tags: this.tags,
    };
    this._checklistSectionService.updateSection(requestData).subscribe((ok) => {
      if (ok) {
        this.isDataChanged = false;
      }
    });
  }

  /**
   * Get the selection state of the list item with index
   * @param {index} index
   * @return {boolean}  selected state of item
   * @memberof ChecklistSectionComponent
   */
  public isSelected(index: number): boolean {
    if (this.selectionStart === undefined) {
      return false;
    }
    if (this.selectionStart === index) {
      return true;
    }
    if (this.selectionEnd === undefined) {
      return false;
    }
    return (
      (index >= this.selectionStart && index <= this.selectionEnd) ||
      (index <= this.selectionStart && index >= this.selectionEnd)
    );
  }

  /**
   *Get the active state of the list item with index
   * @param {index} index
   * @return {boolean} selected state of item
   * @memberof ChecklistSectionComponent
   */
  public isActive(index: number): boolean {
    return this.activeElement !== undefined && this.activeElement === index;
  }

  /**
   * activate a list item and focus on it
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _activateItem(index: number): void {
    this.selectionStart = index;
    this.selectionEnd = index;
    this.activeElement = index;
    this.newElementActive = false;
    this._focusItem(index);
  }

  /**
   * activate the new item
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _activateNewItem(index: number): void {
    this.selectionStart = index;
    this.selectionEnd = index;
    this.activeElement = index;
    this.newElementActive = false;
    this.newElementActive = false;
    // focus input element
    this.newInputElement.nativeElement.focus();
  }

  /**
   * select a item
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _selectItem(index: number): void {
    this.selectionStart = index;
    this.selectionEnd = index;
    this.activeElement = undefined;
    this.newElementActive = false;
    this._focusItem(index);
  }

  /**
   * select the next item when shift is pressed
   * @private
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _selectNextItem(index: number): void {
    this.selectionEnd = index;
    this._focusItem(index);
  }

  /**
   * focus on a item
   * @private
   * @param {index} index
   * @return {*}  {void}
   * @memberof ChecklistSectionComponent
   */
  private _focusItem(index: number): void {
    var element = this.listElements.toArray()[index].nativeElement;
    setTimeout(() => {
      // when input item active
      if (this.activeElement !== undefined || this.newElementActive) {
        element.firstElementChild.firstElementChild.focus();
      }
      // when span selected
      else {
        element.firstElementChild.firstElementChild.focus();
      }
    });
  }

  public itemChecked(item: ChecklistSectionItemModel): void {
    this.isDataChanged = true;
    item.isChecked = !item.isChecked;
    item.checkedDate = item.isChecked ? new Date().getTime() : null;
  }
}
