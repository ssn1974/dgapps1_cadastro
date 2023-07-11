import { Perfil } from '../perfil/perfil.model';
import { Usuario } from '../usuario/usuario.model';

export class ListaUsuario {
  id: number;
  dtCriacao: Date;
  dtExclusao: Date;
  status: number;
  usuario: Usuario;
  perfil: Perfil
}
