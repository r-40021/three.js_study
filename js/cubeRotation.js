// サイズ設定
const width = window.innerWidth;
const height = window.innerHeight - 200;

let isRotateX = false;
let isRotateY = false;
let isRotateZ = false;

const xrotateElement = document.getElementById('xrotate');
xrotateElement.onclick = () => {
  isRotateX = !isRotateX;
}

const yrotateElement = document.getElementById('yrotate');
yrotateElement.onclick = () => {
  isRotateY = !isRotateY;
}

const zrotateElement = document.getElementById('zrotate');
zrotateElement.onclick = () => {
  isRotateZ = !isRotateZ;
}

document.getElementById('white-bg').onclick = () => {
  scene.background = new THREE.Color(0xFFFFFF);
}

document.getElementById('black-bg').onclick = () => {
  scene.background = new THREE.Color(0x000000);
}

document.getElementById('green-bg').onclick = () => {
  scene.background = new THREE.Color(0x00FF00);
}

const scene = new THREE.Scene(); // シーンを作成
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas'),
});
renderer.setSize( width, height );
const controls = new THREE.OrbitControls( camera, renderer.domElement );


// 環境光を追加
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
scene.add(ambientLight);

// Collada 形式のモデルデータを読み込む
const loader = new THREE.ColladaLoader();
let model;
// dae ファイルのパスを指定
loader.load('models/dae/snowman.dae', (collada) => {
  model = collada.scene;
  model.rotation.x += getRadian(30);
  model.rotation.y += getRadian(-15);
  scene.add(model); // 読み込み後に3D空間に追加
});

function animate() {
  requestAnimationFrame( animate );

  // cube.rotation.x += 0.01;
  // cube.rotation.u += 0.01;

  if (model) {
    if (isRotateX) {
      model.rotation.x += getRadian(1);
    }
    if (isRotateY) {
      model.rotation.y += getRadian(1);
    }
    if (isRotateZ) {
      model.rotation.z += getRadian(1);
    }
  }

  renderer.render(scene, camera);
}
animate();

function getRadian(kakudo) {
  return kakudo * Math.PI / 180;
}