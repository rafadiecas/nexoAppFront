// import { Component, OnInit } from '@angular/core';
// import {Usuario}
// import {UsuarioService} from '../../../servicios/usuario.service';

// @Component({
//   selector: 'app-verificar-usuario',
//   standalone: true,
//   imports: [],
//   templateUrl: './verificar-usuario.component.html',
//   styleUrls: ['./verificar-usuario.component.css']
// })
// export class VerificarUsuarioComponent implements OnInit {
//   usuarios: Usuario[] = [];
//
//   constructor(private usuarioService: UsuarioService) { }
//
//   ngOnInit(): void {
//     this.cargarUsuarios();
//   }
//
//   cargarUsuarios(): void {
//     this.usuarioService.getUsuariosNoVerificados().subscribe(
//       (data: Usuario[]) => {
//         this.usuarios = data;
//       },
//       (error) => console.error('Error al cargar los usuarios', error)
//     );
//   }
//
//   verificarUsuario(id: number): void {
//     this.usuarioService.verificarUsuario(id).subscribe(
//       () => {
//         this.cargarUsuarios();
//       },
//       (error) => console.error('Error al verificar el usuario', error)
//     );
//   }
//
//   eliminarUsuario(id: number): void {
//     this.usuarioService.eliminarUsuario(id).subscribe(
//       () => {
//         this.cargarUsuarios();
//       },
//       (error) => console.error('Error al eliminar el usuario', error)
//     );
//   }
// }
