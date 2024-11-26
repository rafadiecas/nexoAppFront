import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaDialogComponent } from './edita-dialog.component';

describe('EditaDialogComponent', () => {
  let component: EditaDialogComponent;
  let fixture: ComponentFixture<EditaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
