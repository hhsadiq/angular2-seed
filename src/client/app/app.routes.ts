import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { RxjsRoutes } from './rxjs/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...RxjsRoutes
];
