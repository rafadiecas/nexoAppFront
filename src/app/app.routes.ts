import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {PerfilCivilComponent} from './features/perfil-usuario/componentes/perfil-civil/perfil-civil.component';
import {DesaparicionComponent} from './features/desaparicion/desaparicion.component';
import {LoginComponent} from './core/login/login.component';
import {RegistraUsuarioComponent} from './core/registra-usuario/registra-usuario.component';
import {AdminPanelComponent} from './features/admin-panel/admin-panel.component';
import {AutoridadAvisosComponent} from './features/perfil-autoridad/componentes/autoridad-avisos/autoridad-avisos.component';
import {MostrarmasComponent} from './features/home/componentes/mostrarmas/mostrarmas.component';
import {civilGuard} from './core/guard/civil.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',component: LoginComponent },
  { path: 'usuario/civil', component:PerfilCivilComponent,  canActivate: [civilGuard] },
  { path: 'desaparicion/:id', component: DesaparicionComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'registro', component: RegistraUsuarioComponent },
  { path: 'autoridad/avisos', component: AutoridadAvisosComponent },
  { path: 'mostrar', component: MostrarmasComponent },
];
