import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtOfficersComponent } from './court-officers.component';

describe('CourtOfficersComponent', () => {
  let component: CourtOfficersComponent;
  let fixture: ComponentFixture<CourtOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtOfficersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
