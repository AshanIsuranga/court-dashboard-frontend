import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLegalProfessionalsComponent } from './pending-legal-professionals.component';

describe('PendingLegalProfessionalsComponent', () => {
  let component: PendingLegalProfessionalsComponent;
  let fixture: ComponentFixture<PendingLegalProfessionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingLegalProfessionalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingLegalProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
