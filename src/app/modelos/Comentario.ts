
export interface Comentario {
  texto?: string;
  nombre?: string;
  email?: string;
  telefono?: number | null; // Maneja valores nulos
  desaparicionId?: number;
}
