import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosDisponivelComponent } from './candidatos-disponivel.component';

describe('CandidatosDisponivelComponent', () => {
  let component: CandidatosDisponivelComponent;
  let fixture: ComponentFixture<CandidatosDisponivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatosDisponivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosDisponivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
