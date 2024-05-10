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
animate();

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

  /*    Moving Stars   */
  function randomPointSphere(radius) {
    let u = Math.random();
    let v = Math.random();
    let theta = 2 * Math.PI * u;
    let phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
}
  let starsGeometry = new THREE.BufferGeometry();
let positions = [];

for (let i = 0; i < 50; i++) {
    let particleStar = randomPointSphere(150);

    particleStar.velocity = THREE.MathUtils.randInt(50, 200);

    particleStar.startX = particleStar.x;
    particleStar.startY = particleStar.y;
    particleStar.startZ = particleStar.z;

    positions.push(particleStar.x, particleStar.y, particleStar.z);
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));




  
  let starsMaterial = new THREE.PointsMaterial({
    size: 5,
    color: "#ffffff",
    transparent: true,
    opacity: 0.8,
    map: textureStar,
    blending: THREE.AdditiveBlending,
  });
  starsMaterial.depthWrite = false;
  stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  /*    Fixed Stars   */

  function createStars(texture, size, total) {
    let pointGeometry = new THREE.BufferGeometry();
    let pointMaterial = new THREE.PointsMaterial({
      size: size,
      map: texture,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < total; i++) {
      let radius = THREE.MathUtils.randInt(149, 70);
      let particle = randomPointSphere(radius);
      pointGeometry.vertices.push(particle);
    }

    return new THREE.Points(pointGeometry, pointMaterial);
  }

  scene.add(createStars(texture1, 15, 20));
  scene.add(createStars(texture2, 5, 5));
  scene.add(createStars(texture4, 7, 5));
}

function animate() {
  // Stars  Animation
  stars.geometry.vertices.forEach(function (v) {
    v.x += (0 - v.x) / v.velocity;
    v.y += (0 - v.y) / v.velocity;
    v.z += (0 - v.z) / v.velocity;

    v.velocity -= 0.3;

    if (v.x <= 5 && v.x >= -5 && v.z <= 5 && v.z >= -5) {
      v.x = v.startX;
      v.y = v.startY;
      v.z = v.startZ;
      v.velocity = THREE.MathUtils.randInt(50, 300);
    }
  });

  // Nucleus Animation
  nucleus.geometry.vertices.forEach(function (v) {
    let time = Date.now();
    v.normalize();
    // Let's remove the noise calculation for simplicity
    let distance = nucleus.geometry.parameters.radius * blobScale;
    v.multiplyScalar(distance);
  });
  nucleus.geometry.verticesNeedUpdate = true;
  nucleus.geometry.normalsNeedUpdate = true;
  nucleus.geometry.computeVertexNormals();
  nucleus.geometry.computeFaceNormals();
  nucleus.rotation.y += 0.002;

  // Sphere Background Animation
  sphereBg.rotation.x += 0.002;
  sphereBg.rotation.y += 0.002;
  sphereBg.rotation.z += 0.002;

  controls.update();
  stars.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

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
