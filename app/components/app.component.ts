import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-app',
  templateUrl: '../../views/app.component.html',
  //styleUrls: [ '../../css/app.component.css'],
})

export class AppComponent {
  title = 'Tour of Heroes';

  constructor(af: AngularFire) {

  }
}