import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../entity/hero';
import { HeroService } from '../services/hero.service';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: '../../views/dashboard.component.html',
  //styleUrls: [ '../../css/dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  heroes: FirebaseObjectObservable<any>;

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}