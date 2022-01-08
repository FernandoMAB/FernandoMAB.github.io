import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovRecomComponent } from './mov-recom.component';

describe('MovRecomComponent', () => {
  let component: MovRecomComponent;
  let fixture: ComponentFixture<MovRecomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovRecomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovRecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
