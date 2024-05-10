let renderer,
  scene,
  camera,
  sphereBg,
  nucleus,
  stars,
  controls,
  container = document.getElementById("canvas_container"),
  timeout_Debounce,
  cameraSpeed = 0,
  blobScale = 3;

init();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.set(0, 0, 230);

  const directionalLight = new THREE.DirectionalLight("#fff", 2);
  directionalLight.position.set(0, 50, -20);
  scene.add(directionalLight);

  let ambientLight = new THREE.AmbientLight("#ffffff", 1);
  ambientLight.position.set(0, 20, 20);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // OrbitControl
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 4;
  controls.maxDistance = 350;
  controls.minDistance = 150;
  controls.enablePan = false;

  const loader = new THREE.TextureLoader();
  const textureSphereBg = loader.load('./texture/tex1.jpg');
  const texturenucleus = loader.load('./texture/tex2.jpg');
  const textureStar = loader.load("./texture/tex3.png");
  const texture1 = loader.load("./texture/tex4.png");
  const texture2 = loader.load("./texture/tex5.png");
  const texture4 = loader.load("./texture/tex6.png");

  /*  Nucleus  */
  texturenucleus.anisotropy = 16;
  let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
  let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
  nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  scene.add(nucleus);

  /*    Sphere  Background   */
  textureSphereBg.anisotropy = 16;
  let geometrySphereBg = new THREE.SphereBufferGeometry(150, 40, 40);
  let materialSphereBg = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: textureSphereBg,
  });
  sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
  scene.add(sphereBg);



 
/*     Resize     */
window.addEventListener("resize", () => {
  clearTimeout(timeout_Debounce);
  timeout_Debounce = setTimeout(onWindowResize, 80);
});

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

/*     Shop btn     */
// Create the shop button element

// Get the button element
const shopButton = document.getElementById('shop');

if (shopButton) {
  // Set the button text
  shopButton.textContent = "Enter Shop";

  // Set the button link (assuming you want it to link to contact.html)
  shopButton.href = "contact.html";
} else {
  console.error("Shop button element with ID 'shop' not found!");
}

