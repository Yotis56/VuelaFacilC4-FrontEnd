import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterprincipalComponent } from './footerprincipal.component';

describe('FooterprincipalComponent', () => {
  let component: FooterprincipalComponent;
  let fixture: ComponentFixture<FooterprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterprincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
