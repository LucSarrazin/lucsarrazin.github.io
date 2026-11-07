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

const SH2 = new three.Group();
const salle = await loader.loadAsync("./PageProjets/Models/SilentHill2BathroomTeste.glb");
SH2.add(salle.scene);
scene.add(SH2);
salle.scene.position.x = 10;
salle.scene.position.y = -4;
salle.scene.position.z = 10;
camera.rotation.y = 0.4;

const hemiLight = new three.HemisphereLight(0xffffff,10000);
scene.add(hemiLight);

const paper = await loader.loadAsync("./PageProjets/Models/redPaper.glb");
paper.scene.position.x = 5;
paper.scene.position.y = -4;
paper.scene.position.z = 10;
scene.add(paper.scene);

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
    z: 6,
    duration: 2,
    ease: "power2.inOut",
});

gsap.to(salle.scene.position, {
    x: 5,
    y: -4,
    duration: 2
});

const timeline1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "+=1150",
        scrub: 1,
        markers: true
    }
});
timeline1.to(camera.position, {
    z: -10,
    x: -4,
    duration: 2,
    ease: "power2.inOut",
    
    onEnter: () => {
        SH2.visible = false;
        PathOfMatches.visible = true;
    },

    onLeaveBack: () => {
        SH2.visible = true;
        PathOfMatches.visible = false;
    }
}, 0);
timeline1.to(camera.rotation, {
    y: 0,
    duration: 2,
    ease: "power2.inOut",
}, 0);

const PathOfMatches = new three.Group();
const tunnel = await loader.loadAsync('./PageProjets/Models/tunnel.glb');
PathOfMatches.add(tunnel.scene);
scene.add(PathOfMatches);
PathOfMatches.position.z = -10;
PathOfMatches.position.y = -3.5;
PathOfMatches.position.x = 11;
PathOfMatches.visible = false;

const timeline2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#projets",
        start: "top top",
        end: "+=1500",
        scrub: 1,
        markers: true,

        onEnter: () => {
            PathOfMatches.visible = true;
            SH2.visible = false;
        },

        onLeaveBack: () => {
            SH2.visible = true;
            PathOfMatches.visible = false;
        }
    }
});

timeline2.to(camera.position, {
    z: -5,
    duration: 2,
    ease: "power2.inOut"
});

const timeline3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#parcours",
        start: "top top",
        end: "+=1200",
        scrub: 1,
        markers: true,
        onEnter: () => {
            SH2.visible = false;
            PathOfMatches.visible = true;
        },
        onLeaveBack: () => {
            SH2.visible = false;
            PathOfMatches.visible = true;
        }
    }
});

timeline3.to(camera.position, {
    z: -10,
    x: -4,
    duration: 2,
    ease: "power2.inOut",
});
timeline3.to(camera.position, {
    z: 0,
    duration: 2,
    ease: "power2.inOut",

    onStart: () => {
        PathOfMatches.visible = false;
        SH2.visible = true;
    },
    onReverseComplete: () => {
        SH2.visible = false;
        PathOfMatches.visible = true;
    }
});

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
  camera.position.x += changeX/10000;
  camera.position.y -= changeY/10000;

  oldX = ev.x;
  oldY = ev.y;
}

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        ScrollTrigger.refresh();
    }
});

/*timeline1.to(camera.rotation, {
    y: Math.PI / 2,
    duration: 2,
    ease: "power2.inOut",
});

timeline1.to(camera.position, {
    x: -4,
    duration: 2,
    ease: "power2.inOut",
});

timeline1.to(camera.rotation, {
    y: 0,
    duration: 2,
    ease: "power2.inOut",
});*/

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

/*const timeline = gsap.timeline({
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
});*/