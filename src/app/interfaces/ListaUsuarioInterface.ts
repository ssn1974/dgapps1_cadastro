import { Usuario } from '../models/usuario/usuario.model';

export interface ListaUsuario {
  id: number;
  dtCriacao: Date;
  dtExclusao: Date;
  status: number;
  usuario: Usuario;
}