import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDPO_JjgTPTfXyRFktzo3owNv2n6wjybiw",
      authDomain: "ng-sales-log.firebaseapp.com",
      databaseURL: "https://ng-sales-log.firebaseio.com",
      // projectId: "ng-sales-log",
      // storageBucket: "ng-sales-log.appspot.com",
      // messagingSenderId: "242729045063"
      });
  }

}
