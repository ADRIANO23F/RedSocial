import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionpublicacionComponent } from './creacionpublicacion.component';

describe('CreacionpublicacionComponent', () => {
  let component: CreacionpublicacionComponent;
  let fixture: ComponentFixture<CreacionpublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionpublicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionpublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
