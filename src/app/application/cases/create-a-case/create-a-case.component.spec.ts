import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateACaseComponent } from './create-a-case.component';

describe('CreateACaseComponent', () => {
  let component: CreateACaseComponent;
  let fixture: ComponentFixture<CreateACaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateACaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateACaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
