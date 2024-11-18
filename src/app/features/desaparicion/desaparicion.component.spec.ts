import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaparicionComponent } from './desaparicion.component';

describe('DesaparicionComponent', () => {
  let component: DesaparicionComponent;
  let fixture: ComponentFixture<DesaparicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesaparicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesaparicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
