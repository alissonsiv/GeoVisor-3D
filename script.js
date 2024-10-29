// Variáveis globais para a cena, câmera e renderizador
let cena, camera, renderizador;

// Função para inicializar a cena 3D
function init() {
    cena = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderizador = new THREE.WebGLRenderer();
    
    renderizador.setSize(window.innerWidth, window.innerHeight);
    
    document.getElementById('container').appendChild(renderizador.domElement);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight; 
        camera.updateProjectionMatrix(); 
        renderizador.setSize(window.innerWidth, window.innerHeight); 
    });
    
    const luz = new THREE.DirectionalLight(0xffffff, 1); 
    luz.position.set(5, 5, 5).normalize();
    cena.add(luz); 
    
    camera.position.z = 5;
    
    animate();
}

// Função para animar a cena
function animate() {
    requestAnimationFrame(animate); 
    renderizador.render(cena, camera); 
}

// Função para adicionar um cubo à cena
function adicionarCubo() {
    const geometria = new THREE.BoxGeometry(); 
    const material = new THREE.MeshPhongMaterial({ color: 0xff5733 }); 
    const cubo = new THREE.Mesh(geometria, material); 
    cena.add(cubo); 
}

// Função para adicionar uma esfera à cena
function adicionarEsfera() {
    const geometria = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x33ff57 }); 
    const esfera = new THREE.Mesh(geometria, material); 
    cena.add(esfera); 
}

// Função para adicionar uma pirâmide à cena
function adicionarPiramide() {
    const geometria = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x3357ff }); 
    const piramide = new THREE.Mesh(geometria, material); 
    cena.add(piramide);
}

document.getElementById('cubo').addEventListener('click', () => {
    adicionarCubo(); 
});

document.getElementById('esfera').addEventListener('click', () => {
    adicionarEsfera(); 
});

document.getElementById('piramide').addEventListener('click', () => {
    adicionarPiramide(); 
});

// Inicia a cena ao carregar o script
init();
