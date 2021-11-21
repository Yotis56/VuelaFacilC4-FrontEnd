import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVuelosComponent } from './agregar-vuelos.component';

describe('AgregarVuelosComponent', () => {
  let component: AgregarVuelosComponent;
  let fixture: ComponentFixture<AgregarVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
