import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSortBtnComponent } from './custom-sort-btn.component';

describe('CustomSortBtnComponent', () => {
  let component: CustomSortBtnComponent;
  let fixture: ComponentFixture<CustomSortBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSortBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSortBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
