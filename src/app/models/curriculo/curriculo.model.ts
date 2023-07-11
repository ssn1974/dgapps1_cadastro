import { CurriculoInterface } from "src/app/interfaces/CurriculoInterface";


export class Curriculo implements CurriculoInterface {
  id: number;
  nome: string;
  link: string;
}