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
  private cube: THREE.Mesh;
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
    this.addModel(modelPath);
    this.addFloor();
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
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  addScene() {
    const BACKGROUND_COLOR = 0xf1f1f1;
    // Init the scene
    this.scene = new THREE.Scene();
    // Set background
    this.scene.background = new THREE.Color(BACKGROUND_COLOR);
    this.scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.RENDERER_WIDTH / this.RENDERER_HEIGHT,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.camera.position.x = 0;
    this.scene.add(this.camera);
  }

  addLights() {
    // Add lights
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    this.scene.add(dirLight);
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

  addModel(modelPath: string) {
    // Init the object loader
    var loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf: GLTF) => {
        this.model = gltf.scene;

        //TODO: Remove any
        this.model.traverse((o: any) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });

        // Set the models initial scale
        this.model.scale.set(2, 2, 2);
        this.model.rotation.y = Math.PI;

        // Offset the y position a bit
        this.model.position.y = -1;

        // Set initial textures
        // for (let object of INITIAL_MAP) {
        //   initColor(theModel, object.childID, object.mtl);
        // }

        // Add the model to the scene
        this.scene.add(this.model);
      },
      undefined,
      function (error: ErrorEvent) {
        console.error(error);
      }
    );
  }

  addFloor() {
    // Floor
    var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      shininess: 0,
    });

    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    floor.position.y = -1;
    this.scene.add(floor);
  }

  addControls() {
    // Add controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 3;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.dampingFactor = 0.1;
    this.controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
    this.controls.autoRotateSpeed = 0.2; // 30
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
