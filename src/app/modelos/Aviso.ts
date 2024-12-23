import { FotoUrlDTO } from './Foto-Aviso';   // Importamos el modelo de FotoUrl

export interface Aviso {
  id?: number;
  fecha: string;        // La fecha la representamos como un string
  texto?: string;        // El texto del aviso
  fotos?: FotoUrlDTO[];     // El conjunto de fotos lo convertimos en un array de objetos FotoUrl
  id_usuario?: number;
  username?: string;


}
