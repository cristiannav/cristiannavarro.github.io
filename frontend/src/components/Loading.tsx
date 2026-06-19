/**
 * Pantalla de carga mostrada mientras se descargan las texturas.
 */
export default function Loading() {
  return (
    <div id="loading">
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
      <div>Cargando recursos...</div>
    </div>
  )
}
