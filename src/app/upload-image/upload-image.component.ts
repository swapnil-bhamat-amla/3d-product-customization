import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { ActionType, IAction } from '../type';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  url: string | ArrayBuffer =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAEAUlEQVR4Xu3cSU/rMBAH8AkgEDtUtCxCHIAL3/9rcKzUC1QItWyCikVsB9Snv5+muG4Wxx47XcjptWmcmZ89Y0TJS87Pz/u1Wo2WlpZo1o7v72/q9XqUtNvtPv5xenpKm5ubM+Pw8vJCFxcXhAWQdLvd/urqqnpjViAYAPm+v7//Rzg4OCD9xDSvCDPPm5ubXwTUwbRDpOU3gjDNEFkTnIowjRB5KzwTYZogiko8F2EaIIoAkGMhwiRD2ABYI0wihC1AKYRJgigDUBphEiDKAjghjDOEC4AzwjhCuAJ4IYwThA+AN8I4QPgCiCBUCSEBIIZQBYQUgChCTAhJAHGEGBDSAEEQQkKEAAiGEAIiFEBQBEmIkADBESQgQgNEQfCBiAEQDcEFIhZAVIQyEDEBoiPYQMQGqAQhD6IKgMoQ0iCqAqgUQYfY39+n29vbyr4MtvqVOwIOdSAAAAACXwpXcVSKwCUwsyvB7AEz1xOyEq4KIno5FCVadD5Ez4iKYJug7eekQKIhlE2s7Od9QKIguCbkel1ZkOAIvon4Xm8DEhRBKgGpcbJAgiFIBy49ng4SBCFUwKHGFUcIFSjPXIjxRRFCBJhWx9L3EUOQDqyoq0veTwRBMqCi5PXzUvf1RpAKpEzy0hBeCFUDSDVLZ4RxAZCAcEIYNwBfiNIILgAPDw/U6XSo3++reLe2tujk5GRQ2q1Wiz4+PobawsrKCp2dnVm1CnN8XKQ/wYN739/fD401Pz9Px8fHtLGxYfe3zT7SHMDu7i4dHh4SB9xoNNTrz89P9dgRktZhrLInUrhI0Bwf4AxxeXmpkPF6eXl5ZGjrleCyAjjBhYWFoVnFzOPATL++vlK73aadnR2FUubIG//n54fwpBsSR5J8v7TxrRBcAHAzmwSxMhAEft2O1WEeAEOyAMJ5Thyf29vbo263mwnIcWMS1tbWMldaIYIrAILkBDHLj4+PhNkxe0Javer9QE+aZ/Xt7U3V89fXlwLMGx/fafBKYGC9H+C9oE++cP3Pzc0NmhC/h6ft0ANQr4A2Z1ovIb4G9YzaNus/b3y9aeo9giFzG6PPCmDxrKWOxPUgzBLA6sC1DIPzuOb5+Vk1UN41yoyv55MkiepD6+vraiJSV4IEgF4OZr0jSZQHb1EmQlpyvI0uLi4OunwWQtb4nNfR0RHd3d0NdqQRBCkAJMb1vL29PdT59S3r6upqpHObSXDfwOO8iI9n0Gb8p6enIXDODyVUr9dVXEMIkgA8u2ZCZk8wlz7vKJyo+dr8fNH45vWIq9lsqu0TKwIQA4SQz0qbO4D5E2PWeXNn4B90UBpIgsupaHyG4N0JJYXt9fr6WpWWelb676n5GiV//39Cj/4B4fQ1CoZTon4AAAAASUVORK5CYII=';
  fileName = 'Choose image';
  constructor(private connectorService: ConnectorService) {}

  ngOnInit(): void {}

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      var reader = new FileReader();
      this.fileName = file.name;
      reader.readAsDataURL(file);
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
