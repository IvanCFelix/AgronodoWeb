import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgronodoComponent } from './home-agronodo.component';

describe('HomeAgronodoComponent', () => {
  let component: HomeAgronodoComponent;
  let fixture: ComponentFixture<HomeAgronodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAgronodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAgronodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
