import { useState } from "react";
import { useEarthWorld } from "../hooks/useEarthWorld";
import Loading from "./Loading";

/**
 * Contenedor de la visualización 3D. Monta el mundo Three.js mediante el
 * hook y muestra la pantalla de carga hasta que los recursos están listos.
 */
export default function EarthCanvas() {
  const [cargando, setCargando] = useState(true);
  const containerRef = useEarthWorld(() => setCargando(false));

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {cargando && <Loading />}
      {/* Div oculto que html2canvas usa para generar las etiquetas de ciudades */}
      <div id="html2canvas" className="css3d-wapper">
        <div className="fire-div" />
      </div>
      <div id="earth-canvas" ref={containerRef} className="h-full w-full" />
    </div>
  );
}
