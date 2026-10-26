import * as three from "three";

let canvas = document.getElementById("container");
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new three.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(w,h);

const camera = new three.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 5;

const scene = new three.Scene();
scene.background = new three.Color( 0x0A0A1C );

const geometryCube = new three.BoxGeometry(1, 1, 1);
const materialCube = new three.MeshBasicMaterial({
     color: 0x00ff00 
    });
const cube = new three.Mesh(geometryCube, materialCube);
scene.add(cube);

function update(){
    requestAnimationFrame(update);

    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;
    cube.rotation.z += 0.001;

    renderer.render(scene, camera);
}
update();


function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);