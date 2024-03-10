import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupExtraComponent } from './signup-extra.component';

describe('SignupExtraComponent', () => {
  let component: SignupExtraComponent;
  let fixture: ComponentFixture<SignupExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupExtraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
