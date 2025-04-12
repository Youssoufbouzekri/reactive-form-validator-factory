import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfvfComponent } from './rfvf.component';

describe('RfvfComponent', () => {
  let component: RfvfComponent;
  let fixture: ComponentFixture<RfvfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RfvfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfvfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
