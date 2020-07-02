import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThreeDPreviewService } from './three-d-preview.service';
import { ConnectorService } from '../connector.service';
import { IAction, ActionType } from '../type';

@Component({
  selector: 'three-d-preview',
  templateUrl: './three-d-preview.component.html',
  styleUrls: ['./three-d-preview.component.css'],
  providers: [ThreeDPreviewService],
})
export class ThreeDPreviewComponent implements OnInit {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('rendererWrapper', { static: true })
  public rendererWrapper: ElementRef<HTMLDivElement>;

  loadingInProgress = true;

  public constructor(
    private threeDService: ThreeDPreviewService,
    private connectorService: ConnectorService
  ) {}

  public ngOnInit(): void {
    let modelPath = '../../assets/model/final.gltf';
    this.threeDService
      .createScene(this.rendererWrapper, this.rendererCanvas, modelPath)
      .then(
        (loaded: boolean) => {
          this.loadingInProgress = false;
          this.threeDService.mapImageOnMaterial(
            'logo',
            `../../assets/img/logos/google.png`
          );
          console.log('scene rendered successfully!', loaded);
        },
        (error) => {
          this.loadingInProgress = false;
          console.log('Error while loading scene!', error);
        }
      );
    this.threeDService.animate();
    this.connectorService.propUpdated.subscribe((action: IAction) => {
      this.performAction(action);
    });
  }

  performAction(action: any) {
    switch (action.type) {
      case ActionType.Image: {
        let { url } = action.data.props;
        this.threeDService.mapImageOnMaterial('logo', url);
        break;
      }
      case ActionType.Options: {
        let { hex } = action.data;
        hex = hex.toString().replace('#', '0x');
        this.threeDService.mapColorToMaterial('body', hex);
        break;
      }
      case ActionType.UploadImage: {
        let { imageString } = action.data;
        this.threeDService.mapImageOnMaterial('logo', imageString);
        break;
      }
      default: {
        break;
      }
    }
  }
}
