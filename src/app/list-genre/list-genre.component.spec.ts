import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGenreComponent } from './list-genre.component';

describe('ListGenreComponent', () => {
  let component: ListGenreComponent;
  let fixture: ComponentFixture<ListGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
