import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getImgPolaroid(event: any) {
    let el = event.target;
    console.log(el.src);
  }
}
