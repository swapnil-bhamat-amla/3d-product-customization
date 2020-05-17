import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root',
})
export class ThreeDPreviewService implements OnDestroy {
  private renderer: THREE.WebGLRenderer;
  private RENDERER_WIDTH: number;
  private RENDERER_HEIGHT: number;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private model: THREE.Group;
  private controls: OrbitControls;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(
    container: ElementRef<HTMLDivElement>,
    canvas: ElementRef<HTMLCanvasElement>,
    modelPath: string = ''
  ): void {
    this.setRendererDimension(container.nativeElement);
    this.attachRenderer(canvas.nativeElement);
    this.addScene();
    this.addCamera();
    this.addLights();
    this.addModel(modelPath).then(
      (model: THREE.Group) => {
        this.model = model;
        this.mapColorToMaterial();
      },
      (error: ErrorEvent) => {
        console.error(error);
      }
    );
    this.addControls();
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
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
  }

  addScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf1f1f1);
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.RENDERER_WIDTH / this.RENDERER_HEIGHT,
      0.01,
      1000
    );
    this.camera.position.z = 4; // How far from object.
    this.scene.add(this.camera);
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(0.5, 0, 0.866);
    this.camera.add(dirLight);
  }

  addModel(modelPath: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      var loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf: GLTF) => {
          let model = gltf.scene;
          model.scale.set(2, 2, 2);
          model.position.y = -2;
          this.scene.add(model);
          resolve(model);
        },
        undefined,
        function (error: ErrorEvent) {
          reject(error);
        }
      );
    });
  }

  mapColorToMaterial() {
    const INITIAL_MAP = [
      { childID: 'bottle', color: 0xffff00 },
      { childID: 'cap', color: 0xffffff },
    ];
    for (let object of INITIAL_MAP) {
      this.mapMaterial(object.childID, object.color);
    }
  }

  mapMaterial(type: string, hexColor: number = 0) {
    //TODO: Remove any
    this.model.traverse((o: any) => {
      if (o.isMesh && o.name.includes(type) && hexColor) {
        o.material.color.setHex(hexColor);
      }
    });
  }

  addControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = -10;
    this.controls.screenSpacePanning = true;
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
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    this.camera.aspect = this.RENDERER_WIDTH / this.RENDERER_HEIGHT;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.RENDERER_WIDTH, this.RENDERER_HEIGHT);
  }
}
