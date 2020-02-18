import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngAgricolaComponent } from './admin-ing-agricola.component';

describe('AdminIngAgricolaComponent', () => {
  let component: AdminIngAgricolaComponent;
  let fixture: ComponentFixture<AdminIngAgricolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIngAgricolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIngAgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
