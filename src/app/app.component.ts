import { Component } from '@angular/core';

declare function go():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animation-lesson';
  arr:Array<number> = new Array(5);
  ngOnInit() {
    this.arr[0] = 1;
    this.arr.push(Math.random());
    go();
  }
}
