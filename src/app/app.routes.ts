import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {PerfilCivilComponent} from './features/perfil-usuario/componentes/perfil-civil/perfil-civil.component';
import {DesaparicionComponent} from './features/desaparicion/desaparicion.component';
import {LoginComponent} from './features/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',component: LoginComponent },
  {path: 'usuario/civil', component:PerfilCivilComponent},
  { path: 'desaparicion/:id', component: DesaparicionComponent },
];
