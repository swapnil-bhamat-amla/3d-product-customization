import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { ActionType, IAction } from '../type';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  url: string | ArrayBuffer;
  constructor(private connectorService: ConnectorService) {}

  ngOnInit(): void {}

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
        this.sendUploadedImageDetails(this.url);
      };
    }
  }

  sendUploadedImageDetails(imageString: string | ArrayBuffer) {
    let updatedProp: IAction = {
      type: ActionType.UploadImage,
      data: {
        imageString: imageString,
      },
    };
    this.connectorService.emitUpdatedEvent(updatedProp);
  }
}
