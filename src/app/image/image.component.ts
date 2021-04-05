import { Component, OnInit } from '@angular/core';
import { IImage, IObject, ActionType, IAction } from '../type';
import { ConnectorService } from '../connector.service';

interface IClipArt {
  path: string;
  code: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  selectedClipArt = '';
  clipArtsArr: IClipArt[] = [];
  objectsArr: IObject[] = [];
  imageProps: IImage;
  selectedObjectId = '';
  clipArtBasePath =
    'http://cdnintegrationimages.azureedge.net/UserImages/137708DD-8198-4922-B167-0C90CA79F57F/4d840c81-6b06-4eb0-a11b-9f146f739888/Cliparts/Thumbnail';
  selectedImagePath = ``;
  constructor(private service: ConnectorService) {
    this.clipArtsArr = [
      {
        path: `../../assets/img/logos/Bookcase Flat Art_Header.png`,
        code: '97965',
      },
      {
        path: `../../assets/img/logos/Nestle-Waters.png`,
        code: '97963',
      },
      {
        path: `../../assets/img/logos/Perrier.png`,
        code: '97966',
      },
      {
        path: `../../assets/img/logos/Evian.png`,
        code: '101098',
      },
      {
        path: `../../assets/img/logos/Aquafine.jpg`,
        code: '97962',
      },
    ];
    this.selectedClipArt = this.clipArtsArr[0].code;
    this.selectedImagePath = this.clipArtsArr[1].path;
    this.imageProps = {
      type: 'image',
      src: this.selectedClipArt,
      widget_key: 'LC',
      width: 90,
      height: 90,
      left: 470.07,
      top: 230.29,
      url: this.selectedImagePath,
    };
  }

  ngOnInit(): void {
    this.addObject();
  }

  addObject() {
    let objectName = 'Image1';
    if (objectName && objectName.trim()) {
      let objectId = 'LC'; //TODO: Passed hard code due to requirement and removed
      this.selectedObjectId = objectId;
      this.imageProps.widget_key = objectId;
      this.objectsArr.push({
        id: objectId,
        value: objectName,
      });
    }
  }

  clipArtSelectedHnd(code: string, path: string) {
    this.selectedClipArt = code;
    this.imageProps.src = code;
    this.imageProps.url = path;
    this.sendObjectDetails();
  }

  sendObjectDetails() {
    let updatedProp: IAction = {
      type: ActionType.Image,
      data: {
        id: this.selectedObjectId,
        props: this.imageProps,
      },
    };
    this.service.emitUpdatedEvent(updatedProp);
  }
}
