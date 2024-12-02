import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

RectAreaLightUniformsLib.init();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial();
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0, 5, 0)
scene.add( cube );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.copy( cube.position );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
directionalLight.target = cube;

const rectLight = new THREE.RectAreaLight( 0xffbf00, 5, 3, 10 );
rectLight.position.set( 0, 5, -2 );
rectLight.lookAt( 0, 5, 0 );
scene.add( rectLight );
scene.add( new RectAreaLightHelper( rectLight ) );

const rectLight1 = new THREE.RectAreaLight( 0xffffffff, 0.2, 10, 10 );
rectLight1.position.set( 0, 5, 10 );
rectLight1.lookAt( 0, 5, 0 );
scene.add( rectLight1 );


camera.position.set( 0, 5, 5 );

function animate() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}


let i = 0
function onKeyDown(event) {
    const colors = [0xffbf00, 0xe83f6f, 0x2274a5, 0x32936f]
    const positions = [[0, 5, -2], [1, 5, -2], [0, 5, -2], [-1, 5, -2]]
    if (event.key === 'ArrowLeft') {
        i = ((i - 1) + 4 ) % 4
        console.log(i)
        rectLight.color.set(colors[i])
        rectLight.position.set(...positions[i] );
        console.log(rectLight.position);
    } else if (event.key === 'ArrowRight') {
        i = ((i + 1)) % 4
        console.log(i)
        rectLight.color.set(colors[i])
        rectLight.position.set(...positions[i]);
    }
}

renderer.setAnimationLoop( animate );
window.addEventListener('keydown', onKeyDown);

