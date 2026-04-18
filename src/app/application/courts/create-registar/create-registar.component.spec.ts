import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegistarComponent } from './create-registar.component';

describe('CreateRegistarComponent', () => {
  let component: CreateRegistarComponent;
  let fixture: ComponentFixture<CreateRegistarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRegistarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegistarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
