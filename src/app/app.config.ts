import { withCredentialsInterceptor } from './core/interceptors/with-credentials.interceptor';
import { SideBarStateService } from './core/services/stateManagement/side-bar-state.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { HttpAuthService } from './core/services/http/httpAuth.service';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([withCredentialsInterceptor])),

    provideAnimationsAsync(),
    providePrimeNG(),

    HttpAuthService,

    SideBarStateService,
  ],
};
