import { Component, OnInit } from '@angular/core';

interface ITextProp {
  fill: string;
  text: string;
  fontSize: number;
  fontWeight: boolean;
  fontStyle: boolean;
  fontFamily: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  props: ITextProp;

  constructor() {
    this.props = {
      fill: '#000000',
      text: 'sample text',
      fontSize: 26,
      fontWeight: false,
      fontStyle: false,
      fontFamily: 'helvetica',
    };
  }

  ngOnInit() {}

  setText() {
    this.setActiveStyle('text', this.props.text);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', +this.props.fontSize);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '');
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '');
  }

  setFontFamily() {
    this.setActiveStyle('fontFamily', this.props.fontFamily);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill);
  }

  setActiveStyle(styleName: string, value: string | number) {
    console.log(styleName, value);
  }

  getImgPolaroid(event: any) {
    let el = event.target;
    console.log(el.src);
  }
}
