import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizLockerComponent } from './fiz-locker.component';

describe('FizLockerComponent', () => {
  let component: FizLockerComponent;
  let fixture: ComponentFixture<FizLockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizLockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
