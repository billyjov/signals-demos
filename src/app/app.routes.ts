import { Route } from '@angular/router';
import { ZonelessComponent } from './zoneless/zoneless.component';
import { PerformanceComponent } from './performance/performance.component';
import { ComponentListComponent } from './component-list/component-list.component';
import { UiComponent } from './ui/ui.component';

export const appRoutes: Route[] = [
  { path: 'ui', component: UiComponent },
  { path: 'components', component: ComponentListComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'zoneless', component: ZonelessComponent },
  { path: '', redirectTo: 'ui', pathMatch: 'full' },
];
