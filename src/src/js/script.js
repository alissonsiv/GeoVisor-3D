let cena, camera, renderizador, formaAtual;

function init() {
    cena = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderizador = new THREE.WebGLRenderer({ antialias: true });
    renderizador.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('render-container').appendChild(renderizador.domElement);

    const luz = new THREE.DirectionalLight(0xffffff, 1);
    luz.position.set(5, 5, 5).normalize();
    cena.add(luz);

    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);  
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (formaAtual) {
        formaAtual.rotation.x += 0.01;
        formaAtual.rotation.y += 0.01;
    }
    renderizador.render(cena, camera);
}

function limparCena() {
    if (formaAtual) {
        cena.remove(formaAtual);
        formaAtual.geometry.dispose();
        formaAtual.material.dispose();
        formaAtual = null;
    }
}

function adicionarCubo() {
    limparCena();
    const geometria = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xff5733 });
    formaAtual = new THREE.Mesh(geometria, material);
    formaAtual.position.y = 1.5;  
    cena.add(formaAtual);
}

function adicionarEsfera() {
    limparCena();
    const geometria = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x33ff57 });
    formaAtual = new THREE.Mesh(geometria, material);
    formaAtual.position.y = 1.5;
    cena.add(formaAtual);
}

function adicionarPiramide() {
    limparCena();
    const geometria = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x3357ff });
    formaAtual = new THREE.Mesh(geometria, material);
    formaAtual.position.y = 1.5; 
    cena.add(formaAtual);
}

function resetarCena() {
    limparCena();
}

function ativarBotao(id) {
    document.querySelectorAll('.button-container button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

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

document.getElementById('reset').addEventListener('click', () => {
    ativarBotao('reset');
    resetarCena();
});

document.getElementById('voltar').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tela-inicial').style.display = 'flex';
});

document.getElementById('iniciar').addEventListener('click', () => {
    document.getElementById('tela-inicial').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('render-container').style.display = 'block';
    init();
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});
