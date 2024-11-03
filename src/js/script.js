let scene, camera, renderer, currentShape;

function init() {
    if (scene) {
        clearScene();
    } else {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('render-container').appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        camera.position.set(0, 2, 5);
        camera.lookAt(0, 0, 0);
    }
    animate();
}

function animate() {
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
        currentShape.geometry .dispose();
        currentShape.material.dispose();
        currentShape = null;
    }
}

function addCube() {
    clearScene();
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xff5733 });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1.5;  
    currentShape.scale.set(0, 0, 0); 
    scene.add(currentShape);
    animateShape(currentShape); 
}

function addSphere() {
    clearScene();
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x33ff57 });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1.5;
    currentShape.scale.set(0, 0, 0); 
    scene.add(currentShape);
    animateShape(currentShape); 
}

function addPyramid() {
    clearScene();
    const geometry = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x3357ff });
    currentShape = new THREE.Mesh(geometry, material);
    currentShape.position.y = 1.5; 
    currentShape.scale.set(0, 0, 0); 
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

document.getElementById('reset').addEventListener('click', () => {
    activateButton('reset');
    resetScene();
});

document.getElementById('back').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('initial-screen').style.display = 'flex';
    document.getElementById('render-container').style.display = 'none'; 
});

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('initial-screen').style.display = 'none'; 
    document.getElementById('menu').style.display = 'flex'; 
    document.getElementById('render-container').style.display = 'block'; 
    init(); 
});

init();