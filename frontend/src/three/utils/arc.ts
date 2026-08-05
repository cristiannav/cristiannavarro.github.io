
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ArcCurve, BufferAttribute, BufferGeometry,
Color, Line, LineBasicMaterial, Points, PointsMaterial, 
Quaternion, Vector3 } from 'three';
import { lon2xyz } from './common';

/*
 * Dibuja un arco de línea de vuelo
 * Parámetros: (radio del arco de la trayectoria, ángulo de inicio, ángulo de fin)
 */
function createFlyLine(radius, startAngle, endAngle,color) {
  const geometry = new BufferGeometry(); // declara un objeto de geometría BufferGeometry
  // ArcCurve crea la curva de arco
  const arc = new ArcCurve(0, 0, radius, startAngle, endAngle, false);
  // getSpacedPoints es un método de la clase base Curve; devuelve un array de objetos Vector2
  const pointsArr = arc.getSpacedPoints(100); // 80 segmentos → 81 vértices
  geometry.setFromPoints(pointsArr); // setFromPoints extrae datos de pointsArr y actualiza el atributo de vértices de la geometría
  // Cada vértice tiene un dato de porcentaje en attributes.percent para controlar el tamaño de renderizado del punto
  const percentArr = []; // datos de attributes.percent
  for (let i = 0; i < pointsArr.length; i++) {
    percentArr.push(i / pointsArr.length);
  }
  const percentAttribue = new BufferAttribute(
    new Float32Array(percentArr),
    1
  );
  // El atributo percent hace que los puntos varíen de grande a pequeño, produciendo la forma de renacuajo de la línea de vuelo
  geometry.attributes.percent = percentAttribue;
  // Calcula en bloque los datos de color de todos los vértices
  const colorArr = [];
  for (let i = 0; i < pointsArr.length; i++) {
    const color1 = new Color(0xec8f43); // color de la trayectoria: naranja
    const color2 = new Color(0xf3ae76); // amarillo
    const color = color1.lerp(color2, i / pointsArr.length);
    colorArr.push(color.r, color.g, color.b);
  }
  // Asigna los datos de color de vértices a la geometría
  geometry.attributes.color = new BufferAttribute(
    new Float32Array(colorArr),
    3
  );
  const size = 1.3;
  // Modelo de puntos que renderiza cada vértice de la geometría
  const material = new PointsMaterial({
    size, // tamaño del punto
    // vertexColors: VertexColors, // renderizado con colores por vértice
    transparent: true,
    depthWrite: false,
  });
  // Modifica el código fuente del shader del material de puntos (los detalles pueden variar entre versiones, pero la idea general es la misma)
  material.onBeforeCompile = function (shader) {
    // Declara una variable attribute en el vertex shader: porcentaje
    shader.vertexShader = shader.vertexShader.replace(
      "void main() {",
      [
        "attribute float percent;", // variable de porcentaje de tamaño por vértice, controla el tamaño de renderizado del punto
        "void main() {",
      ].join("\n") // .join() convierte el array en una cadena
    );
    // Ajusta el cálculo del tamaño de renderizado del punto
    shader.vertexShader = shader.vertexShader.replace(
      "gl_PointSize = size;",
      ["gl_PointSize = percent * size;"].join("\n") // .join() convierte el array en una cadena
    );
  };
  const FlyLine = new Points(geometry, material);
  material.color = new Color(color)
  FlyLine.name = "linea-de-vuelo";

  return FlyLine;
}


/**
 * Dadas las coordenadas geográficas de dos puntos en la Tierra,
 * flyArc dibuja la trayectoria de arco de una línea de vuelo.
 * lon1, lat1: longitud/latitud del punto de inicio
 * lon2, lat2: longitud/latitud del punto de fin
 */
function flyArc(radius, lon1, lat1, lon2, lat2,options) {
  const sphereCoord1 = lon2xyz(radius, lon1, lat1); // convierte coordenadas geográficas a esféricas
  // startSphereCoord: coordenadas esféricas del punto de inicio de la trayectoria
  const startSphereCoord = new Vector3(sphereCoord1.x, sphereCoord1.y, sphereCoord1.z);
  const sphereCoord2 = lon2xyz(radius, lon2, lat2);
  // endSphereCoord: coordenadas esféricas del punto de fin de la trayectoria
  const endSphereCoord = new Vector3(sphereCoord2.x, sphereCoord2.y, sphereCoord2.z);

  // Calcula el punto de inicio, el de fin (simétricos respecto al eje Y) y el cuaternión de rotación necesarios para dibujar el arco
  const startEndQua = _3Dto2D(startSphereCoord, endSphereCoord)
  // Llama a arcXOY para dibujar la trayectoria de arco de la línea de vuelo
  const arcline = arcXOY(radius, startEndQua.startPoint, startEndQua.endPoint,options);
  arcline.quaternion.multiply(startEndQua.quaternion)
  return arcline;
}
/*
 * Rota el punto de inicio y el de fin de la línea de vuelo (en la esfera 3D) alrededor del
 * centro de la esfera hasta el plano XOY, manteniendo la simetría respecto al eje Y.
 * Con los nuevos puntos obtenidos se dibuja un arco, que luego se
 * rota inversamente hasta las posiciones originales.
 */
