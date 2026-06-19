import {
  BufferAttribute, BufferGeometry, Color, Group, Material, Mesh, MeshBasicMaterial, NormalBlending,
  Points, PointsMaterial, ShaderMaterial,
  SphereGeometry, Sprite, SpriteMaterial, Texture, Vector3
} from "three";

//import html2canvas from "html2canvas";

import earthVertex from './shaders/earth/vertex.vs';
import earthFragment from './shaders/earth/fragment.fs';
import { createLightPillar, createPointMesh, createWaveMesh } from "./utils/common";
import gsap from "gsap";
//import { flyArc } from "./utils/arc";

export type punctuation = {
  circleColor: number,
  lightColumn: {
    startColor: number, // color de inicio
    endColor: number, // color final
  },
}

type options = {
  data: {
    startArray: {
      name: string,
      E: number, // longitud
      N: number, // latitud
    },
    endArray: {
      name: string,
      E: number, // longitud
      N: number, // latitud
    }[]
  }[]
  dom: HTMLElement,
  textures: Record<string, Texture>, // texturas
  earth: {
    radius: number, // radio de la Tierra
    rotateSpeed: number, // velocidad de rotación de la Tierra
    isRotation: boolean // si el grupo Tierra debe auto-rotar
  }
  satellite: {
    show: boolean, // si se muestran los satélites
    rotateSpeed: number, // velocidad de rotación
    size: number, // tamaño del satélite
    number: number, // cantidad de esferas por anillo
  },
  punctuation: punctuation,
  flyLine: {
    color: number, // color de la línea de vuelo
    speed: number, // velocidad de la cola de la línea de vuelo
    flyLineColor: number // color de la línea de vuelo animada
  },
}
type uniforms = {
  glowColor: { value: Color; }
  scale: { type: string; value: number; }
  bias: { type: string; value: number; }
  power: { type: string; value: number; }
  time: { type: string; value: number; }
  isHover: { value: boolean; };
  map: { value: Texture | null }
}

export default class earth {

  public group: Group;
  public earthGroup: Group;

  public around!: BufferGeometry
  public aroundPoints!: Points<BufferGeometry, PointsMaterial>;

  public options: options;
  public uniforms: uniforms
  public timeValue: number;

  public earth!: Mesh<SphereGeometry, ShaderMaterial>;
  public punctuationMaterial!: MeshBasicMaterial;
  public markupPoint: Group;
  public waveMeshArr: Mesh[];

  public circleLineList: Mesh[];
  public circleList: Mesh[];
  public x: number;
  public n: number;
  public isRotation: boolean;
  public flyLineArcGroup!: Group;

  constructor(options: options) {

    this.options = options;

    this.group = new Group()
    this.group.name = "group";
    this.group.scale.set(0, 0, 0)
    this.earthGroup = new Group()
    this.group.add(this.earthGroup)
    this.earthGroup.name = "EarthGroup";

    // Efecto de punto de marcado
    this.markupPoint = new Group()
    this.markupPoint.name = "markupPoint"
    this.waveMeshArr = []

    // Satélites y etiquetas
    this.circleLineList = []
    this.circleList = [];
    this.x = 0;
    this.n = 0;

    // Rotación propia de la Tierra
    this.isRotation = this.options.earth.isRotation

    // Shader de animación de barrido de luz
    this.timeValue = 100
    this.uniforms = {
      glowColor: {
        value: new Color(0x0cd1eb),
      },
      scale: {
        type: "f",
        value: -1.0,
      },
      bias: {
        type: "f",
        value: 1.0,
      },
      power: {
        type: "f",
        value: 3.3,
      },
      time: {
        type: "f",
        value: this.timeValue,
      },
      isHover: {
        value: false,
      },
      map: {
        value: null,
      },
    };

  }

  async init(): Promise<void> {
    this.createEarth(); // Crea la Tierra
    this.createStars(); // Agrega las estrellas
    this.createEarthGlow() // Crea el halo de la Tierra
    this.createEarthAperture() // Crea la atmósfera de la Tierra
    await this.createMarkupPoint() // Crea los puntos de luz (columnas)

    this.show()
  }

