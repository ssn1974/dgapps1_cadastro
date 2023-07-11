import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesVagasComponent } from './detalhes-vagas.component';

describe('DetalhesVagasComponent', () => {
  let component: DetalhesVagasComponent;
  let fixture: ComponentFixture<DetalhesVagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesVagasComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
