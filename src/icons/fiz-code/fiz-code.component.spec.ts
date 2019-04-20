import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizCodeComponent } from './fiz-code.component';

describe('FizCodeComponent', () => {
  let component: FizCodeComponent;
  let fixture: ComponentFixture<FizCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
