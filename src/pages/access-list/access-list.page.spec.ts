import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessListPage } from './access-list.page';

describe('AccessListPage', () => {
  let component: AccessListPage;
  let fixture: ComponentFixture<AccessListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
