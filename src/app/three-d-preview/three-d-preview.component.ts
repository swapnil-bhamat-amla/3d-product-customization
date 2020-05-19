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

  public constructor(
    private threeDService: ThreeDPreviewService,
    private connectorService: ConnectorService
  ) {}

  public ngOnInit(): void {
    let model = '../../assets/model/dummy-chair.glb';
    this.threeDService.createScene(
      this.rendererWrapper,
      this.rendererCanvas,
      model
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
        this.threeDService.mapImageOnMaterial('front', url);
        break;
      }
      case ActionType.Options: {
        let { hex } = action.data;
        hex = hex.toString().replace('#', '0x');
        this.threeDService.mapColorToMaterial('cushions', hex);
        break;
      }
      default: {
        break;
      }
    }
  }
}
