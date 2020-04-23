import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { ITextProp, IAction, ActionType } from '../views/type';

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

  constructor(private service: ConnectorService) {
    this.textProps = {
      fill: '#000000',
      text: 'sample text',
      fontSize: 26,
      fontWeight: false,
      fontStyle: false,
      fontFamily: 'Ubuntu',
      left: 500.07,
      top: 200.29,
      widget_key: this.selectedObjectId,
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
      let objectId = this.service.makeId(5);
      this.selectedObjectId = objectId;
      this.textProps.widget_key = objectId;
      this.objectsArr.push({
        id: objectId,
        value: objectName,
      });
    }
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
    let updatedProp: IAction = {
      type: ActionType.TextBox,
      data: {
        id: this.selectedObjectId,
        props: this.textProps,
      },
    };
    this.service.emitUpdatedEvent(updatedProp);
  }
}
