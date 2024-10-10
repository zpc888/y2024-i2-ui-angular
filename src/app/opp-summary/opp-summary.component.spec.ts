import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppSummaryComponent } from './opp-summary.component';

describe('OppSummaryComponent', () => {
  let component: OppSummaryComponent;
  let fixture: ComponentFixture<OppSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OppSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OppSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
