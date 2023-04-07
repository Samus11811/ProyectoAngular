import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderJuegosOfertadosComponent } from './slider-juegos-ofertados.component';

describe('SliderJuegosOfertadosComponent', () => {
  let component: SliderJuegosOfertadosComponent;
  let fixture: ComponentFixture<SliderJuegosOfertadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderJuegosOfertadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderJuegosOfertadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
