import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragLayoutComponent } from './frag-layout.component';

describe('LayoutMainComponent', () => {
  let component: FragLayoutComponent;
  let fixture: ComponentFixture<FragLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FragLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
