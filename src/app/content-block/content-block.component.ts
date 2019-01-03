import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent implements OnInit {
  arr:Array<number> = new Array(5);
  constructor() { }

  ngOnInit() {
  }

}
