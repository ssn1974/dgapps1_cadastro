import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesMaquinasComponent } from './detalhes-maquinas.component';

describe('DetalhesMaquinasComponent', () => {
  let component: DetalhesMaquinasComponent;
  let fixture: ComponentFixture<DetalhesMaquinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesMaquinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
