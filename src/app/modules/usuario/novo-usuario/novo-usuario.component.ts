import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Usuario } from 'src/app/models/usuario/usuario.model';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {


  form: FormGroup;
  usuario: Usuario = new Usuario();
  id: any;
  mostrarDatafinal: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private notifier: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.montaFormBuilder();
    this.carregaUsuarios();
    this.getCEP(this.usuario.cep);
  }


  private montaFormBuilder() {
    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, [Validators.required]],
      celular: [this.usuario.celular, [Validators.required]],
      cpf: [this.usuario.cpf, [Validators.required]],
      data_nascimento:[this.usuario.data_nascimento, [Validators.required]],
      rg: [this.usuario.rg, [Validators.required]],
      data_emissao: [this.usuario.data_emissao, [Validators.required]],
      org_emissor:[this.usuario.org_emissor, [Validators.required]],
      cep: [this.usuario.cep, [Validators.required, ]],
      endereco: [this.usuario.endereco, [Validators.required]],
      cidade: [this.usuario.cidade, [Validators.required]],
      uf: [this.usuario.uf, [Validators.required]],
      email: [this.usuario.email, [Validators.required]],
      codigoRe: [this.usuario.codigoRe, [Validators.required]],
      numero: [this.usuario.numero, [Validators.required]],
      complemento: [this.usuario.complemento, [Validators.required]],
      data_inicio:[this.usuario.data_inicio, [Validators.required]],
      data_final: [this.usuario.data_inicio],
    });
  }

  limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    (<HTMLInputElement>document.getElementById('endereco')).value=("");
    (<HTMLInputElement>document.getElementById('complemento')).value=("");
    (<HTMLInputElement>document.getElementById('cidade')).value=("");
    (<HTMLInputElement>document.getElementById('uf')).value=("");
}
  
  getCEP(event: any) {
      if(event){
        var value = event.target.value;
        var numberPattern = /\d+/g;
        var validacep = /^[0-9]{8}$/;
        value = value.match( numberPattern, validacep).join([]);
        var url = this.usuarioService.buscaCep(value);
        url.subscribe(data => {
          if(data['erro']) {
            this.limpa_formulário_cep()
            alert("Formato de CEP inválido.");
          } else{
            (<HTMLInputElement>document.getElementById("endereco")).value = data['logradouro'];
             this.usuario.endereco = data['logradouro'];
            (<HTMLInputElement>document.getElementById("complemento")).value = data['bairro'];
            this.usuario.complemento = data['bairro'];
            (<HTMLInputElement>document.getElementById("cidade")).value = data['localidade'];
            this.usuario.cidade = data['localidade'];
            (<HTMLInputElement>document.getElementById("uf")).value = data['uf'];
            this.usuario.uf = data['uf'];
          }
        });
        return url
      } 
  }

  private carregaUsuarios() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.usuarioService.getUsuarioId(this.id).subscribe(
        (usuario) => {
          this.usuario = usuario;
          this.mostrarDatafinal= true
        }
      );
    }
  }
 
  submit() {
    if (this.form.invalid) {
      this.notifier.notify("error", " Todos os ampos devem ser preenchidos corretamente!");
    }  else if(this.id){
        this.atualizaUsuario();
      } else {
        this.insereUsuario();
    }
  }

  private insereUsuario() {
    this.usuarioService.insereUsuario(this.usuario).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "Usuario criado com sucesso!");
        this.router.navigate(['usuarios']);
      }
      else {
        this.notifier.notify("error", "Ocorreu um erro ao cadastrar, por favor tente novamente.");
      }
    }, 
    );
  }

  private atualizaUsuario() {
    this.usuarioService.atualizaUsuario(this.usuario).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "Usuario atualizado com sucesso!");
        this.router.navigate(['usuarios']);
      }
      else {
        this.notifier.notify("error", "Ocorreu um erro na atualização, por favor tente novamente.");
      }
    }, 
   );
  }
}