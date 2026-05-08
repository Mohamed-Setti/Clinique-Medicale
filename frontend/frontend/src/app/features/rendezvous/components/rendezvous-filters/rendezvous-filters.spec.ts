import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousFilters } from './rendezvous-filters';

describe('RendezvousFilters', () => {
  let component: RendezvousFilters;
  let fixture: ComponentFixture<RendezvousFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(RendezvousFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
