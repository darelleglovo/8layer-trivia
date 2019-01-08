import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

import { TriviaCrudService } from '../../trivia-crud.service'
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

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

  add(event: MatChipInputEvent): void {
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
    if (this.form.invalid){
      return;
    }
    if (this.choices.length != 4){
      alert('Answer choices should be only 4');
      return;
    }
    this.triviaCrudService.addTrivia(this.form.value.title, this.form.value.question, this.form.value.category, this.choices, this.form.value.correct_answer, this.form.value.triviaProp);
    this.choices = [];
    this.form.reset();
    this.dialogRef.close();
    
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
    });
  }

}
