import { HttpAuthService } from 'src/app/core/services/http/httpAuth.service';
import { AppConstants } from 'src/app/app.constants';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-login-page',
  imports: [ButtonModule, PasswordModule, InputTextModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public mail: string | null = null;
  public password: string | null = null;

  constructor(private _authService: HttpAuthService, private _router: Router) {
    console.log('LoginPageComponent');
  }

  public login(): void {
    this._authService.login(this.mail!, this.password!).subscribe((success) => {
      if (success) {
        this._router.navigate([AppConstants.ROUTES.HOME]);
      }
    });
  }
}
