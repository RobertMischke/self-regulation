import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { CofounderComponent } from './pages/cofounder/cofounder.component';
import { DatenschutzComponent } from './pages/datenschutz/datenschutz.component';
import { ValidierungComponent } from './pages/validierung/validierung.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Regulate' },
  { path: 'dashboard/:key', component: DashboardComponent },
  { path: 'impressum', component: ImpressumComponent, title: 'Impressum – Regulate' },
  { path: 'cofounder', component: CofounderComponent, title: 'Co-Founder – Regulate' },
  { path: 'datenschutz', component: DatenschutzComponent, title: 'Datenschutz – Regulate' },
  { path: 'validierung', component: ValidierungComponent, title: 'Wissenschaftliche Einordnung – Regulate' },
  { path: '**', redirectTo: '' },
];
