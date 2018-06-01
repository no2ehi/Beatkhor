import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGenreComponent } from './panel-genre.component';

describe('PanelGenreComponent', () => {
  let component: PanelGenreComponent;
  let fixture: ComponentFixture<PanelGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
