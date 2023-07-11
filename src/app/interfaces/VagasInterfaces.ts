import { Bu } from "../models/bu/bu.model";
import { Funcao } from "../models/cargo/funcao.model";
import { Especialidade } from "../models/especialidade/Especialidade.model";
import { Etapa } from "../models/etapa/etapa.model";
import { PlanoSaude } from "../models/planoSaude/planoSaude.model";
import { Recrutador } from "../models/recrutador/recrutador.model";
import { Status } from "../models/status/status.model";

export interface VagasInterface {
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
    recrutadora?: string;
    bu?: Bu;
    data_final?: Date;
    recrutador?: Recrutador;
    data_inicio?: Date;

}