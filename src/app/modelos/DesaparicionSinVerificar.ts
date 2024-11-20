import {PersonaIndividual} from './PersonaIndividual';
import {LugarDTO} from './LugarDTO';

export class DesaparicionSinVerificar{
  fotos?: string[];
  fecha?: string;
  descripcion?: string;
  persona?: PersonaIndividual;
  estado?: string;
  lugar?: LugarDTO;
}
