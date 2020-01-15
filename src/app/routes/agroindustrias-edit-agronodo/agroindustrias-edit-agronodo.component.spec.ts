import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroindustriasEditAgronodoComponent } from './agroindustrias-edit-agronodo.component';

describe('AgroindustriasEditAgronodoComponent', () => {
  let component: AgroindustriasEditAgronodoComponent;
  let fixture: ComponentFixture<AgroindustriasEditAgronodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgroindustriasEditAgronodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroindustriasEditAgronodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
