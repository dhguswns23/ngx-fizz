import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizGitComponent } from './fiz-git.component';

describe('FizGitComponent', () => {
  let component: FizGitComponent;
  let fixture: ComponentFixture<FizGitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizGitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
