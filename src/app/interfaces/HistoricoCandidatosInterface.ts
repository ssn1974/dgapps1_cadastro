import { Candidatos } from "../models/candidato/candidatos.model";
import { StatusCandidato } from "../models/statusCandidato/statusCandidato.model";


export interface HistoricoCandidatosInterface {
    id?: number;
    data_inicio?: Date;
    data_final?: Date;
    vigente?: string;
    status_candidato?: StatusCandidato;
    candidatos?: Candidatos;
}