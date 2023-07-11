import { HistoricoPerfilInterface } from "src/app/interfaces/HistoricoPerfilInterfaces";
import { Perfil } from "../../perfil/perfil.model";
import { Usuario } from "../../usuario/usuario.model";

export class HistoricoPerfil implements HistoricoPerfilInterface {
    id?: number;
    data_inicio?: Date;
    data_final?: Date;
    vigente?: string;
    perfil?: Perfil;
    usuario?: Usuario
  
    constructor(
    id?: number,
    data_final?: Date,
    data_inicio?: Date,
    vigente?: string,
    perfil?: Perfil,
    usuario?: Usuario
  ) { }
}