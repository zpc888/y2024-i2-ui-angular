import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragGuestHeaderComponent } from './frag-guest-header.component';

describe('FragGuestHeaderComponent', () => {
  let component: FragGuestHeaderComponent;
  let fixture: ComponentFixture<FragGuestHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FragGuestHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FragGuestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
