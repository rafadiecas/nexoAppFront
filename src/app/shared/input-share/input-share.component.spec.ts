import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputShareComponent } from './input-share.component';

describe('InputShareComponent', () => {
  let component: InputShareComponent;
  let fixture: ComponentFixture<InputShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputShareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