function _3Dto2D(startSphere, endSphere) {
  /* Calcula el cuaternión de la primera rotación: representa cómo rotar de un plano a otro */
  const origin = new Vector3(0, 0, 0); // coordenadas del centro de la esfera
  const startDir = startSphere.clone().sub(origin); // vector dirección del punto de inicio al centro
  const endDir = endSphere.clone().sub(origin); // vector dirección del punto de fin al centro
  // dir1 y dir2 forman un triángulo; .cross() calcula la normal de ese triángulo
  const normal = startDir.clone().cross(endDir).normalize();
  const xoyNormal = new Vector3(0, 0, 1); // normal del plano XOY
  // .setFromUnitVectors() calcula el cuaternión necesario para rotar de normal a xoyNormal
  // quaternion3D_XOY representa la rotación que lleva la línea de vuelo esférica al plano XOY
  const quaternion3D_XOY = new Quaternion().setFromUnitVectors(normal, xoyNormal);
  /* Primera rotación: los puntos de inicio y fin pasan del espacio 3D al plano XOY */
  const startSphereXOY = startSphere.clone().applyQuaternion(quaternion3D_XOY);
  const endSphereXOY = endSphere.clone().applyQuaternion(quaternion3D_XOY);

  /* Calcula el cuaternión de la segunda rotación */
  // middleV3: punto medio entre startSphereXOY y endSphereXOY
  const middleV3 = startSphereXOY.clone().add(endSphereXOY).multiplyScalar(0.5);
  const midDir = middleV3.clone().sub(origin).normalize(); // vector antes de rotar: dirección del punto medio al centro
  const yDir = new Vector3(0, 1, 0); // vector objetivo: eje Y
  // .setFromUnitVectors() calcula el cuaternión para rotar de midDir a yDir
  // quaternionXOY_Y logra que los puntos en el plano XOY queden simétricos respecto al eje Y
  const quaternionXOY_Y = new Quaternion().setFromUnitVectors(midDir, yDir);

  /* Segunda rotación: rota los puntos ya en el plano XOY para que sean simétricos respecto al eje Y */
  const startSpherXOY_Y = startSphereXOY.clone().applyQuaternion(quaternionXOY_Y);
  const endSphereXOY_Y = endSphereXOY.clone().applyQuaternion(quaternionXOY_Y);

  /**
   * Un cuaternión representa un proceso de rotación.
   * .invert() devuelve el cuaternión inverso (deshace la rotación).
   * Se calcula el inverso de cada cuaternión y luego se multiplican.
   * (En versiones nuevas .invert() equivale al antiguo .inverse())
   */
  const quaternionInverse = quaternion3D_XOY.clone().invert().multiply(quaternionXOY_Y.clone().invert())
  return {
    // Devuelve el cuaternión inverso de las dos rotaciones combinadas
    quaternion: quaternionInverse,
    // Devuelve las coordenadas del arco (simétricas respecto al eje Y en el plano XOY) tras las dos rotaciones
    startPoint: startSpherXOY_Y,
    endPoint: endSphereXOY_Y,
  }
}
/**
 * arcXOY() dibuja en el plano XOY una curva de arco simétrica respecto al eje Y.
 * startPoint, endPoint: coordenadas del inicio y fin del arco (simétricas respecto al eje Y).
 * Además, dibuja un segmento de línea de vuelo sobre la trayectoria del arco.
 */
