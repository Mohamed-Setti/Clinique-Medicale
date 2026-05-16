import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousList } from './rendezvous-list';
import { RendezVousService } from '../../services/rendezvous.service';

describe('RendezVousList', () => {
  let component: RendezVousList;
  let fixture: ComponentFixture<RendezVousList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousList],
    }).compileComponents();

    fixture = TestBed.createComponent(RendezVousList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
