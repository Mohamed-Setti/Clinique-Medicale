import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousDetails } from './rendezvous-details';

describe('RendezvousDetails', () => {
  let component: RendezvousDetails;
  let fixture: ComponentFixture<RendezvousDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(RendezvousDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
