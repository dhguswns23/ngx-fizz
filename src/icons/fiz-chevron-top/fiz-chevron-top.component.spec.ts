import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizChevronTopComponent } from './fiz-chevron-top.component';

describe('FizChevronTopComponent', () => {
  let component: FizChevronTopComponent;
  let fixture: ComponentFixture<FizChevronTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizChevronTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizChevronTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
