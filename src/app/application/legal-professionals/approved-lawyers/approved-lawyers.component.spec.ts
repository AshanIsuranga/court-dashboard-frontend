import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedLawyersComponent } from './approved-lawyers.component';

describe('ApprovedLawyersComponent', () => {
  let component: ApprovedLawyersComponent;
  let fixture: ComponentFixture<ApprovedLawyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedLawyersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
