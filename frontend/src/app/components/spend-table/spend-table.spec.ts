import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendTable } from './spend-table';

describe('SpendTable', () => {
  let component: SpendTable;
  let fixture: ComponentFixture<SpendTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
