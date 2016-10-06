import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';
import { AngularFireModule } from 'angularfire2';

import { AppComponent }         from './components/app.component';
import { DashboardComponent }   from './components/dashboard.component';
import { HeroDetailComponent }  from './components/hero-detail.component';
import { HeroesComponent }      from './components/heroes.component';
import { HeroSearchComponent }  from './components/hero-search.component';
import { HeroService }          from './services/hero.service';

import { routing } from './app.routing';
import './rxjs-extensions';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyBrZxk4lE2fTbElpdCCDaixdy50scz1xec',
  authDomain: 'test-9c386.firebaseapp.com',
  databaseURL: 's://test-9c386.firebaseio.com',
  storageBucket: 'test-9c386.appspot.com'
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }