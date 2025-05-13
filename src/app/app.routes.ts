import { Route } from '@angular/router';
import { ZonelessComponent } from './zoneless/zoneless.component';
import { PerformanceComponent } from './performance/performance.component';
import { ComponentListComponent } from './component-list/component-list.component';
import { UiComponent } from './ui/ui.component';
import { LinkedComponent } from './linked/linked.component';
import { PerformanceObservableComponent } from './performance/performance-observable/performance-observable.component';

export const appRoutes: Route[] = [
  { path: 'ui', component: UiComponent },
  { path: 'components', component: ComponentListComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'performance-observable', component: PerformanceObservableComponent },
  { path: 'zoneless', component: ZonelessComponent },
  { path: 'linked', component: LinkedComponent },
  { path: '', redirectTo: 'ui', pathMatch: 'full' },
];
