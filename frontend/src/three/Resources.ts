/**
 * Gestión y carga de recursos
 */
import { LoadingManager, Texture, TextureLoader } from 'three';
import { resources } from './Assets'
export class Resources {
  private manager: LoadingManager | undefined
  private callback: () => void;
  private textureLoader!: InstanceType<typeof TextureLoader>;
  public textures: Record<string, Texture>;
  constructor(callback: () => void) {
    this.callback = callback // Callback ejecutado al terminar la carga de recursos

    this.textures = {} // Objeto de texturas cargadas

    this.setLoadingManager()
    this.loadResources()
  }

  /**
   * Gestiona el estado de la carga
   */
  private setLoadingManager() {

    this.manager = new LoadingManager()
    // Inicio de la carga
    this.manager.onStart = () => {
      console.log('Comenzando a cargar los recursos')
    }
    // Carga completada
    this.manager.onLoad = () => {
      this.callback()
    }
    // En progreso
    this.manager.onProgress = (url) => {
      console.log(`Cargando: ${url}`)
    }

    this.manager.onError = url => {
      console.log('Error al cargar: ' + url)
    }

  }

  /**
   * Carga los recursos
   */
  private loadResources(): void {
    this.textureLoader = new TextureLoader(this.manager)
    resources.textures?.forEach((item) => {
      this.textureLoader.load(item.url, (t) => {
        this.textures[item.name] = t
      })
    })
  }
}
