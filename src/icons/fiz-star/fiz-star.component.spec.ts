import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizStarComponent } from './fiz-star.component';

describe('FizStarComponent', () => {
  let component: FizStarComponent;
  let fixture: ComponentFixture<FizStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
