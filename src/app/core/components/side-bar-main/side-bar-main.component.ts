import { SideBarStateService } from './../../services/stateManagement/side-bar-state.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
  selector: 'sb-side-bar-main',
  imports: [ButtonModule],
  templateUrl: './side-bar-main.component.html',
  styleUrl: './side-bar-main.component.scss',
})
export class SideBarMainComponent {
  constructor(public sideBarState: SideBarStateService) {}
}
