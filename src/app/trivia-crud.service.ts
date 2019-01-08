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

  getPosts() {
    this.http
    .get<{message: string, trivias: any}>(
      'http://localhost:3000/api/trivias'
      ) // ^ yung data na makukuha mo dito i map mo dito sa baba.. v name it "postData"
      .pipe(map(triviaData => { // map/grab whole post data which has "message"-string and "posts-"object, name it "postData"
        return triviaData.trivias.map(trivia => { // now get the "posts"-object from postData and name it "post". (disregarding "message"-string)
          return { // get all "post" from postData.posts then transform it. (mainly from "_id" to "id")
            title: trivia.title,
            question: trivia.question,
            category: trivia.category,
            choices: trivia.choices,
            correct_answer: trivia.correct_answer,
            triviaProp: trivia.triviaProp,
            id: trivia._id
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


  // addPost(title: string, content: string) {
  //   const post: Post = { id: null, title: title, content: content };
  //   this.http
  //     .post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
  //     .subscribe(
  //       responseData => { // <- success handler
  //         console.log(responseData.message);
  //         const id = responseData.postId;
  //         // <-- execute this when recieved a success response -->
  //         post.id = id;  // update the id of "post" which is currently null
  //         this.posts.push(post); // push new data to Post array
  //         this.postsUpdated.next([...this.posts]); // like emmit
  //         // <-- --------------------------------------------- -->
  //       });
  //       // <{message: string}> gets some data back, will get a message with a type of string
  //       // 2nd argument 'post' = the data that will be POST
  //       // nothing will happen if we don't subscribe
  //       // les 2 - lec 11

  // }

  addTrivia(title: string, question: string, category: string, choices: string[], correct_answer: string, triviaProp: string){
    const trivia: Trivia = { id: null, title: title, question: question, category: category, choices: choices, correct_answer: correct_answer, triviaProp: triviaProp }
    //alert(trivia.title + trivia.question + trivia.category + trivia.choices);
    console.log(trivia);
    console.log("trivia hi");

    this.http
      .post<{message: string, triviaId: string}>('http://localhost:3000/api/trivias', trivia)
      .subscribe(
        responseData => { // <- success handler
          console.log(responseData.message);
          const id = responseData.triviaId;
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