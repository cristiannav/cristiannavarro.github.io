import { CatmullRomCurve3, DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Texture, TubeGeometry, Vector3 } from "three";
import type { Material } from "three";
import type { punctuation } from "../Earth";


/**
 * Convierte coordenadas de longitud/latitud a coordenadas esféricas
 * @param {radio de la Tierra} R
 * @param {longitud (en grados)} longitude
 * @param {latitud (en grados)} latitude
 */
export const lon2xyz = (R:number, longitude:number, latitude:number): Vector3 => {
  let lon = longitude * Math.PI / 180; // convierte a radianes
  const lat = latitude * Math.PI / 180; // convierte a radianes
  lon = -lon; // en el sistema de coordenadas de JS, el eje Z corresponde a longitud -90°, no 90°

  // Fórmula de conversión de coordenadas geográficas a coordenadas esféricas
  const x = R * Math.cos(lat) * Math.cos(lon);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.sin(lon);
  // Devuelve las coordenadas esféricas
  return new Vector3(x, y, z);
}

// Crea el anillo de onda
export const createWaveMesh = (options: { radius: number, lon: number, lat: number, textures: Record<string, Texture> }) => {
  const geometry = new PlaneGeometry(1, 1); // por defecto en el plano XOY
  const texture = options.textures.aperture;

  const material = new MeshBasicMaterial({
    color: 0xe99f68,
    map: texture,
    transparent: true, // usa PNG con fondo transparente; habilita el cálculo de transparencia
    opacity: 1.0,
    depthWrite: false, // deshabilita escritura en el búfer de profundidad
  });
  const mesh = new Mesh(geometry, material);
  // Convierte longitud/latitud a coordenadas esféricas
  const coord = lon2xyz(options.radius * 1.001, options.lon, options.lat);
  const size = options.radius * 0.12; // tamaño del plano rectangular del mesh
  mesh.scale.set(size, size, size); // establece el tamaño del mesh
  mesh.userData['size'] = size; // atributo personalizado: tamaño estático del mesh
  mesh.userData['scale'] = Math.random() * 1.0; // atributo personalizado: factor de escala dinámico (el anillo oscila entre 1× y 2× el tamaño original)
  mesh.position.set(coord.x, coord.y, coord.z);
  const coordVec3 = new Vector3(coord.x, coord.y, coord.z).normalize();
  const meshNormal = new Vector3(0, 0, 1);
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
  return mesh;
}

// Crea la columna de luz
export const createLightPillar = (options: { radius: number, lon: number, lat: number, index: number, textures: Record<string, Texture>, punctuation: punctuation }) => {
  const height = options.radius * 0.3;
  const geometry = new PlaneGeometry(options.radius * 0.05, height);
  geometry.rotateX(Math.PI / 2);
  geometry.translate(0, 0, height / 2);
  const material = new MeshBasicMaterial({
    map: options.textures.light_column,
    color:
      options.index == 0
        ? options.punctuation.lightColumn.startColor
        : options.punctuation.lightColumn.endColor,
    transparent: true,
    side: DoubleSide,
    depthWrite: false, // sin efecto sobre el búfer de profundidad
  });
  const mesh = new Mesh(geometry, material);
  const group = new Group();
  // Dos columnas de luz cruzadas superpuestas
  group.add(mesh, mesh.clone().rotateZ(Math.PI / 2)); // la geometría se rotó en X, por eso el eje de rotación del mesh es Z
  // Convierte longitud/latitud a coordenadas esféricas
  const SphereCoord = lon2xyz(options.radius, options.lon, options.lat); // coordenadas esféricas
  group.position.set(SphereCoord.x, SphereCoord.y, SphereCoord.z); // establece la posición del mesh
  const coordVec3 = new Vector3(
    SphereCoord.x,
    SphereCoord.y,
    SphereCoord.z
  ).normalize();
  const meshNormal = new Vector3(0, 0, 1);
  group.quaternion.setFromUnitVectors(meshNormal, coordVec3);
  return group;
}

// Plano rectangular de la base de la columna de luz
export const createPointMesh = (options: {
  radius: number, lon: number,
  lat: number, material: MeshBasicMaterial
}) => {

  const geometry = new PlaneGeometry(1, 1); // por defecto en el plano XOY
  const mesh = new Mesh(geometry, options.material);
  // Convierte longitud/latitud a coordenadas esféricas
  const coord = lon2xyz(options.radius * 1.001, options.lon, options.lat);
  const size = options.radius * 0.05; // tamaño del plano rectangular del mesh
  mesh.scale.set(size, size, size); // establece el tamaño del mesh

  // Establece la posición del mesh
  mesh.position.set(coord.x, coord.y, coord.z);
  const coordVec3 = new Vector3(coord.x, coord.y, coord.z).normalize();
  const meshNormal = new Vector3(0, 0, 1);
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
  return mesh;

}

// Obtiene los puntos del círculo
export const getCirclePoints = (option: { radius?: number, number?: number, closed?: boolean }) => {
  const list: number[][] = [];
  for (
    let j = 0;
    j < 2 * Math.PI - 0.1;
    j += (2 * Math.PI) / (option.number || 100)
  ) {
    list.push([
      parseFloat((Math.cos(j) * (option.radius || 10)).toFixed(2)),
      0,
      parseFloat((Math.sin(j) * (option.radius || 10)).toFixed(2)),
    ]);
  }
  if (option.closed) list.push(list[0]);
  return list;
}

// Crea la línea

/**
 * Crea la línea animada
 */
export const createAnimateLine = (option: {
  pointList: number[][],
  material: Material,
  number?: number,
  radius?: number,
  radialSegments?: number,
}) => {
  // Curva formada por múltiples puntos, normalmente usada para trayectorias
  const l: Vector3[] = [];
  option.pointList.forEach((e: number[]) =>
    l.push(new Vector3(e[0], e[1], e[2]))
  );
  const curve = new CatmullRomCurve3(l); // trayectoria de la curva

  // Geometría tubular
  const tubeGeometry = new TubeGeometry(
    curve,
    option.number || 50,
    option.radius || 1,
    option.radialSegments
  );
  return new Mesh(tubeGeometry, option.material);
}