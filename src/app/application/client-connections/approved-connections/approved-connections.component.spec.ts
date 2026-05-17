import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedConnectionsComponent } from './approved-connections.component';

describe('ApprovedConnectionsComponent', () => {
  let component: ApprovedConnectionsComponent;
  let fixture: ComponentFixture<ApprovedConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedConnectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
