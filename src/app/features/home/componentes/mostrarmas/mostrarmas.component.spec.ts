import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarmasComponent } from './mostrarmas.component';

describe('MostrarmasComponent', () => {
  let component: MostrarmasComponent;
  let fixture: ComponentFixture<MostrarmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarmasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
