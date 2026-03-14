// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 300, // Height fixed for portfolio section
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, 300); // Matches #carModel height
document.getElementById("carModel").appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Create a simple car model (box + wheels)
const carBodyGeometry = new THREE.BoxGeometry(2, 0.5, 1);
const carBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);
scene.add(carBody);

// Add simple wheels
function createWheel(x, y, z) {
  const geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(x, y, z);
  return wheel;
}

const wheels = [
  createWheel(-0.8, -0.25, 0.45),
  createWheel(0.8, -0.25, 0.45),
  createWheel(-0.8, -0.25, -0.45),
  createWheel(0.8, -0.25, -0.45),
];

wheels.forEach((w) => scene.add(w));

// Camera position
camera.position.z = 5;

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Rotate car for display
  carBody.rotation.y += 0.01;
  wheels.forEach((w) => (w.rotation.y += 0.01));

  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / 300;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 300);
});
