import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinDetails } from './medecin-details';

describe('MedecinDetails', () => {
  let component: MedecinDetails;
  let fixture: ComponentFixture<MedecinDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(MedecinDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
