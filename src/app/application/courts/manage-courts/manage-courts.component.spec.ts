import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCourtsComponent } from './manage-courts.component';

describe('ManageCourtsComponent', () => {
  let component: ManageCourtsComponent;
  let fixture: ComponentFixture<ManageCourtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCourtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
