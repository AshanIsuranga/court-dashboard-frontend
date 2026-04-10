import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientCaseConnectionsComponent } from './view-client-case-connections.component';

describe('ViewClientCaseConnectionsComponent', () => {
  let component: ViewClientCaseConnectionsComponent;
  let fixture: ComponentFixture<ViewClientCaseConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClientCaseConnectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientCaseConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
