import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainService } from './../../../../services/main.service';
import { DeleteGenreDialogComponent } from '../delete-genre-dialog/delete-genre-dialog.component';
import { EditGenreDialogComponent } from '../edit-genre-dialog/edit-genre-dialog.component';

@Component({
  selector: 'app-display-genres',
  templateUrl: './display-genres.component.html',
  styleUrls: ['./display-genres.component.scss']
})
export class DisplayGenresComponent implements OnInit {

  @Input() public genres;
  @Input() public loading;
  @Input() public error;
  @Output() public refresh = new EventEmitter();


  constructor(
    private mainService: MainService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  /**
    * @description emits an event to refresh genre data
    */

  refreshData() {
    this.refresh.emit();
  }

  /**
   * @description Changes the hover state of the category to show the menu
   * @param {object} value 
   */
  toggleHover(value) {
    value.hover = !value.hover;
  }

  /**
   * @description Opens confirmation dialog to delete selected genre/genreGroup
   * @param {object} genre 
   */
  deleteGenre(genre) {
    const dialogRef = this.dialog.open(DeleteGenreDialogComponent, {
      width: '360px',
      data: genre
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refresh.emit();
      }
    });
  }

  /**
  * @description Opens edit dialog to edit selected genre/genreGroup
  * @param {object} genre 
  */
  editGenre(genre) {
    const dialogRef = this.dialog.open(EditGenreDialogComponent, {
      width: '320px',
      data: genre
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refresh.emit();
      }
    })
  }


}
