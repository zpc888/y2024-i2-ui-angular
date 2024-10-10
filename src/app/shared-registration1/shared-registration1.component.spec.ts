import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRegistration1Component } from './shared-registration1.component';

describe('SharedRegistration1Component', () => {
  let component: SharedRegistration1Component;
  let fixture: ComponentFixture<SharedRegistration1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRegistration1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedRegistration1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
