import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {PerfilCivilComponent} from './features/perfil-usuario/componentes/perfil-civil/perfil-civil.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'usuario/civil', component:PerfilCivilComponent}
];
