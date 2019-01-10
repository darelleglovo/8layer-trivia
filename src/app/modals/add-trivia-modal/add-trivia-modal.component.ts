import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

import { TriviaCrudService } from '../../trivia-crud.service'
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { mimeType } from "./mime-type.validator"
import { Moment } from 'moment';

export interface Choices {
  name: string;
}

@Component({
  selector: 'app-add-trivia',
  templateUrl: './add-trivia-modal.component.html',
  styleUrls: ['./add-trivia-modal.component.css']
})
export class AddTriviaModal implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  choices: string[] = [];
  form: FormGroup;
  imagePreview: any;
  selected: {startDate: Moment, endDate: Moment};
  // blast_day = "";
  // blast_hour = this.form.value.blast_hour || "";
  // blast_date_from = "";
  // blast_date_to = "";

  add(event: MatChipInputEvent): void { // add choice
    const input = event.input;
    const value = event.value;

    // Add our trivia
    if ((value || '').trim()) {
      var isPresent = this.choices.some(function(choice){ return choice.toUpperCase() === value.toUpperCase()});
      if (isPresent){
        return;
      }
      this.choices.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(choices: string): void {
    const index = this.choices.indexOf(choices);

    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }
    constructor(
        public dialogRef: MatDialogRef<AddTriviaModal>,
        public triviaCrudService: TriviaCrudService
      ) { }
  
  onAddTrivia(){
    // console.log(this.form.value.blast_hour);
    // console.log(this.blast_hour);
    // console.log(this.blast_date_from);
    // console.log(this.blast_date_to);
    if (this.form.invalid){
      return;
    }
    if (this.choices.length != 4){
      alert('Answer choices should be only 4');
      return;
    }
    const blast_date_from = this.form.value.blast_date_range.startDate.format("MM-DD-YYYY");
    const blast_date_to = this.form.value.blast_date_range.endDate.format("MM-DD-YYYY");
    console.log(this.choices);
    this.triviaCrudService.addTrivia(
      this.capsFirstLetter(this.form.value.title), 
      this.capsFirstLetter(this.form.value.question), 
      this.form.value.category, 
      this.choices, 
      this.form.value.correct_answer, 
      this.capsFirstLetter(this.form.value.triviaProp), 
      this.form.value.image,
      this.form.value.blast_day,
      this.form.value.blast_hour,
      blast_date_from,
      blast_date_to
      );
    console.log(this.form);
    this.choices = [];
    this.form.reset();
    this.dialogRef.close();
    
  }

  capsFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
     console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'category': new FormControl(null, {
        validators: [Validators.required]
      }),
      'question': new FormControl(null, {
        validators: [Validators.required]
      }),
      'correct_answer': new FormControl(null, {
        validators: [Validators.required]
      }),
      'triviaProp': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: mimeType
      }),
      'blast_day': new FormControl(null, {
        validators: [Validators.required]
      }),
      'blast_hour': new FormControl(null, {
        validators: [Validators.required]
      }),
      'blast_date_range': new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }

}
