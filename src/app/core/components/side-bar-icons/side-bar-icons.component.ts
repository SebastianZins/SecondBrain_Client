import { SideBarStateService } from '../../services/stateManagement/side-bar-state.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
  selector: 'sb-side-bar-icons',
  imports: [ButtonModule],
  templateUrl: './side-bar-icons.component.html',
  styleUrl: './side-bar-icons.component.scss',
})
export class SideBarIconsComponent {
  constructor(public sideBarState: SideBarStateService) {}

  public toggleMainSideBar() {
    this.sideBarState.toggleMainSidebar();
  }
  public toggleSecondarySideBar() {
    this.sideBarState.toggleSecondarySidebar();
  }
}
