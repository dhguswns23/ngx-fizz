import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizCheckComponent } from './fiz-check.component';

describe('FizCheckComponent', () => {
  let component: FizCheckComponent;
  let fixture: ComponentFixture<FizCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
