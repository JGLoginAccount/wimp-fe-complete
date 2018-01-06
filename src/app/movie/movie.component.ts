import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  animations: [fadeInAnimation],
})
export class MovieComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  movies: any[];

  constructor (private dataService: DataService, public dialog: MatDialog) {}

  getMovies() {
    this.dataService.getRecords("movies")
      .subscribe(
        movies => this.movies = movies,
        error =>  this.errorMessage = <any>error);
  }

  deleteMovie(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("movies", id)
          .subscribe(
            movie => {
              this.successMessage = "Record(s) deleted successfully"; 
              this.getMovies(); 
            },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

  ngOnInit() { 
    this.getMovies(); 
  }

}
