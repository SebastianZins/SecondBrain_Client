import { FilePageComponent } from './file-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    component: FilePageComponent,
  },
];
