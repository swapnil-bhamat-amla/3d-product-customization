import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThreeDPreviewService implements OnDestroy {
  private renderer: THREE.WebGLRenderer;
  private RENDERER_WIDTH: number;
  private RENDERER_HEIGHT: number;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(
    container: ElementRef<HTMLDivElement>,
    canvas: ElementRef<HTMLCanvasElement>
  ): void {
    this.setRendererDimension(container.nativeElement);
    this.attachRenderer(canvas.nativeElement);
    this.addScene();
    this.addCamera();
    this.addLights();
    this.addCube();
  }

  setRendererDimension(containerEle: HTMLDivElement) {
    this.RENDERER_WIDTH = containerEle.clientWidth;
    this.RENDERER_HEIGHT = containerEle.clientHeight;
  }

  attachRenderer(canvasEle: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasEle,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.setSize(this.RENDERER_WIDTH, this.RENDERER_HEIGHT);
  }

  addScene() {
    // create the scene
    this.scene = new THREE.Scene();
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.RENDERER_WIDTH / this.RENDERER_HEIGHT,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);
  }

  addLights() {
    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);
  }

  addCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = this.RENDERER_WIDTH;
    const height = this.RENDERER_HEIGHT;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
