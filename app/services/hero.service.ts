import { Hero } from '../entity/hero';
import { HEROES } from '../entity/mock-heroes';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()

export class HeroService {

  af = null;

  constructor(private http: Http, af: AngularFire) { 
    this.af = af;
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      //.then(heroes => heroes.find(hero => hero.id === id))
      .then(heroes => this.af.database.list('/heroes')
        .subscribe(items => items.map(hero => 
          {
            if(hero.id === id){
              return hero;
            } 
          }
        ))
      );
  }

  private heroesUrl = 'app/heroes';  // URL to web api

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
     .toPromise()
     .then(response => this.af.database.list("/heroes") as Hero[])
     .catch(this.handleError);
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}