import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousForm } from './rendezvous-form';

describe('RendezvousForm', () => {
  let component: RendezvousForm;
  let fixture: ComponentFixture<RendezvousForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RendezvousForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
