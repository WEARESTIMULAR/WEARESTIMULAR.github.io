import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let logoModel;

const light = new THREE.DirectionalLight(0xfffffff,1);
light.position.set(2,5,0);
scene.add(light);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
console.log('blablabla');
const loader = new GLTFLoader();
const logo = loader.load(
  'assets/Stimular_Logo_3D.gltf',  // path to your model
  (gltf) => {
    logoModel = gltf.scene;
    scene.add(logoModel);  // Add the loaded model to the scene
    console.log('LOAD SUCCESFULL');
  },
  undefined,
  (error) => {
    console.error('An error happened while loading the model', error);
  }
);

camera.position.z = 5;
camera.lookAt(0,0,0);



var controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
controls.enableDamping = true
const limitRotation = Math.PI/4;
controls.minAzimuthAngle = -limitRotation;
controls.maxAzimuthAngle = limitRotation;
controls.maxPolarAngle = Math.PI/2;
controls.minPolarAngle = Math.PI/2;

controls.update();

renderer.setAnimationLoop( animate );

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

function animate() {
    controls.update();
    renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if(logoModel)
    {
        logoModel.rotation.z += 0.01;
    }

    //camera.lookAt(cube.position);
  }