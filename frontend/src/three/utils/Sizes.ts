/**
 * Tamaño de pantalla
*/
import { EventEmitter } from 'pietile-eventemitter';
import type { IEvents } from '../interfaces/IEvents';


type options = { dom: HTMLElement }

export default class Sizes {
  public width: number = 0
  public height: number = 0
  public viewport: {
    width: number,
    height: number
  }
  public $sizeViewport: HTMLElement
  public emitter: EventEmitter<IEvents>;

  /**
   * Constructor
   */
  constructor(options: options) {

    this.emitter = new EventEmitter<IEvents>()

    // Viewport size
    this.$sizeViewport = options.dom

    this.viewport = {
      width: 0,
      height: 0
    }

    // Resize event
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    this.resize()
  }

  /**
   * Se usa para suscribirse a eventos (p. ej. historyChange)
   * @param event nombre del evento
   * @param fun función a ejecutar
   */
  $on<T extends keyof IEvents>(event: T, fun: () => void) {
    this.emitter.on(
      event,
      () => {
        fun()
      }
    )
  }

  /**
   * Resize
   */
  resize() {
    // Tamaño del área visible
    this.viewport.width = this.$sizeViewport.offsetWidth
    this.viewport.height = this.$sizeViewport.offsetHeight

    this.emitter.emit('resize')
  }

  /**
   * Quita el listener de resize de la ventana.
   */
  destroy() {
    window.removeEventListener('resize', this.resize)
  }
}
