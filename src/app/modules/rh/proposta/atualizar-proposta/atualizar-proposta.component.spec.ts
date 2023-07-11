import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarPropostaComponent } from './atualizar-proposta.component';

describe('AtualizarPropostaComponent', () => {
  let component: AtualizarPropostaComponent;
  let fixture: ComponentFixture<AtualizarPropostaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarPropostaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarPropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
