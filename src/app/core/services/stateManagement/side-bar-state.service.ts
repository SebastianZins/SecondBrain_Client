import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideBarStateService {
  public $mainSidebarVisible = new BehaviorSubject<boolean>(false);
  public $secondarySidebarVisible = new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * Switch the visibility of the main sidebar.
   */
  public toggleMainSidebar(): void {
    this.$mainSidebarVisible.next(!this.$mainSidebarVisible.value);
  }

  /**
   * Switch the visibility of the secondary sidebar.
   */
  public toggleSecondarySidebar(): void {
    this.$secondarySidebarVisible.next(!this.$secondarySidebarVisible.value);
  }
}
