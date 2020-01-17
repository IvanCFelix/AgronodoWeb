import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAgronodoComponent } from './admin-edit-agronodo.component';

describe('AdminEditAgronodoComponent', () => {
  let component: AdminEditAgronodoComponent;
  let fixture: ComponentFixture<AdminEditAgronodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditAgronodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditAgronodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
