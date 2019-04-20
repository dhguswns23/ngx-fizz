import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizEditDocComponent } from './fiz-edit-doc.component';

describe('FizEditDocComponent', () => {
  let component: FizEditDocComponent;
  let fixture: ComponentFixture<FizEditDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizEditDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizEditDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
