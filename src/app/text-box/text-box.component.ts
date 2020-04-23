import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import {
  ITextProp,
  IAction,
  ActionType,
  FontWeightType,
  FontStyleType,
  IObject,
} from '../type';

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
  objectsArr: IObject[] = [];
  selectedObjectId = '';

  constructor(private service: ConnectorService) {
    this.textProps = {
      fill: '#ff0000',
      text: 'sample text',
      type: 'textbox',
      fontSize: 20,
      fontWeight: FontWeightType.Normal,
      fontStyle: FontStyleType.Normal,
      fontFamily: 'Ubuntu',
      widget_key: this.selectedObjectId,
      left: 200,
      top: 200,
      width: 300,
      height: 150,
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
    let objectName = window.prompt('Please enter text name', '');
    if (objectName && objectName.trim()) {
      let objectId = this.service.makeId(5);
      this.selectedObjectId = objectId;
      this.textProps.widget_key = objectId;
      this.objectsArr.push({
        id: objectId,
        value: objectName,
      });
      this.sendObjectDetails();
    }
  }

  setText() {
    this.sendObjectDetails();
  }

  setFontSize() {
    this.sendObjectDetails();
  }

  setFontStyle() {
    this.textProps.fontStyle =
      this.textProps.fontStyle === FontStyleType.Normal
        ? FontStyleType.Italic
        : FontStyleType.Normal;
    this.sendObjectDetails();
  }

  setBold() {
    this.textProps.fontWeight =
      this.textProps.fontWeight === FontWeightType.Normal
        ? FontWeightType.Bold
        : FontWeightType.Normal;
    this.sendObjectDetails();
  }

  isBold() {
    return this.textProps.fontWeight === FontWeightType.Bold ? true : false;
  }

  isItalic() {
    return this.textProps.fontStyle === FontStyleType.Italic ? true : false;
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
