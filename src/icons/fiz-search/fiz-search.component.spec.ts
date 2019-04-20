import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizSearchComponent } from './fiz-search.component';

describe('FizSearchComponent', () => {
  let component: FizSearchComponent;
  let fixture: ComponentFixture<FizSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
