import { Scene, AmbientLight, PerspectiveCamera, WebGLRenderer } from "three";
import ThreeGlobe from "three-globe";

const globe = new ThreeGlobe({ animateIn: false })
  .globeImageUrl("https://wsrv.nl/?output=webp&q=1&l=9&url=https://static.cdn.how/globe.jpeg")
  .atmosphereColor("grey");

const renderer = new WebGLRenderer();
const { innerWidth, innerHeight } = window;
renderer.setSize(innerWidth, innerHeight);
renderer.domElement.id = "bg";
const bgElement = document.getElementById("bg");
if (bgElement) {
  bgElement.appendChild(renderer.domElement);
}

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight);
camera.updateProjectionMatrix();
camera.position.z = 500;

const scene = new Scene();
scene.add(globe);
const color = new AmbientLight(0xcccccc, 5)
scene.add(color);

(function animate() {
  if (document.visibilityState === "visible") {
    renderer.render(scene, camera);
    globe.rotation.y -= 0.001;
  }
  return requestAnimationFrame(animate);
})()