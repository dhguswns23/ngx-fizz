import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizCrossComponent } from './fiz-cross.component';

describe('FizCrossComponent', () => {
  let component: FizCrossComponent;
  let fixture: ComponentFixture<FizCrossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizCrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
