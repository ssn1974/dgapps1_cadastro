import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSucessComponent } from './dialog-sucess.component';

describe('DialogSucessComponent', () => {
  let component: DialogSucessComponent;
  let fixture: ComponentFixture<DialogSucessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSucessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
