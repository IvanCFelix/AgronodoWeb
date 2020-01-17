import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricolaEditComponent } from './agricola-edit.component';

describe('AgricolaEditComponent', () => {
  let component: AgricolaEditComponent;
  let fixture: ComponentFixture<AgricolaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgricolaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgricolaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
