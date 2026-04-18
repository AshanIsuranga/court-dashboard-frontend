import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreataClerkComponent } from './creata-clerk.component';

describe('CreataClerkComponent', () => {
  let component: CreataClerkComponent;
  let fixture: ComponentFixture<CreataClerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreataClerkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreataClerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