function arcXOY(radius,startPoint, endPoint,options) {
  // Calcula el punto medio entre los dos puntos
  const middleV3 = new Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
  // Dirección de la mediatriz (vector del punto medio de la cuerda al centro del arco)
  const dir = middleV3.clone().normalize()
  // Calcula el ángulo en radianes formado por el inicio, el fin y el centro de la esfera
  const earthRadianAngle = radianAOB(startPoint, endPoint, new Vector3(0, 0, 0))
  /* Coordenada del punto superior del arco de la trayectoria de vuelo.
     ángulo_rad * radius * 0.2: altura del tope del arco sobre la superficie terrestre.
     Cuanto más separados estén los puntos, más alto es el arco. */
  const arcTopCoord = dir.multiplyScalar(radius + earthRadianAngle * radius * 0.2) // altura de la línea de vuelo
  // Calcula el centro del circunscrito de tres puntos (centro del arco de la trayectoria de vuelo)
  const flyArcCenter = threePointCenter(startPoint, endPoint, arcTopCoord)
  // Radio del arco de la trayectoria flyArcR
  const flyArcR = Math.abs(flyArcCenter.y - arcTopCoord.y);
  /* Ángulo en radianes entre la línea (origen → inicio del arco) y el semieje Y negativo.
     Parámetros: punto de inicio del arco de vuelo, un punto en el semieje Y negativo, centro del arco de vuelo. */
  const flyRadianAngle = radianAOB(startPoint, new Vector3(0, -1, 0), flyArcCenter);
  const startAngle = -Math.PI / 2 + flyRadianAngle; // ángulo de inicio del arco de vuelo
  const endAngle = Math.PI - startAngle; // ángulo de fin del arco de vuelo
  // Llama a la función de dibujo del modelo de línea de arco
  const arcline = circleLine(flyArcCenter.x, flyArcCenter.y, flyArcR, startAngle, endAngle, options.color)
  // const arcline = new Group(); // para no dibujar la trayectoria, reemplazar circleLine() con Group
  arcline.center = flyArcCenter; // atributo personalizado: centro del arco de vuelo
  arcline.topCoord = arcTopCoord; // atributo personalizado: coordenada del punto superior (tope) del arco

  // const flyAngle = Math.PI / 10; // arco fijo de la línea de vuelo
  const flyAngle = (endAngle - startAngle) / 7; // el arco de la línea de vuelo es proporcional al de la trayectoria
  // Dibuja el segmento de línea de vuelo tomando el centro como origen de coordenadas
  const flyLine = createFlyLine(flyArcR, startAngle, startAngle + flyAngle, options.flyLineColor);
  flyLine.position.y = flyArcCenter.y; // traslada la línea de vuelo para que coincida con el arco de la trayectoria
  // El segmento flyLine es hijo de arcLine, heredando sus transformaciones de traslación y rotación
  arcline.add(flyLine);
  // Rango de movimiento del segmento de vuelo: startAngle ~ flyEndAngle
  flyLine.flyEndAngle = endAngle - startAngle - flyAngle;
  flyLine.startAngle = startAngle;
  // AngleZ: posición angular actual del segmento de vuelo; se inicializa con un valor aleatorio para la demo
  flyLine.AngleZ = arcline.flyEndAngle * Math.random();
  // flyLine.rotation.z = arcline.AngleZ;
  // arcline.flyLine apunta al segmento de vuelo para facilitar el acceso durante la animación
  arcline.userData['flyLine'] = flyLine;

  return arcline
}
/*
 * Calcula el ángulo en radianes formado por dos puntos en la esfera y el centro.
 * point1, point2: coordenadas Vector3 de dos puntos en la superficie terrestre.
 * Calcula el ángulo AOB entre los puntos A, B y el vértice O.
 */
function radianAOB(A, B, O) {
  // dir1, dir2: vectores dirección desde el centro de la esfera a cada punto
  const dir1 = A.clone().sub(O).normalize();
  const dir2 = B.clone().sub(O).normalize();
  // Producto escalar .dot() para calcular el coseno del ángulo
  const cosAngle = dir1.clone().dot(dir2);
  const radianAngle = Math.acos(cosAngle); // convierte el coseno a radianes (rango 0~180°)
  return radianAngle
}
/*
 * Dibuja un modelo de línea de arco (Line).
 * Parámetros: (coordenada X del centro, coordenada Y del centro, radio del arco de vuelo, ángulo de inicio, ángulo de fin)
 */
function circleLine(x, y, r, startAngle, endAngle,color) {
  const geometry = new BufferGeometry(); // declara un objeto de geometría BufferGeometry
  // ArcCurve crea la curva de arco
  const arc = new ArcCurve(x, y, r, startAngle, endAngle, false);
  // getSpacedPoints es un método de la clase base Curve; devuelve un array de objetos Vector2
  const points = arc.getSpacedPoints(80); // 50 segmentos → 51 vértices
  geometry.setFromPoints(points); // setFromPoints extrae datos de points y actualiza los vértices de la geometría
  const material = new LineBasicMaterial({
    color:color || 0xd18547,
  }); // material de línea
  const line = new Line(geometry, material); // objeto de modelo de línea
  return line;
}
// Calcula el centro del circunscrito de tres puntos; p1, p2, p3 son coordenadas Vector3.
function threePointCenter(p1, p2, p3) {
  const L1 = p1.lengthSq(); // cuadrado de la distancia de p1 al origen
  const L2 = p2.lengthSq();
  const L3 = p3.lengthSq();
  const x1 = p1.x,
    y1 = p1.y,
    x2 = p2.x,
    y2 = p2.y,
    x3 = p3.x,
    y3 = p3.y;
  const S = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
  const x = (L2 * y3 + L1 * y2 + L3 * y1 - L2 * y1 - L3 * y2 - L1 * y3) / S / 2;
  const y = (L3 * x2 + L2 * x1 + L1 * x3 - L1 * x2 - L2 * x3 - L3 * x1) / S / 2;
  // Coordenadas del centro del circunscrito de los tres puntos
  const center = new Vector3(x, y, 0);
  return center
}


export {
  arcXOY,
  flyArc
}
