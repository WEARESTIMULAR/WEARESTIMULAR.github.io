import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
//scene.fog = new THREE.Fog(0x000000, 6, 6); // Add standard fog
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let logoModel;
let intersectPoint = new THREE.Vector3();

// Light
const spotLight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI / 20, 0.3);
spotLight.position.set(0, 2, 5);
scene.add(spotLight);

const pointLight = new THREE.PointLight(0xFF0000,1);
pointLight.position.set(0,-0.5,0);
scene.add(pointLight);


// Enable shadows for the spotlight
renderer.shadowMap.enabled = true;
spotLight.castShadow = true;

//LOAD MODELS
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );
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

//LIGHT TARGET
const lightTarget = new THREE.Object3D();
scene.add(lightTarget);
spotLight.target = lightTarget;

camera.position.z = 6;
camera.lookAt(0,0,0);

// Raycaster to convert 2D mouse coordinates to 3D world coordinates
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();  // Stores mouse position in normalized device coordinates (NDC)

// Update mouse position based on mouse events
window.addEventListener('mousemove', (event) => {
  // Normalize the mouse position to be between -1 and 1 for both x and y axes
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections
  if (logoModel) {
    const intersects = raycaster.intersectObject(logoModel, true);
    
    if (intersects.length > 0) {
        console.log("Hit GLTF logoModel at:", intersects[0].point); // Log the hit point
        intersectPoint.copy(intersects[0].point);
        }
    }
});


renderer.setAnimationLoop( animate );

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

function animate() {

    //pointLightHelper.update();   
    lightTarget.position.lerp(intersectPoint, 0.1);

    renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if(logoModel)
    {
        //logoModel.rotation.z += 0.01;
    }

    //camera.lookAt(cube.position);
  }