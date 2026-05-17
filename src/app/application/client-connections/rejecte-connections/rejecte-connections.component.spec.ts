import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejecteConnectionsComponent } from './rejecte-connections.component';

describe('RejecteConnectionsComponent', () => {
  let component: RejecteConnectionsComponent;
  let fixture: ComponentFixture<RejecteConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejecteConnectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejecteConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