  createEarth() {
    const earth_geometry = new SphereGeometry(
      this.options.earth.radius,
      50,
      50
    );

    const earth_border = new SphereGeometry(
      this.options.earth.radius + 10,
      60,
      60
    );

    const pointMaterial = new PointsMaterial({
      color: 0x81ffff, // color de los puntos, por defecto 0xFFFFFF
      transparent: true,
      sizeAttenuation: true,
      opacity: 0.1,
      vertexColors: false, // si se usan colores por vértice; si es true, la propiedad color queda ignorada
      size: 0.01, // tamaño de cada partícula; por defecto 1.0
    })
    const points = new Points(earth_border, pointMaterial); // agrega el modelo a la escena

    this.earthGroup.add(points);

    this.uniforms.map.value = this.options.textures.earth;

    const earth_material = new ShaderMaterial({
      // wireframe:true, // muestra la malla del modelo
      uniforms: this.uniforms,
      vertexShader: earthVertex,
      fragmentShader: earthFragment,
    });

    earth_material.needsUpdate = true;
    this.earth = new Mesh(earth_geometry, earth_material);
    this.earth.name = "earth";
    this.earthGroup.add(this.earth);

  }

  createStars() {

    const vertices: number[] = []
    const colors: number[] = []
    for (let i = 0; i < 500; i++) {
      const vertex = new Vector3();
      vertex.x = 800 * Math.random() - 300;
      vertex.y = 800 * Math.random() - 300;
      vertex.z = 800 * Math.random() - 300;
      vertices.push(vertex.x, vertex.y, vertex.z);
      colors.push(1, 1, 1);
    }

    // Efecto de cielo estrellado
    this.around = new BufferGeometry()
    this.around.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
    this.around.setAttribute("color", new BufferAttribute(new Float32Array(colors), 3));

    const aroundMaterial = new PointsMaterial({
      size: 2,
      sizeAttenuation: true, // atenuación por distancia
      color: 0x4d76cf,
      transparent: true,
      opacity: 1,
      map: this.options.textures.gradient,
    });

    this.aroundPoints = new Points(this.around, aroundMaterial);
    this.aroundPoints.name = "cielo-estrellado";
    this.aroundPoints.scale.set(1, 1, 1);
    this.group.add(this.aroundPoints);
  }

  createEarthGlow() {
    const R = this.options.earth.radius; // radio de la Tierra

    // TextureLoader: crea el objeto cargador de textura para cargar una imagen como textura
    const texture = this.options.textures.glow; // carga la textura

    // Crea el material de sprite SpriteMaterial
    const spriteMaterial = new SpriteMaterial({
      map: texture, // asigna la textura al sprite
      color: 0x4390d1,
      transparent: true, // habilita la transparencia
      opacity: 0.7, // ajusta la opacidad global del halo
      depthWrite: false, // deshabilita escritura en el búfer de profundidad
    });

    // Crea el modelo sprite que representa el halo de la Tierra
    const sprite = new Sprite(spriteMaterial);
    sprite.scale.set(R * 3.0, R * 3.0, 1); // escala el sprite proporcionalmente
    this.earthGroup.add(sprite);
  }

