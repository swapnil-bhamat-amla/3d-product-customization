import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThreeDPreviewService } from './three-d-preview.service';

@Component({
  selector: 'three-d-preview',
  templateUrl: './three-d-preview.component.html',
  styleUrls: ['./three-d-preview.component.css'],
})
export class ThreeDPreviewComponent implements OnInit {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('rendererWrapper', { static: true })
  public rendererWrapper: ElementRef<HTMLDivElement>;

  public constructor(private threeDService: ThreeDPreviewService) {}

  public ngOnInit(): void {
    this.threeDService.createScene(this.rendererWrapper, this.rendererCanvas);
    this.threeDService.animate();
  }
}
