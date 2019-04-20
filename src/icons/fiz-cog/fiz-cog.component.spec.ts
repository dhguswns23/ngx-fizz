import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizCogComponent } from './fiz-cog.component';

describe('FizCogComponent', () => {
  let component: FizCogComponent;
  let fixture: ComponentFixture<FizCogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizCogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizCogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
