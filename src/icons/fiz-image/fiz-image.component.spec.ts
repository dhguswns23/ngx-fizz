import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizImageComponent } from './fiz-image.component';

describe('FizImageComponent', () => {
  let component: FizImageComponent;
  let fixture: ComponentFixture<FizImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
