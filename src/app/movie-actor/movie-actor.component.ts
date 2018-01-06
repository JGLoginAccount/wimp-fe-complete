import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-movie-actor',
  templateUrl: './movie-actor.component.html',
  styleUrls: ['./movie-actor.component.css'],
  animations: [fadeInAnimation],
})
export class MovieActorComponent implements OnInit {


  movieActorForm: NgForm;
  @ViewChild('movieActorForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  movieId: number;

  actorId: number;



  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}




  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.movieId=+params['id']: null;
      });
  }

  saveActorToMovie(movieActorForm: NgForm){
    console.log("movies/"+this.movieId+"/actors", movieActorForm.value);
      this.dataService.addRecord("movies/"+this.movieId+"/actors", movieActorForm.value)
          .subscribe(
            result => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.movieActorForm.form.markAsPristine();
    }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.movieActorForm = this.currentForm;
    this.movieActorForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.movieActorForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
  };

  validationMessages = {
  };

}
