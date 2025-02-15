import { SideBarStateService } from 'src/app/core/services/stateManagement/side-bar-state.service';
import { Component } from '@angular/core';

@Component({
  selector: 'sb-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss',
  standalone: false,
})
export class FooterBarComponent {
  constructor(public sideBarState: SideBarStateService) {}
}
