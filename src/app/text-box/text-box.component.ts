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

interface ITextObject {
  id: string;
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
  objectsArr: ITextObject[] = [];
  selectedObjectId = '';

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

  addObject() {
    let objectName = window.prompt('Please enter object name', '');
    if (objectName && objectName.trim()) {
      let objectId = this.makeId(5);
      this.selectedObjectId = objectId;
      this.objectsArr.push({
        id: objectId,
        value: objectName,
      });
    }
  }

  makeId(length: number): string {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  setText() {
    this.sendObjectDetails();
  }

  setFontSize() {
    this.sendObjectDetails();
  }

  setFontStyle() {
    this.textProps.fontStyle = !this.textProps.fontStyle;
    this.sendObjectDetails();
  }

  setBold() {
    this.textProps.fontWeight = !this.textProps.fontWeight;
    this.sendObjectDetails();
  }

  setFontFamily() {
    this.sendObjectDetails();
  }

  setFill() {
    this.sendObjectDetails();
  }

  sendObjectDetails() {
    console.log(this.textProps, this.selectedObjectId);
  }
}
