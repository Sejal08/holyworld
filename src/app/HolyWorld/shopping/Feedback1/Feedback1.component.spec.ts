/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Feedback1Component } from './Feedback1.component';

describe('Feedback1Component', () => {
  let component: Feedback1Component;
  let fixture: ComponentFixture<Feedback1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Feedback1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Feedback1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
