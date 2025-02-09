import { withCredentialsInterceptor } from './core/interceptors/with-credentials.interceptor';
import { SideBarStateService } from './core/services/stateManagement/side-bar-state.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { HttpAuthService } from './core/services/http/httpAuth.service';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { Theme } from './core/styles/theme.style';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([withCredentialsInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Theme,
      },
    }),
    providePrimeNG({
      ripple: true,
    }),

    provideAnimationsAsync(),
    providePrimeNG(),

    AuthGuard,
    LoginGuard,

    HttpAuthService,

    SideBarStateService,
  ],
};
