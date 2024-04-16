import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, Input, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';


@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.css']
})
export class CanvasBoxComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas') private canvasRef!: ElementRef;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private loader = new GLTFLoader();
  private controls!: OrbitControls;
  private model: THREE.Object3D | null = null;

  // Animation
  private mixer!: THREE.AnimationMixer;
  private action!: THREE.AnimationAction;
  private clock = new THREE.Clock();

  private shirtColor: number = 0x000000;
  private pantsColor: number = 0x000000;

  @Input() selectedColor!: string;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewInit() {
    this.setupRenderer();
    this.loadGLTF();
    this.setupControls();
  }

  ngOnInit() {
    this.scene = new THREE.Scene();
    this.setupCamera();
    this.setupLights();
  }

  private setupCamera() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 0);
    this.camera.position.set(0, 0, 2); // Adjust the camera position to be closer
  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
  }

  private setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xf5f5f5);
    this.startRenderingLoop();
  }

  private startRenderingLoop() {
    const render = () => {
      requestAnimationFrame(render);
  
      // Update the animation mixer
      const delta = this.clock.getDelta();
      if (this.mixer) {
        this.mixer.update(delta);
      }
  
      if (this.controls) {
        this.controls.update();
      }
      this.renderer.render(this.scene, this.camera);
    };
    render();
  }

  private loadGLTF() {
    console.log("Loading glTF model...");
    this.loader.load(
      'assets/3dmodeltest/scene.gltf',
      (gltf) => {
        console.log("glTF model loaded successfully:", gltf);
        this.scene.add(gltf.scene);
        this.model = gltf.scene;
  
        // Create animation mixer
        this.mixer = new THREE.AnimationMixer(gltf.scene);
  
        // Extract the desired animation clip
        const clip = gltf.animations[0];
  
        // Create the animation action
        this.action = this.mixer.clipAction(clip);
  
        this.updateModelOnInit(); // Call updateModelOnInit before updateMaterialColors
        this.updateMaterialColors();
        this.updateControlsTarget();
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );
  }

  private setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private updateMaterialColors() {
    if (this.model) {
      this.updateShirtAndPantsColor(this.shirtColor, this.pantsColor);
      this.renderer.render(this.scene, this.camera);
    }
  }

  public updateShirtColor(color: string) {
    const shirtColor = parseInt(color.slice(1), 16);
    this.updateShirtAndPantsColor(shirtColor, this.pantsColor);
  }
  
  public updatePantsColor(color: string) {
    const pantsColor = parseInt(color.slice(1), 16);
    this.updateShirtAndPantsColor(this.shirtColor, pantsColor);
  }

  public updateShirtAndPantsColor(shirtColor: number, pantsColor: number) {
    this.shirtColor = shirtColor;
    this.pantsColor = pantsColor;
    if (this.model) {
      let counter = 0;
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          counter += 1;
          if (counter === 9) {
            if (!(child.material instanceof THREE.MeshBasicMaterial)) {
              const newMaterial = new THREE.MeshBasicMaterial({ color: shirtColor });
              child.material = newMaterial;
            } else {
              (child.material as THREE.MeshBasicMaterial).color.setHex(shirtColor);
            }
          } else if (counter === 7) {
            if (!(child.material instanceof THREE.MeshBasicMaterial)) {
              const newMaterial = new THREE.MeshBasicMaterial({ color: pantsColor });
              child.material = newMaterial;
            } else {
              (child.material as THREE.MeshBasicMaterial).color.setHex(pantsColor);
            }
          }
        }
      });
  
      this.renderer.render(this.scene, this.camera);
    }
  }

  private updateModelOnInit() {
    if (this.model) {
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const materialName = child.material.name;
          if (materialName.includes('Skin')) {
            const newMaterial = new THREE.MeshBasicMaterial({
              color: 0xE8B3A2,
              opacity: 1,
              transparent: false,
            });
            child.material = newMaterial;
          } else if (materialName.includes('Footwear')) {
            const newMaterial = new THREE.MeshBasicMaterial({
              color: 0x6b3200,
              transparent: false,
              opacity: 1,
            });
            child.material = newMaterial;
          } else if (materialName.includes('Body')) {
            const newMaterial = new THREE.MeshBasicMaterial({
              color: 0xE8B3A2,
              opacity: 1,
              transparent: false,
            });
            child.material = newMaterial;
          } else if (materialName.includes('Hair')) {
            const newMaterial = new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0,
            });
            child.material = newMaterial;
          } else if (materialName.includes('Glasses')) {
            const newMaterial = new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0,
            });
            child.material = newMaterial;
          }
        }
      });
    }
  }

  private updateControlsTarget() {
    if (this.model && this.controls) {
      const box = new THREE.Box3().setFromObject(this.model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      this.controls.target = center;
      this.controls.update();
    }
  }

  public toggleAnimation() {
    if (this.action) {
      if (this.action.isRunning()) {
        this.action.stop();
      } else {
        this.action.play();
      }
    }
  }

  public changeShirtColor() {
  this.ngZone.run(() => {
    const randomColor = Math.floor(Math.random() * 16777215);
    const shirtColor = randomColor;
    this.updateShirtAndPantsColor(shirtColor, this.pantsColor);
    this.renderer.render(this.scene, this.camera);
  });
  }

  public changePantsColor() {
    this.ngZone.run(() => {
      const randomColor = Math.floor(Math.random() * 16777215);
      const pantsColor = randomColor;
      this.updateShirtAndPantsColor(this.shirtColor, pantsColor);
      this.renderer.render(this.scene, this.camera);
    });
  }

  public getCurrentOutfit() {
    
  }
}