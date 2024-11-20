import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {PerfilCivilComponent} from './features/perfil-usuario/componentes/perfil-civil/perfil-civil.component';
import {DesaparicionComponent} from './features/desaparicion/desaparicion.component';
import {LoginComponent} from './core/login/login.component';
import {RegistraUsuarioComponent} from './core/registra-usuario/registra-usuario.component';
import {AdminPanelComponent} from './features/admin-panel/admin-panel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',component: LoginComponent },
  { path: 'usuario/civil', component:PerfilCivilComponent },
  { path: 'desaparicion/:id', component: DesaparicionComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'registro', component: RegistraUsuarioComponent }
];
