import * as three from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FireMesh } from '@wolffo/three-fire/vanilla';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let canvas = document.getElementById("container");
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new three.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(w,h);

const camera = new three.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.x = 6.306156422750103;
camera.position.y = 2.0155586352267507;
camera.position.z = -0.48404333690019063;

camera.rotation.x = 3.0242352984350216;
camera.rotation.y = 0.3633008502270386;
camera.rotation.z = -3.0522289089132313;

const scene = new three.Scene();
//scene.fog = new three.Fog(0x000000, 0, 50);
//scene.fog = new three.FogExp2(0x000000, 0.15);
const loader = new GLTFLoader();
const cubeLoader = new three.CubeTextureLoader();
const skyTexture = cubeLoader.load([
    './taptheglass/Skybox/px.png', './taptheglass/Skybox/nx.png', './taptheglass/Skybox/py.png', './taptheglass/Skybox/ny.png', './taptheglass/Skybox/pz.png', './taptheglass/Skybox/nz.png'
]);

scene.background = skyTexture;
scene.environment = skyTexture;


//const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableDamping = true;
//controls.dampingFactor = 0.05;

const diorama = await loader.loadAsync('./Models/diorama.glb');
scene.add(diorama.scene)
diorama.scene.position.y = -50;
diorama.scene.position.x = 12;
diorama.scene.position.z = 10;
diorama.scene.rotation.y = -56.08;

const crabe = await loader.loadAsync('./Models/Crabe.glb');
scene.add(crabe.scene)
crabe.scene.position.z = 1;
crabe.scene.position.y = 0;
crabe.scene.position.x = -2;

const hemiLight = new three.HemisphereLight(0xcafeff,1);
scene.add(hemiLight);

function update(){
    requestAnimationFrame(update);

	//controls.update();
    renderer.render(scene, camera);
}
update();


function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);


let oldX = 0;
let oldY = 0;
let firstMove = true;
window.onmousemove = function(ev)
{
  if (firstMove) {
      oldX = ev.x;
      oldY = ev.y;
      firstMove = false;
      return;
  }

  let changeX = ev.x - oldX;
  let changeY = ev.y - oldY;
  camera.position.z += changeX/1000;
  camera.position.y -= changeY/1000;

  oldX = ev.x;
  oldY = ev.y;
}