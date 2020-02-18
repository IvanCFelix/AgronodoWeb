import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgricolaComponent } from './home-agricola.component';

describe('HomeAgricolaComponent', () => {
  let component: HomeAgricolaComponent;
  let fixture: ComponentFixture<HomeAgricolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAgricolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
