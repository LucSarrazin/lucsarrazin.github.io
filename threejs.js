import * as three from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import * as index from './index.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let canvas = document.getElementById("container");
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new three.WebGLRenderer({ canvas: canvas, antialias: true });
const composer = new EffectComposer(renderer);
renderer.setSize(w,h);
composer.setSize(w, h);


const camera = new three.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 10;

const scene = new three.Scene();
scene.fog = new three.FogExp2(0x110000, 0.13);
//const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableDamping = true;
//controls.dampingFactor = 0.05;
const loader = new GLTFLoader();
scene.background = new three.Color( 0x0A0A1C );

// Rendu normal de la scène
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Effet Bloom (halo lumineux)
const bloomPass = new UnrealBloomPass(
    new three.Vector2(w, h),
    0.5,  // Intensité
    0.4,  // Rayon
    0.85  // Seuil
);

composer.addPass(bloomPass);

const group2 = new three.Group();
const geometryCube = new three.BoxGeometry(1, 1, 1);
const materialCube = new three.MeshBasicMaterial({
     color: 0x00ff00 
    });
const cube = new three.Mesh(geometryCube, materialCube);
group2.add(cube);
scene.add(group2);
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = -13;
group2.visible = false;

const SH2 = new three.Group();
const salle = await loader.loadAsync("./PageProjets/Models/SilentHill2BathroomTeste.glb");
SH2.add(salle.scene);
scene.add(SH2);
salle.scene.position.x = 10;
salle.scene.position.y = -4;
salle.scene.position.z = 10;
camera.rotation.y = 0.4;
group2.visible = true;

const hemiLight = new three.HemisphereLight(0xffffff,10000);
scene.add(hemiLight);

function update(){
    requestAnimationFrame(update);

    //cube.rotation.x += 0.001;
    //cube.rotation.y += 0.001;
    //cube.rotation.z += 0.001;

	  //controls.update();
    //renderer.render(scene, camera);
    composer.render();
}
update();


// Animation de scroll
gsap.to(camera.position, {
    z: 5,
    duration: 2,
    ease: "power2.inOut",
});

gsap.to(salle.scene.position, {
    x: 5,
    y: -3,
    duration: 2
});

/*ScrollTrigger.create({
    trigger: "#competences",
    start: "top center",

    onEnter: () => {
        SH2.visible = false;
        group2.visible = true;
    },

    onLeaveBack: () => {
        SH2.visible = true;
        group2.visible = false;
    }
});*/

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#competences",
        start: "top top",
        end: "+=800",
        scrub: 1,
        markers: true,

        onUpdate: (self) => {
            console.log("Progression :", self.progress);
        }
    }
});

timeline.to(camera.position, {
    z: 0,
    duration: 2
});

timeline.to(camera.rotation, {
    y: Math.PI / 2,
    duration: 1
});

timeline.addLabel("experiences");

timeline.to(camera.position, {
    x: -5,
    duration: 2
});






function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);



/*window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const progress = window.scrollY / maxScroll;

    camera.position.z = 5 - progress * 30;
    camera.position.x = progress * 5;

    // Décor 1
    SH2.visible = progress < 0.35;

    // Décor 2
    group2.visible = progress >= 0.35 && progress < 0.55;
    console.log("Progress: " + progress);

    // Décor 3
    //computerRoom.visible = progress >= 0.4 && progress < 0.6;

    // Décor 4
    //vrRoom.visible = progress >= 0.6 && progress < 0.8;

    // Décor 5
    //controlRoom.visible = progress >= 0.8;
});*/

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