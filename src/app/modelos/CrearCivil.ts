import {CrearUsuario} from './CrearUsuario';

export class CivilCrearDTO {
  dni?: string;
  telefono?: string; // En el backend es String, debe coincidir
  nombre?: string;
  apellido?: string; // Asegúrate de mantener consistencia entre singular/plural
  usuarioCrearDTO?: CrearUsuario; // Anidado como en el backend
}

