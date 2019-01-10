import { Injectable, ContentChild } from '@angular/core';
import { Subject } from 'rxjs'; // broader EventEmitter
import { map } from 'rxjs/operators'

import { Trivia } from './trivia/trivia.model';


import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Choices } from './modals/add-trivia-modal/add-trivia-modal.component';

@Injectable({
  providedIn: 'root'
})
export class TriviaCrudService {
  private trivias = [];
  private triviasUpdated = new Subject<Trivia[]>(); // list of 'Post' type // property name should sounds like event
  constructor(private http: HttpClient) { }

  getTrivias() {
    this.http
    .get<{message: string, trivias: any}>(
      'http://localhost:3000/api/trivias'
      ) // ^ yung data na makukuha mo dito i map mo dito sa baba.. v name it "postData"
      .pipe(map(triviaData => { // map/grab whole post data which has "message"-string and "posts-"object, name it "postData"
        return triviaData.trivias.map(trivia => { // now get the "posts"-object from postData and name it "post". (disregarding "message"-string)
          console.log(trivia.choices);
          return { // get all "post" from postData.posts then transform it. (mainly from "_id" to "id")
            title: trivia.title,
            question: trivia.question,
            category: trivia.category,
            choices: trivia.choices,
            correct_answer: trivia.correct_answer,
            triviaProp: trivia.triviaProp,
            id: trivia._id,
            imagePath: trivia.imagePath
          }
        });
      })) // yung data na naprocess dito, subscribe mo sa baba then name it "transformedPosts"
      .subscribe(transformedTrivias => {
        this.trivias = transformedTrivias
        this.triviasUpdated.next([...this.trivias]); //emmit on this class only, ( then read getPostUpdateListener()'s comment)
       });
  }

  getTriviaUpdateListener(){
    return this.triviasUpdated.asObservable(); // make this 'subject' available to other components then subscribe
  }

  addTrivia(title: string, question: string, category: string, choices: string[], correct_answer: string, triviaProp: string, image: File, blast_day: string, blast_hour: string, blast_from: string, blast_to: string){
    //const trivia: Trivia = { id: null, title: title, question: question, category: category, choices: choices, correct_answer: correct_answer, triviaProp: triviaProp }
    const triviaData = new FormData();
    triviaData.append("title", title);
    triviaData.append("question", question);
    triviaData.append("category", category);
    triviaData.append("choices", JSON.stringify(choices));
    // triviaData.append("choices", choices);  DONT INCLUDE ARRAY
    triviaData.append("correct_answer", correct_answer);
    triviaData.append("triviaProp", triviaProp);
    triviaData.append("image", image, title);
    triviaData.append("blast_day", blast_day);
    triviaData.append("blast_hour", blast_hour);
    triviaData.append("blast_from", blast_from);
    triviaData.append("blast_to", blast_to);

    // console.log(trivia);
    // console.log("trivia hi");

    this.http
      .post<{message: string, trivia: Trivia}>('http://localhost:3000/api/trivias', triviaData)
      .subscribe(
        responseData => { // <- success handler
          console.log(responseData.message);

          const trivia: Trivia = {
            id: responseData.trivia.id, 
            title: title, 
            question: question, 
            category: category, 
            choices: choices, 
            correct_answer: correct_answer, 
            triviaProp: triviaProp,
            imagePath: responseData.trivia.imagePath,
            blast_day: blast_day,
            blast_hour: blast_hour,
            blast_from: blast_from,
            blast_to: blast_to
          };
          const id = responseData.trivia.id;
          console.log(id);
          // <-- execute this when recieved a success response -->
          trivia.id = id;  // update the id of "post" which is currently null
          this.trivias.push(trivia); // push new data to Post array
          this.triviasUpdated.next([...this.trivias]); // like emmit
          // <-- --------------------------------------------- -->
          console.log([...this.trivias]);
          console.log("hello");
        });
        // <{message: string}> gets some data back, will get a message with a type of string
        // 2nd argument 'post' = the data that will be POST
        // nothing will happen if we don't subscribe
        // les 2 - lec 11

  }

  deletePost(triviaId: string){
    this.http.delete("http://localhost:3000/api/trivias/" + triviaId)
    .subscribe(() => {
      //console.log("Deleted..");
      const updatedTrivias = this.trivias.filter(trivia => trivia.id !== triviaId);
      this.trivias = updatedTrivias;
      this.triviasUpdated.next([...this.trivias]);
    });
  }
}
