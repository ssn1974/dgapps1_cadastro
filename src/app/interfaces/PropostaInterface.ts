import { Candidatos } from "../models/candidato/candidatos.model";
import { StatusCandidato } from "../models/statusCandidato/statusCandidato.model";

export interface PropostaInterface {
    id?: number;
    flash?: string;
    plano_odonto?: boolean;
    plano_saude?: boolean;
    remuneracao?: string;
    seguro_vida?: boolean;
    vale_alimentacao?: boolean;
    vale_refeicao?: boolean;
    status_candidatos?: StatusCandidato;
    candidatos?: Candidatos;
}