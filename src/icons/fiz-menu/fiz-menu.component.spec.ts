import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizMenuComponent } from './fiz-menu.component';

describe('FizMenuComponent', () => {
  let component: FizMenuComponent;
  let fixture: ComponentFixture<FizMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
