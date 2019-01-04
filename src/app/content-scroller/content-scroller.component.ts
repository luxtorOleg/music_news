import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-scroller',
  templateUrl: './content-scroller.component.html',
  styleUrls: ['./content-scroller.component.scss']
})
export class ContentScrollerComponent implements OnInit {

  arr:Array<number> = new Array(5);
  constructor() { }

  ngOnInit() {
    this.arr[0] = 1;
    this.arr.push(Math.random());
  }

}
