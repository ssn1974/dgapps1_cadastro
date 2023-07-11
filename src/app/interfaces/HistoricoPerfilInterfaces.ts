import { Perfil } from "../models/perfil/perfil.model";
import { Usuario } from "../models/usuario/usuario.model";

export interface HistoricoPerfilInterface {
id?: number;
data_inicio?: Date;
data_final?: Date;
vigente?: string;
perfil?: Perfil;
usuario?: Usuario;
}