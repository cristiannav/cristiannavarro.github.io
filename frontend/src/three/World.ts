import {
  MeshBasicMaterial, PerspectiveCamera,
  Scene, ShaderMaterial, WebGLRenderer
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import type { IWord } from './interfaces/IWord';

import { Basic } from './Basic'
import Sizes from './utils/Sizes'
import { Resources } from './Resources';

// earth 
import Earth from './Earth'
import Data from './Data'

export default class World {
  public basic: Basic;
  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer
  public controls: OrbitControls;
  public sizes: Sizes;
  public material!: ShaderMaterial | MeshBasicMaterial;
  public resources: Resources;
  public option: IWord;
  public earth!: Earth;
  public rafId: number = 0;
  private disposed: boolean = false;


  constructor(option: IWord) {
    /**
     * Carga de recursos
     */
    this.option = option

    this.basic = new Basic(option.dom)
    this.scene = this.basic.scene
    this.renderer = this.basic.renderer
    this.controls = this.basic.controls
    this.camera = this.basic.camera

    this.sizes = new Sizes({ dom: option.dom })

    this.sizes.$on('resize', () => {
      this.renderer.setSize(Number(this.sizes.viewport.width), Number(this.sizes.viewport.height))
      this.camera.aspect = Number(this.sizes.viewport.width) / Number(this.sizes.viewport.height)
      this.camera.updateProjectionMatrix()
    })

    this.resources = new Resources(async () => {
      if (this.disposed) return
      await this.createEarth()
      if (this.disposed) return // dispose() pudo ejecutarse durante el await
      // Comenzar el renderizado
      this.render()
    })
  }

  async createEarth() {

    // Recursos cargados; se procede a construir la Tierra (ver comentarios en la clase Earth)
    this.earth = new Earth({
      data: Data,
      dom: this.option.dom,
      textures: this.resources.textures,
      earth: {
        radius: 70,
        rotateSpeed: 0.002,
        isRotation: true
      },
      satellite: {
        show: true,
        rotateSpeed: -0.01,
        size: 1,
        number: 2
      },
      punctuation: {
        circleColor: 0x3892ff,
        lightColumn: {
          startColor: 0xe4007f, // color de inicio
          endColor: 0xffffff, // color final
        },
      },
      flyLine: {
        color: 0xf3ae76, // color de la línea de vuelo
        flyLineColor: 0xff7714, // color de la línea de vuelo animada
        speed: 0.004, // velocidad de la línea de vuelo con cola
      }
    })

    this.scene.add(this.earth.group)

    await this.earth.init()

    // Avisar a React que los recursos están listos (oculta la pantalla de carga)
    if (!this.disposed) this.option.onReady?.()

  }

  /**
   * Función de renderizado
   */
  public render() {
    this.rafId = requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
    if (this.controls) this.controls.update()
    if (this.earth) this.earth.render()
  }

  /**
   * Libera todos los recursos: detiene el bucle de render, descarta el
   * renderer, quita el canvas del DOM y elimina los listeners.
   */
  public dispose() {
    this.disposed = true
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.sizes?.destroy()
    this.renderer?.dispose()
    const canvas = this.renderer?.domElement
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
  }
}