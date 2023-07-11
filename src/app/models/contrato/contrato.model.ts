import { ContratoInterface } from "src/app/interfaces/ContratoInterfaces";

export class Contrato implements ContratoInterface {
    id: number;
    cliente: string;
    demanda: string;
    operacao: string;
    centro: string;
}