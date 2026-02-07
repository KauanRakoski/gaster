import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHeader } from './landing-header';

describe('LandingHeader', () => {
  let component: LandingHeader;
  let fixture: ComponentFixture<LandingHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
