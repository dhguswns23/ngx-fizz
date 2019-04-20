import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizzComponent } from './fizz.component';

describe('FizzComponent', () => {
  let component: FizzComponent;
  let fixture: ComponentFixture<FizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
