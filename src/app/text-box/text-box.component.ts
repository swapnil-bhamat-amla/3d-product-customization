import { Component, OnInit } from '@angular/core';

interface ITextProp {
  fill: string;
  text: string;
  fontSize: number;
  fontWeight: boolean;
  fontStyle: boolean;
  fontFamily: string;
}

interface IFontFamily {
  code: string;
  value: string;
}

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css'],
})
export class TextBoxComponent implements OnInit {
  textProps: ITextProp;
  fontFamilyArr: IFontFamily[];

  constructor() {
    this.textProps = {
      fill: '#000000',
      text: 'sample text',
      fontSize: 26,
      fontWeight: false,
      fontStyle: false,
      fontFamily: 'Ubuntu',
    };

    this.fontFamilyArr = [
      {
        code: 'Ubuntu',
        value: 'Ubuntu',
      },
      {
        code: 'TimesNewRoman',
        value: 'Times New Roman',
      },
      {
        code: 'Philosopher',
        value: 'Philosopher',
      },
      {
        code: 'LetterGothic',
        value: 'Letter Gothic',
      },
      {
        code: 'Arial',
        value: 'Arial',
      },
      {
        code: 'Cochin',
        value: 'Cochin',
      },
    ];
  }

  ngOnInit() {}

  setText() {
    this.setActiveStyle('text', this.textProps.text);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', +this.textProps.fontSize);
  }

  setFontStyle() {
    this.textProps.fontStyle = !this.textProps.fontStyle;
    this.setActiveStyle('fontStyle', this.textProps.fontStyle ? 'italic' : '');
  }

  setBold() {
    this.textProps.fontWeight = !this.textProps.fontWeight;
    this.setActiveStyle('fontWeight', this.textProps.fontWeight ? 'bold' : '');
  }

  setFontFamily() {
    this.setActiveStyle('fontFamily', this.textProps.fontFamily);
  }

  setFill() {
    this.setActiveStyle('fill', this.textProps.fill);
  }

  setActiveStyle(styleName: string, value: string | number) {
    console.log(this.textProps);
  }
}
