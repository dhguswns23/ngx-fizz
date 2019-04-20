import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizChevronRightComponent } from './fiz-chevron-right.component';

describe('FizChevronRightComponent', () => {
  let component: FizChevronRightComponent;
  let fixture: ComponentFixture<FizChevronRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizChevronRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizChevronRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
