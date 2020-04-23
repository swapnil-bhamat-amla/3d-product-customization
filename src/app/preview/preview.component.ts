import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { ConnectorService } from '../connector.service';
import { IAction } from '../views/type';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit, OnChanges, OnDestroy {
  selectedClipArt: string;
  selectedProduct: string;
  aspectRatioStatus: boolean;
  selectedColor: string;
  coOrdinateObject: any;

  productUrl: string;
  imageLoading = false;

  constructor(private service: ConnectorService) {}

  ngOnInit() {
    this.selectedProduct = 'GRWINDSOR BLACK0001';
    this.selectedClipArt = 'C1';
    this.selectedColor = '#fff';
    this.setDefaultCoordsObjByProductCode(this.selectedProduct);
    this.updatePreviewImage();
    this.service.propUpdated.subscribe((data: IAction) => console.log(data));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.coOrdinateObject && !changes.coOrdinateObject.currentValue) {
      return;
    }
    if (changes.selectedProduct) {
      this.setDefaultCoordsObjByProductCode(
        changes.selectedProduct.currentValue
      );
    }
    this.updatePreviewImage();
  }

  ngOnDestroy() {
    this.service.propUpdated.unsubscribe();
  }

  loadImage(url: string, callback: Function) {
    const image = new Image();
    image.addEventListener('load', () => {
      callback(url);
    });
    image.src = url;
  }

  private updatePreviewImage() {
    const url = this.getUpdateProductUrl();
    this.imageLoading = true;
    this.loadImage(url, (image) => {
      this.productUrl = image;
      this.imageLoading = false;
    });
  }

  private getUpdateProductUrl(): string {
    let url = `http://integrationdevimagelab.artifi.net/Designer/Image/GetImage?format=png&webApiClientKey=185365d1-5cb0-4a9e-98bd-a9ce0b34cedc&websiteId=423&sku=Product_V_Black&ViewCode=Front&height=500&width=500&parameters=%5B%7B%22text%22%3A%22Amla%22%2C%22fill%22%3A%22%23FFFFFF%22%2C%22type%22%3A%22textbox%22%2C%22widget_key%22%3A%22RC%22%2C%22width%22%3A%22300%22%2C%22height%22%3A%22150%22%2C%22fontStyle%22%3A%22italic%22%2C%22fontSize%22%3A10%2C%22left%22%3A500.07%2C%22top%22%3A200.29%7D%2C%7B%22type%22%3A%22image%22%2C%22src%22%3A%2297963%22%2C%22widget_key%22%3A%22LC%22%7D%5D`;
    // let url =
    //   'https://integrationimagelab.artifi.net/Designer/Image/GetImage?' +
    //   'format=png&' +
    //   'webApiClientKey=96c1270e-046b-4d0e-a015-e11f8325df35&' +
    //   'websiteId=49&' +
    //   'sku=' +
    //   encodeURIComponent(this.selectedProduct) +
    //   '&' +
    //   'viewCode=A2&';
    // if (!this.coOrdinateObject) {
    //   url +=
    //     'parameters=' +
    //     encodeURIComponent(
    //       '[{"type":"image", "src":"' +
    //         this.selectedClipArt +
    //         '","widget_key":"W1", "customFilters": [{"Color":"' +
    //         this.selectedColor +
    //         '","Opacity":1,"type":"Tint"}] }]'
    //     );
    // } else {
    //   url +=
    //     'parameters=' +
    //     encodeURIComponent(
    //       '[{"type":"image", "width":"' +
    //         this.coOrdinateObject.width +
    //         '", "height":"' +
    //         this.coOrdinateObject.height +
    //         '", "top": "' +
    //         this.coOrdinateObject.y +
    //         '", "left": "' +
    //         this.coOrdinateObject.x +
    //         '", "src":"' +
    //         this.selectedClipArt +
    //         '","widget_key":"W1", "customFilters": [{"Color":"' +
    //         this.selectedColor +
    //         '","Opacity":1,"type":"Tint"}] }]'
    //     );
    // }
    return url;
  }

  private setDefaultCoordsObjByProductCode(productCode: string) {
    switch (productCode) {
      case 'GRWINDSOR BLACK0001': {
        this.coOrdinateObject = { y: 112, x: 72, width: 148.2, height: 224.8 };
        break;
      }
      case 'BELARTE CLARET0001': {
        this.coOrdinateObject = {
          y: 15.84,
          x: 137.28,
          width: 274.56,
          height: 31.68,
        };
        break;
      }
      case 'MUGEDGE WHITE0001': {
        this.coOrdinateObject = {
          y: 80.16,
          x: 63.84,
          width: 127.68,
          height: 160.32,
        };
        break;
      }
      case 'MUGERIKA BLACK0001': {
        this.coOrdinateObject = {
          y: 82.08,
          x: 108,
          width: 216,
          height: 164.16,
        };
        break;
      }
      default: {
        this.coOrdinateObject = { y: 112, x: 72, width: 148.2, height: 224.8 };
        break;
      }
    }
  }
}
