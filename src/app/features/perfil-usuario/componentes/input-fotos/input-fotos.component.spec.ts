import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFotosComponent } from './input-fotos.component';

describe('InputFotosComponent', () => {
  let component: InputFotosComponent;
  let fixture: ComponentFixture<InputFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
