import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatsComponent } from './pats.component';

describe('PatsComponent', () => {
  let component: PatsComponent;
  let fixture: ComponentFixture<PatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
