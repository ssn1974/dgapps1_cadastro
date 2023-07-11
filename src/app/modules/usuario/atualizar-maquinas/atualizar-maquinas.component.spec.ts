import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarMaquinasComponent } from './atualizar-maquinas.component';

describe('AtualizarMaquinasComponent', () => {
  let component: AtualizarMaquinasComponent;
  let fixture: ComponentFixture<AtualizarMaquinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarMaquinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
