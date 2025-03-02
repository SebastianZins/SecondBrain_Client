import { withCredentialsInterceptor } from './core/interceptors/with-credentials.interceptor';
import { SideBarStateService } from './core/services/stateManagement/side-bar-state.service';
import { HttpFileStructureService } from './core/services/http/httpFileStructure.service';
import { unauthorizedInterceptor } from './core/interceptors/unauhorized.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZoneChangeDetection, ApplicationConfig } from '@angular/core';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { HttpAuthService } from './core/services/http/httpAuth.service';
import { HttpFileService } from './core/services/http/httpFile.service';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { Theme } from './core/styles/theme.style';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([withCredentialsInterceptor, unauthorizedInterceptor])
    ),
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
    HttpFileStructureService,
    HttpFileService,

    SideBarStateService,
  ],
};
