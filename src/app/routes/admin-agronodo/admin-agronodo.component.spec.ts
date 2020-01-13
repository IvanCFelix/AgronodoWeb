import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgronodoComponent } from './admin-agronodo.component';

describe('AdminAgronodoComponent', () => {
  let component: AdminAgronodoComponent;
  let fixture: ComponentFixture<AdminAgronodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAgronodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgronodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
