import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizOutComponent } from './fiz-out.component';

describe('FizOutComponent', () => {
  let component: FizOutComponent;
  let fixture: ComponentFixture<FizOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
