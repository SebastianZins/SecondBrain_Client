import { SideBarStateService } from '../../services/stateManagement/side-bar-state.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
  selector: 'sb-footer-bar',
  imports: [ButtonModule, NgIf, AsyncPipe],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss',
})
export class FooterBarComponent {
  constructor(public sideBarState: SideBarStateService) {}
}
