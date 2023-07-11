import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasComponent } from './vagas.component';

describe('VagassComponent', () => {
  let component: VagasComponent;
  let fixture: ComponentFixture< VagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  VagasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( VagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
