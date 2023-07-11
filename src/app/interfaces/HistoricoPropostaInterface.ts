import { Candidatos } from "../models/candidato/candidatos.model";
import { Proposta } from "../models/proposta/proposta.model";

export interface HistoricoPropostaInterface {
    id?: number;
    data_inicio?: Date;
    data_final?: Date;
    vigente?: string;
    proposta?: Proposta;
    candidatos?: Candidatos;
}