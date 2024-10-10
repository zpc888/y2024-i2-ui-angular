import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppSearchResultComponent } from './opp-search-result.component';

describe('OppSearchResultComponent', () => {
  let component: OppSearchResultComponent;
  let fixture: ComponentFixture<OppSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OppSearchResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OppSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
