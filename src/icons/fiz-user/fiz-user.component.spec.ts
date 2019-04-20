import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizUserComponent } from './fiz-user.component';

describe('FizUserComponent', () => {
  let component: FizUserComponent;
  let fixture: ComponentFixture<FizUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
