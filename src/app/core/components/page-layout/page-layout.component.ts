import { SideBarSecondaryComponent } from '../side-bar-secondary/side-bar-secondary.component';
import { SideBarStateService } from './../../services/stateManagement/side-bar-state.service';
import { SideBarIconsComponent } from '../side-bar-icons/side-bar-icons.component';
import { SideBarMainComponent } from '../side-bar-main/side-bar-main.component';
import { FooterBarComponent } from '../footer-bar/footer-bar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'sb-page-layout',
  imports: [
    RouterOutlet,
    SideBarMainComponent,
    SideBarSecondaryComponent,
    SideBarIconsComponent,
    TopBarComponent,
    FooterBarComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent {
  constructor(public sideBarState: SideBarStateService) {}
}
