import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraph } from './line-graph';

describe('LineGraph', () => {
  let component: LineGraph;
  let fixture: ComponentFixture<LineGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
