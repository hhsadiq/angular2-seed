import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/map';


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'rxjs.component.html',
  styleUrls: ['rxjs.component.css'],
})

export class RxjsComponent implements OnInit {

  newName: string = '';
  textContent: string = 'Double click it';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    // this.clickThrottle();
    this.getNames();
  }

  /**
   * To show the real power of Reactive, let's just say that you want to have
   * a stream of "double click" events. To make it even more interesting, let's
   * say we want the new stream to consider triple clicks as double clicks, or
   * in general, multiple clicks (two or more).
   */
  clickThrottle() {
    let button = document.querySelector('.click-throttle');
    let clickStream = Observable.fromEvent(button, 'click');
    // The 4 lines of code that make the multi-click logic
    let multiClickStream = clickStream
      .buffer(() => clickStream.throttleTime(250))
      .map((list:any) => list.length)
      .filter((x:any) => x >= 2);

    // Same as above, but detects single clicks
    let singleClickStream = clickStream
      .buffer(() => clickStream.throttleTime(250))
      .map((list:any) => list.length)
      .filter((x:any) => x === 1);

    // Listen to both streams and render the text label accordingly
    singleClickStream.subscribe((event:any) => this.textContent = 'click');
    multiClickStream.subscribe((numclicks:any) => this.textContent = ''+numclicks+'x click');
    Observable.merge(singleClickStream, multiClickStream)
      .throttleTime(1000)
      .subscribe((suggestion:any) => this.textContent = '');
  }
  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error =>  this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
