const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('render-container').appendChild(renderer.domElement);
camera.position.z = 5;

let currentObject = null;
let lights = [];
let lightAdded = false;
let isRotating = false; 
let currentScale = 1;

function createShape(shape) {
    if (currentObject) scene.remove(currentObject);
    let geometry;

    switch (shape) {
        case 'cube': geometry = new THREE.BoxGeometry(); break;
        case 'sphere': geometry = new THREE.SphereGeometry(1, 32, 32); break;
        case 'pyramid': geometry = new THREE.ConeGeometry(1, 2, 4); break;
        case 'cylinder': geometry = new THREE.CylinderGeometry(1, 1, 2, 32); break;
        case 'cone': geometry = new THREE.ConeGeometry(1, 2, 32); break;
        case 'icosahedron': geometry = new THREE.IcosahedronGeometry(1); break;
        case 'tetrahedron': geometry = new THREE.TetrahedronGeometry(1); break;
        case 'dodecahedron': geometry = new THREE.DodecahedronGeometry(1); break;
    }

    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    currentObject = new THREE.Mesh(geometry, material);
    scene.add(currentObject);
}

function scaleObject(factor) {
    if (currentObject) {
        currentScale *= factor;
        currentObject.scale.set(currentScale, currentScale, currentScale);
        document.getElementById('scaleValue').textContent = `Escala: ${currentScale.toFixed(1)}x`;
        document.getElementById('scaleRange').value = currentScale;
    }
}

document.getElementById('scaleRange').addEventListener('input', (event) => {
    const scaleValue = parseFloat(event.target.value);
    if (currentObject) {
        currentObject.scale.set(scaleValue, scaleValue, scaleValue);
        currentScale = scaleValue;
        document.getElementById('scaleValue').textContent = `Escala: ${currentScale.toFixed(1)}x`;
    }
});

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

function resetScene() {
    if (currentObject) {
        scene.remove(currentObject);
        currentObject = null;
    }
    lights.forEach(light => scene.remove(light));
    lights = [];
    lightAdded = false;
    document.getElementById('addLight').textContent = "Adicionar Luz";
}

function toggleRotation() {
    isRotating = !isRotating;
    document.getElementById('toggleRotation').textContent = isRotating ? "Parar Rotação" : "Iniciar Rotação";
}

function moveObject(axis, direction) {
    if (currentObject) {
        currentObject.position[axis] += direction;
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (currentObject && isRotating) {
        currentObject.rotation.x += 0.01;
        currentObject.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

const colorPalette = document.getElementById('colorPalette');
const changeColorButton = document.getElementById('changeColor');
const closePaletteButton = document.getElementById('closePalette');

changeColorButton.addEventListener('click', () => {
    colorPalette.classList.toggle('hidden');
});

document.querySelectorAll('.color-option').forEach(colorOption => {
    colorOption.addEventListener('click', (event) => {
        const selectedColor = event.target.getAttribute('data-color');
        if (currentObject) {
            currentObject.material.color.set(selectedColor);
        }
    });
});

closePaletteButton.addEventListener('click', () => {
    colorPalette.classList.add('hidden');
});

addLight();
animate();

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('render-container').style.display = 'block';
});

// Evento para o botão de "Voltar"
document.getElementById('back').addEventListener('click', () => {
    document.getElementById('initial-screen').style.display = 'flex';  
    document.getElementById('menu').style.display = 'none';
    document.getElementById('render-container').style.display = 'none';
});


document.getElementById('cube').addEventListener('click', () => createShape('cube'));
document.getElementById('sphere').addEventListener('click', () => createShape('sphere'));
document.getElementById('pyramid').addEventListener('click', () => createShape('pyramid'));
document.getElementById('cylinder').addEventListener('click', () => createShape('cylinder'));
document.getElementById('cone').addEventListener('click', () => createShape('cone'));
document.getElementById('icosahedron').addEventListener('click', () => createShape('icosahedron'));
document.getElementById('tetrahedron').addEventListener('click', () => createShape('tetrahedron'));
document.getElementById('dodecahedron').addEventListener('click', () => createShape('dodecahedron'));

document.getElementById('openScale').addEventListener('click', () => {
    document.getElementById('scaleContainer').classList.remove('hidden');
});

document.getElementById('closeScale').addEventListener('click', () => {
    document.getElementById('scaleContainer').classList.add('hidden');
});

document.getElementById('addLight').addEventListener('click', addLight);
document.getElementById('reset').addEventListener('click', resetScene);

document.getElementById('toggleRotation').addEventListener('click', toggleRotation);
document.getElementById('moveUp').addEventListener('click', () => moveObject('y', 0.1));
document.getElementById('moveDown').addEventListener('click', () => moveObject('y', -0.1));
document.getElementById('moveLeft').addEventListener('click', () => moveObject('x', -0.1));
document.getElementById('moveRight').addEventListener('click', () => moveObject('x', 0.1));
