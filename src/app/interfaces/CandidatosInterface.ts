import { Curriculo } from "../models/curriculo/curriculo.model";
import { PlanoPretensao } from "../models/PlanoPretensao/planoPretensao.model";
import { PlanoSaude } from "../models/planoSaude/planoSaude.model";
import { StatusCandidato } from "../models/statusCandidato/statusCandidato.model";
import { Vagas } from "../models/vagas/vagas.model";

export interface CandidatosInterface {
    id?: number;
    candidatos?: string;
    cpf?: string;
    rg?: string;
    email?: string;
    telefone?: string; 
    vale_alimentacao_atual?: string;
    vale_refeicao_atual?: string;
    remuneracao_atual?: string;
    planoSaude?: PlanoSaude;
    cesta_atual?: string;
    flash_atual?: string;
    bonus_atual?: string;
    vale_alimentacao_pretensao?: string;
    vale_refeicao_pretensao?: string;
    remuneracao_pretensao?: string;
    planoPretensao?: PlanoPretensao;
    cesta_pretensao?: string;
    flash_pretensao?: string;
    bonus_pretensao?: string;
    arquivos?: string;
    status_candidato?: StatusCandidato;
    vagas?: Vagas;
    observacao?: string;
    motivo?: String;
    curriculo?: Curriculo;
}