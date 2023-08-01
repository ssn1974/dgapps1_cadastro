import { HistoricoOperacaoInterface } from "src/app/interfaces/HistoricoOperacaoInterface";
import { Usuario } from "../../usuario/usuario.model";
import { Contrato } from "../../contrato/contrato.model";

export class HistoricoOperacao implements HistoricoOperacaoInterface {
    id?: number;
    data_inicio?: Date;
    data_final?: Date;
    vigente?: string;
    usuario?: Usuario
   
    constructor(
      id?: number,
      data_final?: Date,
      data_inicio?: Date,
      vigente?: string,
      usuario?: Usuario,
    ) { }
  }