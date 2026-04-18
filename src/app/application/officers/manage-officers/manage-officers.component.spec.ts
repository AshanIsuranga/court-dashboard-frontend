import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficersComponent } from './manage-officers.component';

describe('ManageOfficersComponent', () => {
  let component: ManageOfficersComponent;
  let fixture: ComponentFixture<ManageOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOfficersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
