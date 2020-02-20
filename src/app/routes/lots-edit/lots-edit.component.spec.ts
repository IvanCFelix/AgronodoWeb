import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsEditComponent } from './lots-edit.component';

describe('LotsEditComponent', () => {
  let component: LotsEditComponent;
  let fixture: ComponentFixture<LotsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
