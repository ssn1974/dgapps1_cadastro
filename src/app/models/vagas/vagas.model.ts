import { VagasInterface } from "src/app/interfaces/VagasInterfaces";
import { Bu } from "../bu/bu.model";
import { Candidatos } from "../candidato/candidatos.model";
import { Funcao } from "../cargo/funcao.model";
import { Especialidade } from "../especialidade/Especialidade.model";
import { Etapa } from "../etapa/etapa.model";
import { PlanoSaude } from "../planoSaude/planoSaude.model";
import { Recrutador } from "../recrutador/recrutador.model";
import { Status } from "../status/status.model";
import { Contrato } from "../contrato/contrato.model";

export class Vagas implements VagasInterface {

    id?: number;
    qualitor?: string;
    vale_alimentacao?: string;
    vale_refeicao?: string;
    remuneracao?: string;
    planoSaude?: PlanoSaude;
    cesta?: string;
    flash?: string;
    bonus?: string;
    etapa?: Etapa;
    status?: Status;
    cargo?: Funcao;
    especialidade?: Especialidade;
    recrutador?: Recrutador;
    bu?: Bu;
    data_inicio?: Date;
    data_final?: Date;
    candidato?: Candidatos;
    contrato?: Contrato;


    constructor( 
        id?: number,
        candidato?: Candidatos,
        qualitor?: string,
        vale_alimentacao?: string,
        vale_refeicao?: string,
        remuneracao?: string,
        planoSaude?: PlanoSaude,
        cesta?: string,
        flash?: string,
        bonus?: string,
        etapa?: Etapa,
        cargo?: Funcao,
        status?: Status,
        especialidade?: Especialidade,
        recrutadora?: string,
        bu?: Bu,
        data_final?: Date,
        recrutador?: Recrutador,
        data_inicio?: Date,
        contrato?: Contrato,
    ) { }
}