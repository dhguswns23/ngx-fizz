import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizHeartComponent } from './fiz-heart.component';

describe('FizHeartComponent', () => {
  let component: FizHeartComponent;
  let fixture: ComponentFixture<FizHeartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizHeartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
