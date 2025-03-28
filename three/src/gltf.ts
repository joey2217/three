import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 添加环境光和方向光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 0, 0);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/libs/draco/");
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  "/gltf/ruins.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
);

// camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // 启用阻尼效果（惯性）
// controls.dampingFactor = 0.05; // 阻尼系数

function updateCamera() {
  camera.position.set(debug.cameraX, debug.cameraY, debug.cameraZ);
  camera.lookAt(0, 0, 0);
}

const gui = new GUI();
const debug = {
  cameraX: 0,
  cameraY: 0,
  cameraZ: 5,
};

gui.add(debug, "cameraX", -10, 10).onChange(updateCamera);
gui.add(debug, "cameraY", -10, 10).onChange(updateCamera);
gui.add(debug, "cameraZ", -10, 10).onChange(updateCamera);

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}

animate();
