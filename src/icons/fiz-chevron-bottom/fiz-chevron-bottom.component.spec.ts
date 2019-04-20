import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizChevronBottomComponent } from './fiz-chevron-bottom.component';

describe('FizChevronBottomComponent', () => {
  let component: FizChevronBottomComponent;
  let fixture: ComponentFixture<FizChevronBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizChevronBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizChevronBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
