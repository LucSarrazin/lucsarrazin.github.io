import * as three from "three";
import { TextureLoader } from "three";
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
camera.rotation.y = 0.8633008502270386;
camera.rotation.z = -3.0522289089132313;

const scene = new three.Scene();
//scene.fog = new three.Fog(0x000000, 0, 50);
scene.fog = new three.FogExp2(0x000000, 0.15);
const loader = new GLTFLoader();
const textureLoader = new TextureLoader()
//const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableDamping = true;
//controls.dampingFactor = 0.05;

const tunnel = await loader.loadAsync('./Models/tunnel.glb');
scene.add(tunnel.scene)


const screamer = await loader.loadAsync('./Models/screameur.glb');
scene.add(screamer.scene)
screamer.scene.position.z = -1;
screamer.scene.position.y = 2;
screamer.scene.position.x = -6.5;
screamer.scene.traverse((child) => {
    if (!child.isMesh) return;

    const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

    materials.forEach((material) => {
        if (material.map) {
            material.emissiveMap = material.map;
            material.emissive.set(0xffffff);
            material.emissiveIntensity = 5;
            material.needsUpdate = true;
        }
    });
});

const torche = await loader.loadAsync('./Models/torche.glb');
scene.add(torche.scene)
torche.scene.position.z = -2.5;
torche.scene.position.y = 2;
torche.scene.position.x = -2;

torche.scene.rotation.x = -50;

const fireTexture = textureLoader.load('../Fire.png')
const light = new three.PointLight(0xFF9445, 15);
scene.add(light);
light.position.z = -1;
light.position.y = 2;
light.position.x = -2;


const fire = new FireMesh({
  fireTex: fireTexture,
  color: 0xFF9445,
  magnitude: 1.3,
  iterations: 20,
  octaves: 3
})

fire.position.z = -2.23;
fire.position.y = 3;
fire.position.x = -1.6;
fire.scale.x = 0.3;
fire.scale.y = 1;
fire.scale.z = 0.3;
fire.rotation.x = -50.3;

scene.add(fire)

const hemiLight = new three.HemisphereLight(0xffffff,1);
scene.add(hemiLight);

function update(){
    requestAnimationFrame(update);

	  //controls.update();

    fire.update(performance.now() / 1000)
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