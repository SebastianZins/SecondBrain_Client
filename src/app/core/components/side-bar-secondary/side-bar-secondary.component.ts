import { SideBarStateService } from '../../services/stateManagement/side-bar-state.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
  selector: 'sb-side-bar-secondary',
  imports: [ButtonModule],
  templateUrl: './side-bar-secondary.component.html',
  styleUrl: './side-bar-secondary.component.scss',
})
export class SideBarSecondaryComponent {
  constructor(public sideBarState: SideBarStateService) {}
}
