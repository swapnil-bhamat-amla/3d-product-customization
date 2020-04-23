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
  selectedClipArt = '97963';
  clipArtsArr: IClipArt[] = [];
  objectsArr: IObject[] = [];
  imageProps: IImage;
  selectedObjectId = '';
  clipArtBasePath =
    'http://cdnintegrationimages.azureedge.net/UserImages/137708DD-8198-4922-B167-0C90CA79F57F/4d840c81-6b06-4eb0-a11b-9f146f739888/Cliparts/Thumbnail';

  constructor(private service: ConnectorService) {
    this.imageProps = {
      type: 'image',
      src: this.selectedClipArt,
      widget_key: 'LC',
      width: 90,
      height: 90,
      left: 470.07,
      top: 230.29,
    };
    this.clipArtsArr = [
      {
        path: `${this.clipArtBasePath}/24cda29d-50e5-404b-8057-3bfb72b0229f.png`,
        code: '97963',
      },
      {
        path: `${this.clipArtBasePath}/c8dbecaf-45c6-47fc-8c3b-dead82e50655.jpg`,
        code: '97966',
      },
      {
        path: `${this.clipArtBasePath}/edc94698-12f2-41b3-99c4-9a8558ffde8e.png`,
        code: '101098',
      },
      {
        path: `${this.clipArtBasePath}/af0fbfa7-540f-44b8-b0f8-97cf7971f8b3.png`,
        code: '97962',
      },
      {
        path: `${this.clipArtBasePath}/ed39c603-1381-4e6e-8d3c-3138cbc64bbb.png`,
        code: '97965',
      },
    ];
  }

  ngOnInit(): void {
    this.addObject();
  }

  addObject() {
    let objectName = 'Image1';
    if (objectName && objectName.trim()) {
      let objectId = this.service.makeId(5);
      this.selectedObjectId = objectId;
      this.imageProps.widget_key = objectId;
      this.objectsArr.push({
        id: objectId,
        value: objectName,
      });
      this.sendObjectDetails();
    }
  }

  clipArtSelectedHnd(code: string) {
    this.selectedClipArt = code;
    this.imageProps.src = code;
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
