import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

import { TriviaCrudService } from '../../trivia-crud.service'
import { NgForm } from '@angular/forms';

export interface Choices {
  name: string;
}

@Component({
  selector: 'app-add-trivia',
  templateUrl: './add-trivia-modal.component.html'
})
export class AddTriviaModal implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  choices: string[] = [];

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
  
  onAddTrivia(form: NgForm){
    if (form.invalid){
      return;
    }
    if (this.choices.length != 4){
      alert('Answer choices should be only 4');
      return;
    }
    this.triviaCrudService.addTrivia(form.value.title, form.value.question, form.value.category, this.choices, form.value.correct_answer, form.value.triviaProp);
    this.choices = [];
    form.resetForm();
  }

  ngOnInit() {
    
  }

}
