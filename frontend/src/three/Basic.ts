/**
 * Crea los 4 pilares de Three.js:
 * escena, cámara, renderer y controles
 */

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export class Basic {
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;
  public controls!: OrbitControls;
  public dom: HTMLElement;

  constructor(dom: HTMLElement) {
    this.dom = dom
    this.initScenes()
    this.setControls()
  }

  /**
   * Inicializa la escena
   */
  /**
   * Dimensiones del contenedor (no de la ventana), para que el canvas
   * se ajuste al hueco donde se monta.
   */
  private getSize() {
    const width = this.dom.clientWidth || window.innerWidth
    const height = this.dom.clientHeight || window.innerHeight
    return { width, height }
  }

  initScenes() {
    this.scene = new THREE.Scene();

    const { width, height } = this.getSize()

    this.camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      100000
    );
    this.camera.position.set(0, 30, -250)


    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // transparente
      antialias: true, // antialiasing
    });
    this.renderer.setPixelRatio(window.devicePixelRatio); // Ajusta el ratio de píxeles de la pantalla
    this.renderer.setSize(width, height); // Ajusta el renderer al tamaño del contenedor
    this.dom.appendChild(this.renderer.domElement); // Agrega el canvas al DOM
  }

  /**
   * Configura el controlador de órbita
   */
  setControls() {
    // Control de ratón: cámara y DOM de renderizado
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // El globo no debe poder manipularse con el ratón: se desactiva toda
    // interacción (rotación con arrastre, zoom y desplazamiento). La rotación
    // automática del globo se gestiona aparte en el bucle de render
    // (earthGroup.rotation.y), así que sigue girando por sí solo.
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enabled = false;
  }
}