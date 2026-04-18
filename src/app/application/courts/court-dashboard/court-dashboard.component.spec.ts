import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtDashboardComponent } from './court-dashboard.component';

describe('CourtDashboardComponent', () => {
  let component: CourtDashboardComponent;
  let fixture: ComponentFixture<CourtDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
