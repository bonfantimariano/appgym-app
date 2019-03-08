import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModalPage } from './activity-modal.page';

describe('ActivityModalPage', () => {
  let component: ActivityModalPage;
  let fixture: ComponentFixture<ActivityModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
