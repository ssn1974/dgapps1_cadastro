import {CargoInterface } from 'src/app/interfaces/CargoInterface';
import { PropostaInterface } from 'src/app/interfaces/PropostaInterface';
import { StatusCandidato } from '../statusCandidato/statusCandidato.model';
import { Candidatos } from '../candidato/candidatos.model';

export class Proposta implements PropostaInterface {
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