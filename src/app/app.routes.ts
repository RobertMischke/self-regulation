import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { CofounderComponent } from './pages/cofounder/cofounder.component';
import { DatenschutzComponent } from './pages/datenschutz/datenschutz.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard/:key', component: DashboardComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'cofounder', component: CofounderComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: '**', redirectTo: '' },
];
