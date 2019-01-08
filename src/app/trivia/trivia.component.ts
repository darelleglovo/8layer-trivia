import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTriviaModal } from '../modals/add-trivia-modal/add-trivia-modal.component'

import { Trivia } from './trivia.model';
import { Subscription } from 'rxjs';

import { TriviaCrudService } from '../trivia-crud.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit, OnDestroy {

  trivias: Trivia[] = [];
  private triviaSub: Subscription;

  constructor(private addTrivia: MatDialog, public triviaService: TriviaCrudService) { }
  
  openDialog(){
    let dialogBoxSettings = {
      width: '900px',
      margin: '0 auto',
      hasBackdrop: true,
    };
    this.addTrivia.open(AddTriviaModal, dialogBoxSettings);
  }

  onDelete(triviaId: string){
    this.triviaService.deletePost(triviaId);
  }

  ngOnInit() {
    this.triviaService.getPosts();
    this.triviaSub = this.triviaService.getTriviaUpdateListener()
    .subscribe((trivias: Trivia[]) => {
      this.trivias = trivias;
    });
  }

  ngOnDestroy() {
    this.triviaSub.unsubscribe();
  }


}
