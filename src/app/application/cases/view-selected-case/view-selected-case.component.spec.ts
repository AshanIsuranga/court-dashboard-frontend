import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedCaseComponent } from './view-selected-case.component';

describe('ViewSelectedCaseComponent', () => {
  let component: ViewSelectedCaseComponent;
  let fixture: ComponentFixture<ViewSelectedCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSelectedCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSelectedCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
