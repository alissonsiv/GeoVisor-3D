const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('render-container').appendChild(renderer.domElement);
camera.position.z = 5;

let currentObject = null;
let lights = [];
let gridHelper = null;
let lightAdded = false;
let gridActive = false;

function createShape(shape) {
    if (currentObject) scene.remove(currentObject);
    let geometry;

    switch (shape) {
        case 'cube': geometry = new THREE.BoxGeometry(); break;
        case 'sphere': geometry = new THREE.SphereGeometry(1, 32, 32); break;
        case 'pyramid': geometry = new THREE.ConeGeometry(1, 2, 4); break;
        case 'cylinder': geometry = new THREE.CylinderGeometry(1, 1, 2, 32); break;
        case 'cone': geometry = new THREE.ConeGeometry(1, 2, 32); break;
        case 'torus': geometry = new THREE.TorusGeometry(1, 0.4, 16, 100); break;
        case 'icosahedron': geometry = new THREE.IcosahedronGeometry(1); break;
    }

    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    currentObject = new THREE.Mesh(geometry, material);
    scene.add(currentObject);
}

function changeColor() {
    if (currentObject) {
        const color = Math.floor(Math.random() * 0xffffff);
        currentObject.material.color.setHex(color);
    }
}

function scaleObject(factor) {
    if (currentObject) currentObject.scale.multiplyScalar(factor);
}

function addLight() {
    if (!lightAdded) {
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);
        lights.push(light);
        lightAdded = true;
        document.getElementById('addLight').textContent = "Desativar Luz";
    } else {
        lights.forEach(light => scene.remove(light));
        lights = [];
        lightAdded = false;
        document.getElementById('addLight').textContent = "Adicionar Luz";
    }
}

function toggleGrid() {
    if (gridActive) {
        scene.remove(gridHelper);
        gridHelper = null;
        gridActive = false;
        document.getElementById('toggleGrid').textContent = "Ativar Grade";
    } else {
        gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
        gridActive = true;
        document.getElementById('toggleGrid').textContent = "Desativar Grade";
    }
}

function resetScene() {
    if (currentObject) {
        scene.remove(currentObject);
        currentObject = null;
    }
    lights.forEach(light => scene.remove(light));
    lights = [];
    lightAdded = false;
    if (gridHelper) {
        scene.remove(gridHelper);
        gridHelper = null;
    }

    document.getElementById('addLight').textContent = "Adicionar Luz";
    document.getElementById('toggleGrid').textContent = "Ativar Grade";
}

function animate() {
    requestAnimationFrame(animate);
    if (currentObject) {
        currentObject.rotation.x += 0.01;
        currentObject.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

addLight();
animate();

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('render-container').style.display = 'block';
});

document.getElementById('cube').addEventListener('click', () => createShape('cube'));
document.getElementById('sphere').addEventListener('click', () => createShape('sphere'));
document.getElementById('pyramid').addEventListener('click', () => createShape('pyramid'));
document.getElementById('cylinder').addEventListener('click', () => createShape('cylinder'));
document.getElementById('cone').addEventListener('click', () => createShape('cone'));
document.getElementById('torus').addEventListener('click', () => createShape('torus'));
document.getElementById('icosahedron').addEventListener('click', () => createShape('icosahedron'));

document.getElementById('changeColor').addEventListener('click', changeColor);
document.getElementById('scaleUp').addEventListener('click', () => scaleObject(1.1));
document.getElementById('scaleDown').addEventListener('click', () => scaleObject(0.9));
document.getElementById('addLight').addEventListener('click', addLight);
document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
document.getElementById('reset').addEventListener('click', resetScene);
