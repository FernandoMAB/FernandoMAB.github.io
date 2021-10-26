import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActorsComponent } from './list-actors.component';

describe('ListActorsComponent', () => {
  let component: ListActorsComponent;
  let fixture: ComponentFixture<ListActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
