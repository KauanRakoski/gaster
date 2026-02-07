import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Doughnut } from './doughnut';

describe('Doughnut', () => {
  let component: Doughnut;
  let fixture: ComponentFixture<Doughnut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Doughnut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Doughnut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