  createEarthAperture() {

    const vertexShader = [
      "varying vec3	vVertexWorldPosition;",
      "varying vec3	vVertexNormal;",
      "varying vec4	vFragColor;",
      "void main(){",
      "	vVertexNormal	= normalize(normalMatrix * normal);", // transforma la normal al espacio de vista
      "	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;", // transforma el vértice al espacio de mundo
      "	// set gl_Position",
      "	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
      "}",
    ].join("\n");

    // Efecto de atmósfera
    const AeroSphere = {
      uniforms: {
        coeficient: {
          type: "f",
          value: 1.0,
        },
        power: {
          type: "f",
          value: 3,
        },
        glowColor: {
          type: "c",
          value: new Color(0x4390d1),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: [
        "uniform vec3	glowColor;",
        "uniform float	coeficient;",
        "uniform float	power;",

        "varying vec3	vVertexNormal;",
        "varying vec3	vVertexWorldPosition;",

        "varying vec4	vFragColor;",

        "void main(){",
        "	vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;", // vector de la cámara al vértice en espacio de mundo
        "	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;", // vector de la cámara al vértice en espacio de vista
        "	viewCameraToVertex= normalize(viewCameraToVertex);", // normalización
        "	float intensity	= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);",
        "	gl_FragColor = vec4(glowColor, intensity);",
        "}",
      ].join("\n"),
    };
    // Esfera: resplandor y atmósfera
    const material1 = new ShaderMaterial({
      uniforms: AeroSphere.uniforms,
      vertexShader: AeroSphere.vertexShader,
      fragmentShader: AeroSphere.fragmentShader,
      blending: NormalBlending,
      transparent: true,
      depthWrite: false,
    });
    const sphere = new SphereGeometry(
      this.options.earth.radius + 0,
      50,
      50
    );
    const mesh = new Mesh(sphere, material1);
    this.earthGroup.add(mesh);
  }

  async createMarkupPoint() {

    await Promise.all(this.options.data.map(async (item) => {

      const radius = this.options.earth.radius;
      const lon = item.startArray.E; // longitud
      const lat = item.startArray.N; // latitud

      this.punctuationMaterial = new MeshBasicMaterial({
        color: this.options.punctuation.circleColor,
        map: this.options.textures.label,
        transparent: true, // usa PNG con fondo transparente; habilita el cálculo de transparencia
        depthWrite: false, // deshabilita escritura en el búfer de profundidad
      });

      const mesh = createPointMesh({ radius, lon, lat, material: this.punctuationMaterial }); // plano rectangular base de la columna de luz
      this.markupPoint.add(mesh);
      const LightPillar = createLightPillar({
        radius: this.options.earth.radius,
        lon,
        lat,
        index: 0,
        textures: this.options.textures,
        punctuation: this.options.punctuation,
      }); // columna de luz
      this.markupPoint.add(LightPillar);
      const WaveMesh = createWaveMesh({ radius, lon, lat, textures: this.options.textures }); // anillo de onda
      this.markupPoint.add(WaveMesh);
      this.waveMeshArr.push(WaveMesh);

      await Promise.all(item.endArray.map((obj) => {
        const lon = obj.E; // longitud
        const lat = obj.N; // latitud
        const mesh = createPointMesh({ radius, lon, lat, material: this.punctuationMaterial }); // plano rectangular base de la columna de luz
        this.markupPoint.add(mesh);
        const LightPillar = createLightPillar({
          radius: this.options.earth.radius,
          lon,
          lat,
          index: 1,
          textures: this.options.textures,
          punctuation: this.options.punctuation
        }); // columna de luz
        this.markupPoint.add(LightPillar);
        const WaveMesh = createWaveMesh({ radius, lon, lat, textures: this.options.textures }); // anillo de onda
        this.markupPoint.add(WaveMesh);
        this.waveMeshArr.push(WaveMesh);
      }))
      this.earthGroup.add(this.markupPoint)
    }))
  }

  show() {
    gsap.to(this.group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: "Quadratic",
    })
  }

  render() {

    this.flyLineArcGroup?.userData['flyLineArray']?.forEach((fly: { rotation: { z: number }; flyEndAngle: number }) => {
      fly.rotation.z += this.options.flyLine.speed; // controla la velocidad de la línea de vuelo
      if (fly.rotation.z >= fly.flyEndAngle) fly.rotation.z = 0;
    })

    if (this.isRotation) {
      this.earthGroup.rotation.y += this.options.earth.rotateSpeed;
    }

    this.uniforms.time.value =
      this.uniforms.time.value < -this.timeValue
        ? this.timeValue
        : this.uniforms.time.value - 1;

    if (this.waveMeshArr.length) {
      this.waveMeshArr.forEach((mesh: Mesh) => {
        mesh.userData['scale'] += 0.007;
        mesh.scale.set(
          mesh.userData['size'] * mesh.userData['scale'],
          mesh.userData['size'] * mesh.userData['scale'],
          mesh.userData['size'] * mesh.userData['scale']
        );
        if (mesh.userData['scale'] <= 1.5) {
          (mesh.material as Material).opacity = (mesh.userData['scale'] - 1) * 2; // factor 2 = 1/(1.5-1.0); mantiene la opacidad entre 0 y 1
        } else if (mesh.userData['scale'] > 1.5 && mesh.userData['scale'] <= 2) {
          (mesh.material as Material).opacity = 1 - (mesh.userData['scale'] - 1.5) * 2; // factor 2 = 1/(2.0-1.5); escala 2→opacidad 0, escala 1.5→opacidad 1
        } else {
          mesh.userData['scale'] = 1;
        }
      });
    }

  }

}