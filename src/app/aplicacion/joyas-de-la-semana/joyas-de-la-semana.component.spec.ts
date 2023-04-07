import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyasDeLaSemanaComponent } from './joyas-de-la-semana.component';

describe('JoyasDeLaSemanaComponent', () => {
  let component: JoyasDeLaSemanaComponent;
  let fixture: ComponentFixture<JoyasDeLaSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoyasDeLaSemanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoyasDeLaSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
