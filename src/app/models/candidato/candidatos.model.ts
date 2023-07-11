import { CandidatosInterface } from "src/app/interfaces/CandidatosInterface";
import { Curriculo } from "../curriculo/curriculo.model";
import { PlanoPretensao } from "../PlanoPretensao/planoPretensao.model";
import { PlanoSaude } from "../planoSaude/planoSaude.model";
import { StatusCandidato } from "../statusCandidato/statusCandidato.model";
import { Vagas } from "../vagas/vagas.model";

export class Candidatos implements CandidatosInterface {

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
    motivo?: string;
    curriculo?: Curriculo;

    constructor( 
        id?: number,
        candidatos?: string,
        cpf?: string,
        rg?: string,
        email?: string,
        telefone?: string,
        vale_alimentacao_atual?: string,
        vale_refeicao_atual?: string,
        remuneracao_atual?: string,
        planoSaude?: PlanoSaude,
        cesta_atual?: string,
        flash_atual?: string,
        bonus_atual?: string,
        vale_alimentacao_pretensao?: string,
        vale_refeicao_pretensao?: string,
        remuneracao_pretensao?: string,
        planoPretensao?: PlanoPretensao,
        cesta_pretensao?: string,
        flash_pretensao?: string,
        bonus_pretensao?: string,
        arquivos?: string,
        status_candidato?: StatusCandidato,
        vagas?: Vagas,
        observacao?: string,
        motivo?: string,
        curriculo?: Curriculo,
    ) { }
}