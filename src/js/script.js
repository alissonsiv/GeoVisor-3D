const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('render-container').appendChild(renderer.domElement);

let currentObject = null;
let lights = [];
let gridHelper = null;

function createShape(shape) {
    if (currentObject) {
        scene.remove(currentObject);
    }

    let geometry;

    switch (shape) {
        case 'cube':
            geometry = new THREE.BoxGeometry();
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1, 32, 32);
            break;
        case 'pyramid':
            geometry = new THREE.ConeGeometry(1, 2, 4);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1, 2, 32);
            break;
        case 'torus':
            geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
            break;
        case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(1);
            break;
    }

    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    currentObject = new THREE.Mesh(geometry, material);
    scene.add(currentObject);

    resetButtonSelection();
    document.getElementById(shape).classList.add('selected');
}

function changeColor() {
    if (currentObject) {
        const color = Math.floor(Math.random() * 0xffffff);
        currentObject.material.color.setHex(color);
    }
}

function scaleObject(factor) {
    if (currentObject) {
        currentObject.scale.multiplyScalar(factor);
    }
}

function addLight() {
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    lights.push(light);
}

function toggleGrid() {
    if (gridHelper) {
        scene.remove(gridHelper);
        gridHelper = null;
        document.getElementById('toggleGrid').innerText = 'Ativar Grade'; 
    } else {
        gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
        document.getElementById('toggleGrid').innerText = 'Desativar Grade'; 
    }
}

function resetScene() {
    if (currentObject) {
        scene.remove(currentObject);
        currentObject = null;
    }
    lights.forEach(light => scene.remove(light));
    lights = [];
    if (gridHelper) {
        scene.remove(gridHelper);
        gridHelper = null;
        document.getElementById('toggleGrid').innerText = 'Ativar Grade'; 
    }
    resetButtonSelection();
}

function resetButtonSelection() {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => button.classList.remove('selected'));
}

function animate() {
    requestAnimationFrame(animate);
    if (currentObject) {
        currentObject.rotation.x += 0.01;
        currentObject.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

camera.position.z = 5;
animate();

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('render-container').style.display = 'block';
});

document.getElementById('back').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('render-container').style.display = 'none';
    document.getElementById('initial-screen').style.display = 'block';
    resetScene();
});

document.getElementById('cube').addEventListener('click', () => createShape('cube'));
document.getElementById('sphere').addEventListener('click', () => createShape('sphere'));
document.getElementById('pyramid').addEventListener('click', () => createShape('pyramid'));
document.getElementById('cylinder').addEventListener('click', () => createShape('cylinder'));
document.getElementById('cone').addEventListener('click', () => createShape('cone'));
document.getElementById('torus').addEventListener('click', () => createShape('torus'));
document.getElementById('icosahedron').addEventListener('click', () => createShape('icosahedron'));

document.getElementById('changeColor').addEventListener('click', changeColor);
document.getElementById('scaleUp').addEventListener('click', () => scaleObject(1.2));
document.getElementById('scaleDown').addEventListener('click', () => scaleObject(0.8));

document.getElementById('addLight').addEventListener('click', addLight);
document.getElementById('toggleGrid').addEventListener('click', toggleGrid);
document.getElementById('reset').addEventListener('click', resetScene);
