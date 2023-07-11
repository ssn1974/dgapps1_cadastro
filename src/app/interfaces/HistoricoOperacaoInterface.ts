import { Usuario } from "../models/usuario/usuario.model";

export interface HistoricoOperacaoInterface {
    id?: number;
    data_inicio?: Date;
    data_final?: Date;
    vigente?: string;
    usuario?: Usuario
    }