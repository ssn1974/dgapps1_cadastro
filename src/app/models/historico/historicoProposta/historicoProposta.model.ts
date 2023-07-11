import { HistoricoPropostaInterface } from 'src/app/interfaces/HistoricoPropostaInterface';
import { Proposta } from '../../proposta/proposta.model';
import { Candidatos } from '../../candidato/candidatos.model';

export class HistoricoProposta implements HistoricoPropostaInterface {
    id?: number;
    data_inicio?: Date;
    data_final?: Date;
    vigente?: string;
    proposta?: Proposta;
    candidatos?: Candidatos;

  constructor(
    id?: number,
    data_inicio?: Date,
    data_final?: Date,
    vigente?: string,
    proposta?: Proposta,
    candidatos?: Candidatos,
  ) { }
}

