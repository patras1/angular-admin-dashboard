import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsPage } from './flags-page';

describe('FlagsPage', () => {
  let component: FlagsPage;
  let fixture: ComponentFixture<FlagsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
