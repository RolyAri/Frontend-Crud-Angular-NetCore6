import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEditDptoComponent } from './dialog-add-edit-dpto.component';

describe('DialogAddEditDptoComponent', () => {
  let component: DialogAddEditDptoComponent;
  let fixture: ComponentFixture<DialogAddEditDptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddEditDptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEditDptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
