import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhaUsuarioComponent } from './detalha-usuario.component';

describe('DetalhaUsuarioComponent', () => {
  let component: DetalhaUsuarioComponent;
  let fixture: ComponentFixture<DetalhaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhaUsuarioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
