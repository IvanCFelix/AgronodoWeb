import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroindustriasAgronodoComponent } from './agroindustrias-agronodo.component';

describe('AgroindustriasAgronodoComponent', () => {
  let component: AgroindustriasAgronodoComponent;
  let fixture: ComponentFixture<AgroindustriasAgronodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgroindustriasAgronodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroindustriasAgronodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
