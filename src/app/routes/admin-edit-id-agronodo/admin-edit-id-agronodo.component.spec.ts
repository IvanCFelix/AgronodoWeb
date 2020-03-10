import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditIDAgronodoComponent } from './admin-edit-id-agronodo.component';

describe('AdminEditIDAgronodoComponent', () => {
  let component: AdminEditIDAgronodoComponent;
  let fixture: ComponentFixture<AdminEditIDAgronodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditIDAgronodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditIDAgronodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
