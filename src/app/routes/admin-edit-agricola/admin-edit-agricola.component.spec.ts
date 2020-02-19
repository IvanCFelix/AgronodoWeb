import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAgricolaComponent } from './admin-edit-agricola.component';

describe('AdminEditAgricolaComponent', () => {
  let component: AdminEditAgricolaComponent;
  let fixture: ComponentFixture<AdminEditAgricolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditAgricolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditAgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
