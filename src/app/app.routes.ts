import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {PerfilCivilComponent} from './features/perfil-usuario/componentes/perfil-civil/perfil-civil.component';
import {DesaparicionComponent} from './features/desaparicion/desaparicion.component';
import {LoginComponent} from './core/login/login.component';
import {RegistraUsuarioComponent} from './core/registra-usuario/registra-usuario.component';
import {AdminPanelComponent} from './features/admin-panel/admin-panel.component';
import {AutoridadAvisosComponent} from './features/perfil-autoridad/componentes/autoridad-avisos/autoridad-avisos.component';
import {MostrarmasComponent} from './features/home/componentes/mostrarmas/mostrarmas.component';
import {AdminAvisosComponent} from './features/admin-panel/componentes/admin-avisos/admin-avisos.component';
import {civilGuard} from './core/guard/civil.guard';
import { AdminUsuariosComponent } from './features/admin-panel/componentes/lista-usuarios-admin/lista-usuarios-admin.component'
import {VistaAutoridadComponent} from './features/perfil-autoridad/vista-autoridad/vista-autoridad.component';
import {VistaAdminComponent} from './features/admin-panel/vista-admin/vista-admin.component';
import {autoridadGuard} from './core/guard/autoridad.guard';
import {PerfilUsuarioComponent} from './features/perfil-usuario/perfil-usuario.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',component: LoginComponent },
  { path: 'usuario/civil', component:PerfilCivilComponent,  canActivate: [civilGuard] },
  { path: 'desaparicion/:id', component: DesaparicionComponent },
  { path: 'admin', component: AdminPanelComponent },
  {path: 'usuario/listaUsuarios', component: AdminUsuariosComponent},
  { path: 'autoridad/avisos', component: AutoridadAvisosComponent },
  { path: 'mostrar', component: MostrarmasComponent },
  { path: 'admin/avisos', component: AdminAvisosComponent },
  { path: 'registro', component: RegistraUsuarioComponent },
  { path: 'usuario/autoridad', component: VistaAutoridadComponent,canActivate: [autoridadGuard] },
  { path: 'admin/recursos', component: VistaAdminComponent },
  { path: 'usuario', component: PerfilUsuarioComponent },
];
