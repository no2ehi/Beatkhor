import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGenreDialogComponent } from './delete-genre-dialog.component';

describe('DeleteGenreDialogComponent', () => {
  let component: DeleteGenreDialogComponent;
  let fixture: ComponentFixture<DeleteGenreDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteGenreDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
