const heartIcon = document.querySelectorAll('#heart-icon-video');  // Seletor atualizado para ícones específicos do vídeo
const videoContainer = document.getElementById('video-container');
const body = document.body;

// Função para alternar para "like" (preencher coração)
function markLike(icon) {
    icon.setAttribute('name', 'heart');  // Marca o coração como "like"
    icon.style.color = '#ff5454';  // Cor vermelha para "like"
}

// Função para alternar para "deslike"
function markDeslike(icon) {
    icon.setAttribute('name', 'heart');  // Marca o coração como "deslike"
    icon.style.color = 'white';  // Cor branca para "deslike"
}

// Função para aplicar o estado salvo do "like" ou "deslike"
function applyStoredLikeState() {
    const likedState = localStorage.getItem('liked');  // Recupera o estado salvo
    heartIcon.forEach(icon => {
        if (likedState === 'liked') {
            markLike(icon);  // Aplica o "like" se o estado salvo for "liked"
        } else {
            markDeslike(icon);  // Aplica o "deslike" caso contrário
        }
    });
}

// Adicionando evento de clique no coração
heartIcon.forEach(icon => {
    icon.addEventListener('click', () => {
        if (icon.style.color === 'white') {
            markLike(icon);  // Marca como like no primeiro clique
            localStorage.setItem('liked', 'liked');  // Salva o estado como "liked"
        } else {
            markDeslike(icon);  // Marca como deslike no segundo clique
            localStorage.setItem('liked', 'desliked');  // Salva o estado como "desliked"
        }
    });
});

// Variáveis para o toque duplo
let lastTap = 0;

// Função para criar o ícone de coração no local do toque
function createHeartAnimation(x, y) {
    const heartAnimation = document.createElement('ion-icon');
    heartAnimation.classList.add('heart-animation');
    heartAnimation.setAttribute('name', 'heart');
    heartAnimation.style.left = `${x}px`;
    heartAnimation.style.top = `${y}px`;
    body.appendChild(heartAnimation);

    // Remover o ícone após a animação
    setTimeout(() => {
        heartAnimation.remove();
    }, 1000);
}

// Adicionando evento de duplo toque no mobile
videoContainer.addEventListener('touchstart', (event) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    const touchX = event.touches[0].clientX;  // Coordenada X do toque
    const touchY = event.touches[0].clientY;  // Coordenada Y do toque

    // Se o toque foi em menos de 300ms, é um duplo toque
    if (tapLength < 300 && tapLength > 0) {
        createHeartAnimation(touchX, touchY);  // Cria a animação do coração
        heartIcon.forEach(icon => {
            markLike(icon);  // Marca o coração como "like"
            localStorage.setItem('liked', 'liked');  // Salva o estado como "liked"
        });
    }

    lastTap = currentTime;
});

// Adicionando evento de duplo clique no desktop
videoContainer.addEventListener('dblclick', (event) => {
    const touchX = event.clientX;  // Coordenada X do clique
    const touchY = event.clientY;  // Coordenada Y do clique
    createHeartAnimation(touchX, touchY);  // Cria a animação do coração
    heartIcon.forEach(icon => {
        markLike(icon);  // Marca o coração como "like"
        localStorage.setItem('liked', 'liked');  // Salva o estado como "liked"
    });
});

// Aplicando o estado salvo ao carregar a página
window.addEventListener('load', () => {
    applyStoredLikeState();  // Recupera o estado salvo e aplica nos ícones
});
