let cena, camera, renderizador, formaAtual;

// Inicializa a cena 3D, configura a câmera, o renderizador e a iluminação
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

// Anima a cena continuamente chamando o renderizador
function animate() {
    requestAnimationFrame(animate);
    renderizador.render(cena, camera); 
}

// Limpa a cena atual removendo a forma atual
function limparCena() {
    if (formaAtual) { 
        cena.remove(formaAtual); 
        formaAtual.geometry.dispose(); 
        formaAtual.material.dispose(); 
        formaAtual = null; 
    }
}

// Adiciona um cubo
function adicionarCubo() {
    limparCena(); 
    const geometria = new THREE.BoxGeometry(); 
    const material = new THREE.MeshPhongMaterial({ color: 0xff5733 }); 
    formaAtual = new THREE.Mesh(geometria, material); 
    cena.add(formaAtual); 
}

// Adiciona uma esfera
function adicionarEsfera() {
    limparCena(); 
    const geometria = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x33ff57 });
    formaAtual = new THREE.Mesh(geometria, material);
    cena.add(formaAtual); 
}

// Adiciona uma pirâmide
function adicionarPiramide() {
    limparCena(); 
    const geometria = new THREE.ConeGeometry(1, 2, 4); 
    const material = new THREE.MeshPhongMaterial({ color: 0x3357ff }); 
    formaAtual = new THREE.Mesh(geometria, material); 
    cena.add(formaAtual); 
}

// Gerencia o estado ativo dos botões, adicionando a classe 'active' ao botão selecionado
function ativarBotao(id) {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); 
    document.getElementById(id).classList.add('active'); 
}

// Configura os event listeners para os botões que adicionam formas à cena
document.getElementById('cubo').addEventListener('click', () => {
    ativarBotao('cubo'); 
    adicionarCubo(); 
});

document.getElementById('esfera').addEventListener('click', () => {
    ativarBotao('esfera'); 
    adicionarEsfera(); 
});

document.getElementById('piramide').addEventListener('click', () => {
    ativarBotao('piramide'); 
    adicionarPiramide(); 
});

// Inicia a cena
init();