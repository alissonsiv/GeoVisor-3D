let scene, camera, renderer, currentShape, gridHelper, directionalLight;
let isAnimating = false; 

function init() {
    if (scene) {
        clearScene();
    } else {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('render-container').appendChild(renderer.domElement);

        directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        camera.position.set(0, 2, 5);
        camera.lookAt(0, 0, 0);
    }
    if (!isAnimating) { 
        isAnimating = true;
        animate();
    }
}

function animate() {
    if (!isAnimating) return; 

    requestAnimationFrame(animate);
    if (currentShape) {
        currentShape.rotation.x += 0.01;
        currentShape.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

function clearScene() {
    if (currentShape) {
        scene.remove(currentShape);
        currentShape.geometry.dispose();
        currentShape.material.dispose();
        currentShape = null;
    }
    if (gridHelper) {
        scene.remove(gridHelper);
        gridHelper = null;
    }
}

function addCube() {
    clearScene();
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xff5733 });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1.5;  
    scene.add(currentShape);
    animateShape(currentShape); 
}

function addSphere() {
    clearScene();
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x33ff57 });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1.5;
    scene.add(currentShape);
    animateShape(currentShape); 
}

function addPyramid() {
    clearScene();
    const geometry = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x3357ff });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1.5; 
    scene.add(currentShape);
    animateShape(currentShape); 
}

function animateShape(shape) {
    let scale = 0;
    const scaleAnimation = () => {
        if (scale < 1) {
            scale += 0.05;
            shape.scale.set(scale, scale, scale); 
            requestAnimationFrame(scaleAnimation);
        }
    };
    scaleAnimation();
}

function resetScene() {
    clearScene();
}

function activateButton(id) {
    document.querySelectorAll('.button-container button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function addLight() {
    if (directionalLight) {
        scene.remove(directionalLight);
        directionalLight = null;
    } else {
        directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);
    }
}

function toggleGrid() {
    if (gridHelper) {
        scene.remove(gridHelper);
        gridHelper = null;
    } else {
        gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
    }
}

document.getElementById('cube').addEventListener('click', () => {
    activateButton('cube');
    addCube();
});

document.getElementById('sphere').addEventListener('click', () => {
    activateButton('sphere');
    addSphere();
});

document.getElementById('pyramid').addEventListener('click', () => {
    activateButton('pyramid');
    addPyramid();
});

function addCylinder() {
    clearScene();
    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xffff33 });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1; 
    scene.add(currentShape);
    animateShape(currentShape); 
}

function addCone() {
    clearScene();
    const geometry = new THREE.ConeGeometry(1, 2, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xff33ff });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1; 
    scene.add(currentShape);
    animateShape(currentShape); 
}

// Adicionar eventos para os novos botões
document.getElementById('cylinder').addEventListener('click', () => {
    activateButton('cylinder');
    addCylinder();
});

document.getElementById('cone').addEventListener('click', () => {
    activateButton('cone');
    addCone();
});


document.getElementById('reset').addEventListener('click', () => {
    activateButton('reset');
    resetScene();
});

document.getElementById('addLight').addEventListener('click', () => {
    activateButton('addLight');
    addLight();
});

document.getElementById('toggleGrid').addEventListener('click', () => {
    activateButton('toggleGrid');
    toggleGrid();
});

document.getElementById('back').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('initial-screen').style.display = 'flex';
    document.getElementById('render-container').style.display = 'none';
    isAnimating = false; 
});

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('initial-screen').style.display = 'none'; 
    document.getElementById('menu').style.display = 'flex'; 
    document.getElementById('render-container').style.display = 'block'; 
    init();
});
