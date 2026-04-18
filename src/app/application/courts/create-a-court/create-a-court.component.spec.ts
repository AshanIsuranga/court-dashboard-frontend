import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateACourtComponent } from './create-a-court.component';

describe('CreateACourtComponent', () => {
  let component: CreateACourtComponent;
  let fixture: ComponentFixture<CreateACourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateACourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateACourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
