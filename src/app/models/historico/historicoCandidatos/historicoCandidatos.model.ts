import { HistoricoCandidatosInterface } from "src/app/interfaces/HistoricoCandidatosInterface";
import { Candidatos } from "../../candidato/candidatos.model";
import { StatusCandidato } from "../../statusCandidato/statusCandidato.model";

export class HistoricoCandidatos implements HistoricoCandidatosInterface {
    id?: number;
    data_inicio?: Date;
    data_final?: Date;
    vigente?: string;
    status_candidato?: StatusCandidato;
    candidatos?: Candidatos;
  
    constructor(
        id?: number,
        data_inicio?: Date,
        data_final?: Date,
        vigente?: string,
        status_candidato?: StatusCandidato,
        candidatos?: Candidatos,
    ) { }
  }