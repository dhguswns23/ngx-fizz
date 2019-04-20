import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizNewDocComponent } from './fiz-new-doc.component';

describe('FizNewDocComponent', () => {
  let component: FizNewDocComponent;
  let fixture: ComponentFixture<FizNewDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizNewDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizNewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
