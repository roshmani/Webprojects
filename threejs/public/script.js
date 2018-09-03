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
/*                                               Earth                                                        */
/**************************************************************************************************************/
var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load("./earthmap4k.jpg");
var earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);
/**************************************************************************************************************/
/*                                               Moon                                                         */
/**************************************************************************************************************/
var geometry = new THREE.SphereGeometry(2, 10, 10);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load("./moonmap4k.jpg");
var moonMesh = new THREE.Mesh(geometry, material);
moonMesh.position.x = earthMesh.position.x - 20;
scene.add(moonMesh);
/* added a pivot and added moon to that pivot*/
var earthPivot = new THREE.Object3D();
scene.add(earthPivot);
earthPivot.add(moonMesh);
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
var time = new Date();
var moonOrbitAngle = 0;
var render = function() {
    requestAnimationFrame(render);
    moonOrbitAngle += 0.005;
    var radians = (moonOrbitAngle * Math.PI) / 180;
    earthMesh.rotation.x += 0.005;
    earthMesh.rotation.y += 0.005;
    earthPivot.rotation.y += 0.005;
    renderer.render(scene, camera);
};
render();
document.body.appendChild(renderer.domElement);
