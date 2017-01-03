import { RouterModule } from '@angular/router';
import { ServiceConsumerComponent } from './service-consumer/service-consumer.component';
const APP_ROUTES = [
  {path: 'digest/:id', component: ServiceConsumerComponent},
  {path: '**', redirectTo: 'digest/1', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
