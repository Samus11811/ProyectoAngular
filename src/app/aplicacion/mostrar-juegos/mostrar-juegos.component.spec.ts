import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarJuegosComponent } from './mostrar-juegos.component';

describe('MostrarJuegosComponent', () => {
  let component: MostrarJuegosComponent;
  let fixture: ComponentFixture<MostrarJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
