import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCandidatosComponent } from './detalhes-candidatos.component';

describe('DetalhesCandidatosComponent', () => {
  let component: DetalhesCandidatosComponent;
  let fixture: ComponentFixture<DetalhesCandidatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesCandidatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
