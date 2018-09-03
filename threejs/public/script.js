var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50
);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
/**************************************************************************************************************/
/*                                               Sun                                                          */
/**************************************************************************************************************/
var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load("./sunimage.jpg");
var sunMesh = new THREE.Mesh(geometry, material);
scene.add(sunMesh);
/**************************************************************************************************************/
/*                                               Earth                                                       */
/**************************************************************************************************************/
var geometry = new THREE.SphereGeometry(3, 16, 16);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load("./earthmap4k.jpg");
var earthMesh = new THREE.Mesh(geometry, material);
earthMesh.position.x = sunMesh.position.x - 20;
scene.add(earthMesh);
/* added a pivot and added earth to that pivot*/
var earthPivot = new THREE.Object3D();
scene.add(earthPivot);
earthPivot.add(earthMesh);
/**************************************************************************************************************/
/*                                               Moon                                                         */
/**************************************************************************************************************/
var geometry = new THREE.SphereGeometry(0.5, 32, 32);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load("./moonmap4k.jpg");
var moonMesh = new THREE.Mesh(geometry, material);
moonMesh.position.x = earthMesh.position.y - 5;
scene.add(moonMesh);
/* added a pivot and added moon to that pivot*/
var moonPivot = new THREE.Object3D();
moonPivot.position.x = earthMesh.position.x;
scene.add(moonPivot);
moonPivot.add(moonMesh);
earthPivot.add(moonPivot);

/**************************************************************************************************************/
/*                                               Mars                                                         */
/**************************************************************************************************************/
var geometry = new THREE.SphereGeometry(0.5, 16, 16);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load("./marsmap1k.jpg");
var marsMesh = new THREE.Mesh(geometry, material);
marsMesh.position.x = sunMesh.position.x - 30;
marsMesh.position.y = earthMesh.position.y + 5;
scene.add(marsMesh);
/* added a pivot and added mars to that pivot*/
var marsPivot = new THREE.Object3D();
scene.add(marsPivot);
marsPivot.add(marsMesh);
/*************************************Orbit Controls*************************************************************/
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;
var imagePrefix = "./";
var urls = [
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg"
];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

var render = function() {
    requestAnimationFrame(render);

    sunMesh.rotation.x += 0.005;
    sunMesh.rotation.y += 0.005;
    marsPivot.rotation.y += 0.005;
    earthPivot.rotation.y += 0.005;
    moonPivot.rotation.y += 0.015;

    renderer.render(scene, camera);
};
render();
document.body.appendChild(renderer.domElement);
