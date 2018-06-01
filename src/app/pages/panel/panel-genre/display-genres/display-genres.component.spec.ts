import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGenresComponent } from './display-genres.component';

describe('DisplayGenresComponent', () => {
  let component: DisplayGenresComponent;
  let fixture: ComponentFixture<DisplayGenresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayGenresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
