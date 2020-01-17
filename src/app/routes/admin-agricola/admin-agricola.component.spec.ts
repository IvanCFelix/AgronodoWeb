import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgricolaComponent } from './admin-agricola.component';

describe('AdminAgricolaComponent', () => {
  let component: AdminAgricolaComponent;
  let fixture: ComponentFixture<AdminAgricolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAgricolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
