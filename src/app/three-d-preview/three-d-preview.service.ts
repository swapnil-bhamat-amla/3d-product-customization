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

  constructor(private ngZone: NgZone) {}

  ngOnDestroy(): void {
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
      },
      (error: ErrorEvent) => {
        console.error(error);
      }
    );
    this.addControls();
  }

  private setRendererDimension(containerEle: HTMLDivElement) {
    this.RENDERER_WIDTH = containerEle.clientWidth;
    this.RENDERER_HEIGHT = containerEle.clientHeight;
  }

  private attachRenderer(canvasEle: HTMLCanvasElement) {
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

  private addScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf1f1f1);
  }

  private addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.RENDERER_WIDTH / this.RENDERER_HEIGHT,
      0.01,
      1000
    );
    this.camera.position.z = 4; // How far from object.
    this.scene.add(this.camera);
  }

  private addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(0.5, 0, 0.866);
    this.camera.add(dirLight);
  }

  private addModel(
    modelPath: string,
    resetMaterial: Array<string> = ['logo']
  ): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      var loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf: GLTF) => {
          let model = gltf.scene;
          model.scale.set(2, 2, 2);
          model.position.y = -2;
          // const mtl = new THREE.MeshPhongMaterial({
          //   color: 0xf1f1f1,
          //   shininess: 10,
          // });
          // model.traverse((o: any) => {
          //   if (o.isMesh) {
          //     if (o.name.includes('logo')) {
          //       o.material = mtl;
          //     }
          //   }
          // });
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

  public mapColorToMaterial(childId: string, hexColor: number = 0) {
    //TODO: Remove any
    this.model.traverse((o: any) => {
      if (o.isMesh && o.name.includes(childId) && hexColor) {
        o.material.color.setHex(hexColor);
      }
    });
  }

  public mapImageOnMaterial(childId: string, imagePath: string) {
    //Method 1
    // let canvas = document.createElement('canvas'),
    //   ctx = canvas.getContext('2d');
    // let img = new Image();
    // img.onload = () => {
    //   console.log(img.width, img.height);
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   ctx.drawImage(img, 0, 0);
    //   var texture = new THREE.CanvasTexture(canvas);
    //   texture.needsUpdate = true;
    //   texture.flipY = false;
    //   // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //   texture.encoding = THREE.sRGBEncoding;
    //   this.model.traverse((o: any) => {
    //     if (o.isMesh && o.name.includes(childId) && imagePath) {
    //       //o.material = material;
    //       o.material.map = texture;
    //       o.material.transparent = true;
    //       o.material.needsUpdate = true;
    //     }
    //   });
    // };
    // img.src = imagePath;
    //Method 2
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = '';
    const myTexture = textureLoader.load(
      imagePath,
      (texture: THREE.Texture) => {
        texture.flipY = false;
        texture.encoding = THREE.sRGBEncoding;
        texture.repeat.set(4, 3);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        let material = new THREE.MeshPhongMaterial({
          map: texture,
          transparent: true,
        });
        this.model.traverse((o: any) => {
          if (o.isMesh && o.name.includes(childId) && imagePath) {
            o.material = material;
            o.material.needsUpdate = true;
          }
        });
      }
    );
  }

  private addControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;
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

  private render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private resize(): void {
    this.camera.aspect = this.RENDERER_WIDTH / this.RENDERER_HEIGHT;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.RENDERER_WIDTH, this.RENDERER_HEIGHT);
  }
}
