import { Component } from '@angular/core';

declare function go():any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animation-lesson';
  ngOnInit() {
    go();
  }
}
