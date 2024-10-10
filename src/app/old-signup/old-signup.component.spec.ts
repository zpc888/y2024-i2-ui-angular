import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldSignupComponent } from './old-signup.component';

describe('SignupComponent', () => {
  let component: OldSignupComponent;
  let fixture: ComponentFixture<OldSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
