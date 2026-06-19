import { useEffect, useRef } from 'react'
import World from '../three/World'

/**
 * Monta el mundo Three.js dentro del div referenciado y lo libera al
 * desmontar el componente. `onReady` se invoca cuando los recursos
 * terminan de cargar.
 */
export function useEarthWorld(onReady: () => void) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dom = containerRef.current
    if (!dom) return
    const world = new World({ dom, onReady })
    // Limpieza: detiene el render loop y libera el renderer (clave en StrictMode)
    return () => world.dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return containerRef
}
