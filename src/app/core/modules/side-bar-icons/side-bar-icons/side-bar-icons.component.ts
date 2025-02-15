import { SideBarStateService } from 'src/app/core/services/stateManagement/side-bar-state.service';
import { HttpAuthService } from 'src/app/core/services/http/httpAuth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'sb-side-bar-icons',
  standalone: false,
  templateUrl: './side-bar-icons.component.html',
  styleUrl: './side-bar-icons.component.scss',
})
export class SideBarIconsComponent {
  constructor(
    public sideBarState: SideBarStateService,
    private _authService: HttpAuthService
  ) {}

  public toggleMainSideBar() {
    this.sideBarState.toggleMainSidebar();
  }
  public toggleSecondarySideBar() {
    this.sideBarState.toggleSecondarySidebar();
  }

  public logout(): void {
    this._authService.logout();
  }
}
