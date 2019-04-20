import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizChevronLeftComponent } from './fiz-chevron-left.component';

describe('FizChevronLeftComponent', () => {
  let component: FizChevronLeftComponent;
  let fixture: ComponentFixture<FizChevronLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizChevronLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizChevronLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
