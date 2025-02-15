import { HttpAuthService } from 'src/app/core/services/http/httpAuth.service';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  standalone: false,
})
export class PageLayoutComponent {
  public $isLoggedIn!: BehaviorSubject<boolean>;

  constructor(private _authService: HttpAuthService) {
    this.$isLoggedIn = this._authService.$loggedIn;
  }
}
