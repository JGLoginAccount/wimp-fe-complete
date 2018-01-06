import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-award-form',
  templateUrl: './award-form.component.html',
  styleUrls: ['./award-form.component.css'],
  animations: [fadeInAnimation],
})
export class AwardFormComponent implements OnInit {

  

  awardForm: NgForm;
  @ViewChild('awardForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  award: object;
  actorid;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("awards", +params['id']))
      .subscribe(award => this.award = award);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (this.actorid=+params['id'])
        
      });
      console.log(this.actorid)
  }

  saveAward(awardForm: NgForm){
      this.dataService.addRecord("actors/"+ this.actorid+"/awards", awardForm.value)
          .subscribe(
            student => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.award = {};
            this.awardForm.form.markAsPristine();

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.awardForm = this.currentForm;
    this.awardForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.awardForm.form;

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
    'title': '',
    'organization': ''
  };

  validationMessages = {
    'title': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Namecannot be more than 30 characters long.'
    },
    'organization': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Namecannot be more than 30 characters long.'
    }
  };
}
