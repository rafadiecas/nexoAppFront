import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteIzquierdaCivilComponent } from './parte-izquierda-civil.component';

describe('ParteIzquierdaCivilComponent', () => {
  let component: ParteIzquierdaCivilComponent;
  let fixture: ComponentFixture<ParteIzquierdaCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParteIzquierdaCivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteIzquierdaCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
