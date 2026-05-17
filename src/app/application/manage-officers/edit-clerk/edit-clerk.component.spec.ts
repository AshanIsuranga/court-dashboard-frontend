import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClerkComponent } from './edit-clerk.component';

describe('EditClerkComponent', () => {
  let component: EditClerkComponent;
  let fixture: ComponentFixture<EditClerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClerkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
