import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectorService } from '../connector.service';
import {
  IAction,
  ITextProp,
  ActionType,
  IImage,
  FontStyleType,
  FontWeightType,
} from '../type';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit, OnDestroy {
  productUrl: string;
  imageLoading = false;
  getImageAPIDomain =
    'http://integrationdevimagelab.artifi.net/Designer/Image/GetImage';
  imageFormat = 'png';
  sku = 'Product_V_Black';
  viewCode = 'Front';
  webAPIClientKey = '185365d1-5cb0-4a9e-98bd-a9ce0b34cedc';
  websiteId = '423';
  maxWidth = 500;
  maxHeight = 500;
  widgetCollection: { [key: string]: ITextProp | IImage } = {};

  constructor(private service: ConnectorService) {
    this.widgetCollection = {
      LC: {
        type: 'image',
        src: '97963',
        widget_key: 'LC',
        width: 90,
        height: 90,
        left: 470.07,
        top: 230.29,
      },
      RC: {
        text: 'Artifi',
        fill: '#FFFFFF',
        type: 'textbox',
        widget_key: 'RC',
        width: 300,
        height: 150,
        fontStyle: FontStyleType.Normal,
        fontSize: 30,
        left: 610.07,
        top: 245.29,
        fontWeight: FontWeightType.Normal,
        fontFamily: 'Arial',
      },
    };
  }

  ngOnInit() {
    this.updatePreviewImage();
    this.service.propUpdated.subscribe((action: IAction) =>
      this.handleAction(action)
    );
  }

  //TODO: Remove any
  handleAction(action: any) {
    switch (action.type) {
      case ActionType.TextBox: {
        this.widgetCollection[action.data.id] = action.data.props;
        this.updatePreviewImage();
        break;
      }
      case ActionType.Image: {
        this.widgetCollection[action.data.id] = action.data.props;
        this.updatePreviewImage();
        break;
      }
      case ActionType.Options: {
        this.sku = action.data.sku;
        this.updatePreviewImage();
        break;
      }
      case ActionType.Views: {
        this.viewCode = action.data.code;
        console.log(action.data.code);
        this.updatePreviewImage();
        break;
      }
      default: {
        break;
      }
    }
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
    let widgetArr = this.generateWidgetArr();
    console.log(widgetArr);
    let url = `${this.getImageAPIDomain}?format=${
      this.imageFormat
    }&webApiClientKey=${this.webAPIClientKey}&websiteId=${this.websiteId}&sku=${
      this.sku
    }&ViewCode=${this.viewCode}&height=${this.maxWidth}&width=${
      this.maxHeight
    }&parameters=${encodeURIComponent(JSON.stringify(widgetArr))}`;
    return url;
  }

  generateWidgetArr(): Array<ITextProp> {
    let widgetArr = [];
    for (let key in this.widgetCollection) {
      widgetArr.push(this.widgetCollection[key]);
    }
    return widgetArr;
  }
}
