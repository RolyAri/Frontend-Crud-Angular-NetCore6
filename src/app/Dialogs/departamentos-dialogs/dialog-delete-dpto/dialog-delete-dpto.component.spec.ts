import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteDptoComponent } from './dialog-delete-dpto.component';

describe('DialogDeleteDptoComponent', () => {
  let component: DialogDeleteDptoComponent;
  let fixture: ComponentFixture<DialogDeleteDptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteDptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteDptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
