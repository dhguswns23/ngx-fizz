import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizTrashBinComponent } from './fiz-trash-bin.component';

describe('FizTrashBinComponent', () => {
  let component: FizTrashBinComponent;
  let fixture: ComponentFixture<FizTrashBinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizTrashBinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizTrashBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
