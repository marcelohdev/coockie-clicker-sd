// --- CONFIGURAÇÃO ---
// Cole sua URL completa do Bloco 1 aqui
const apiUrl = 'https://pjsxo5g4na.execute-api.us-east-1.amazonaws.com/jogo'; 
// --- FIM DA CONFIGURAÇÃO ---


// 1. Pegar os elementos da página que vamos usar
const cookieButton = document.getElementById('cookie-btn');
const scoreDisplay = document.getElementById('score-display');
const statusMessage = document.getElementById('status-message');

// Pegar os botões da loja
const cursorButton = document.getElementById('buy-cursor');
const grandmaButton = document.getElementById('buy-grandma'); 

// Pegar os displays de custo
const cursorCostDisplay = document.getElementById('cursor-cost-display'); 
const grandmaCostDisplay = document.getElementById('grandma-cost-display');

// Pegar a lista de construções
const buildingsList = document.getElementById('buildings-list');

// 2. Inicializar as variáveis do jogo
let score = 0;
let cookiesPerSecond = 0; 
let statusTimer; 

// Definir os custos
let cursorCost = 10;
let grandmaCost = 100;

// Contagem de construções
let cursorCount = 0;
let grandmaCount = 0;
let firstBuildingPurchased = false; // Controla o placeholder

// 3. A função principal que é chamada a cada clique
async function handleCookieClick(event) {
    score++;
    updateScoreDisplay(); 

    // --- LÓGICA DO NÚMERO FLUTUANTE ---
    const number = document.createElement('div');
    number.textContent = '+1';
    number.classList.add('floating-number');
    const rect = cookieButton.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    number.style.left = `${x}px`;
    number.style.top = `${y}px`;
    cookieButton.appendChild(number);
    setTimeout(() => {
        number.remove();
    }, 1000);
    // --- FIM DA LÓGICA DO NÚMERO FLUTUANTE ---


    // --- Lógica da API (seu código original) ---
    const dadosParaEnviar = {
        pontuacao: Math.floor(score), 
        jogador: 'marc' // Você pode personalizar isso
    };

    // 4. Tenta enviar os dados para o back-end (API Gateway)
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(dadosParaEnviar),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Dados salvos no back-end com sucesso!');
            showStatusMessage('Pontuação salva na nuvem!', 'green');
        } else {
            console.error('Erro ao salvar no back-end:', response.status);
            showStatusMessage('Erro ao salvar (servidor)', 'red');
        }
    } catch (error) {
        console.error('Erro de rede ao chamar a API:', error);
        showStatusMessage('Erro de rede (verifique o CORS)', 'red');
    }
}

// 5. Função para mostrar mensagens de status (ex: "Salvo!")
function showStatusMessage(message, color) {
    statusMessage.textContent = message;
    statusMessage.style.color = color;
    
    clearTimeout(statusTimer);

    statusTimer = setTimeout(() => {
        statusMessage.textContent = '';
    }, 2000);
}

// 6. "Ouvir" o clique no cookie e chamar a função principal
cookieButton.addEventListener('click', handleCookieClick);

// ----------------------------------------------------------------
// --- LÓGICA DA LOJA E LOOP DE JOGO ---
// ----------------------------------------------------------------

// 7. Função helper para atualizar a pontuação na tela
function updateScoreDisplay() {
    scoreDisplay.textContent = Math.floor(score);
}

// 8. Lógica de compra do Cursor
cursorButton.addEventListener('click', function() {
    if (score >= cursorCost) {
        score -= cursorCost;
        cookiesPerSecond += 1; 
        cursorCount++; 
        
        updateScoreDisplay();
        showStatusMessage('Cursor comprado! +1 cookie/seg', '#55aaff'); 

        cursorCost = Math.ceil(cursorCost * 1.15); 
        cursorCostDisplay.textContent = cursorCost;
        
        updateBuildingUI('cursor', cursorCount, 'Cursor');
        addSpinningCursor(); // Chama o cursor giratório

    } else {
        showStatusMessage('Cookies insuficientes!', 'red');
    }
});

// 9. Lógica de compra da Avó
grandmaButton.addEventListener('click', function() {
    if (score >= grandmaCost) {
        score -= grandmaCost;
        cookiesPerSecond += 5;
        grandmaCount++; 
        
        updateScoreDisplay();
        showStatusMessage('Avó comprada! +5 cookies/seg', '#55aaff');

        grandmaCost = Math.ceil(grandmaCost * 1.15); 
        grandmaCostDisplay.textContent = grandmaCost;

        updateBuildingUI('grandma', grandmaCount, 'Avó');

        // ===============================================
        // === NOVO: Chama a função para criar a avó ===
        // ===============================================
        addSpinningGrandma();

    } else {
        showStatusMessage('Cookies insuficientes!', 'red');
    }
});

// 10. Função para atualizar a lista de Construções
function updateBuildingUI(id, count, name) {
    if (!firstBuildingPurchased) {
        const placeholder = document.getElementById('buildings-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        firstBuildingPurchased = true;
    }

    let itemUI = document.getElementById('building-' + id);

    if (!itemUI) {
        itemUI = document.createElement('div');
        itemUI.id = 'building-' + id;
        itemUI.className = 'building-item';
        itemUI.innerHTML = `<span class="building-name">${name}</span><span class="building-count">${count}</span>`;
        buildingsList.appendChild(itemUI);
    } else {
        itemUI.querySelector('.building-count').textContent = count;
    }
}

// 11. Função para criar um cursor giratório
function addSpinningCursor() {
    const orbit = document.createElement('div');
    orbit.className = 'cursor-orbit';

    const cursor = document.createElement('div');
    cursor.className = 'spinning-cursor';
    cursor.textContent = '👆'; 

    orbit.style.animationDelay = `-${(cursorCount * 0.8).toFixed(1)}s`;

    orbit.appendChild(cursor);
    cookieButton.appendChild(orbit);
}

// 12. NOVO: Função para criar uma avó giratória
function addSpinningGrandma() {
    // 1. Cria a órbita <div>
    const orbit = document.createElement('div');
    orbit.className = 'grandma-orbit';

    // 2. Cria a avó <div> (com emoji)
    const grandma = document.createElement('div');
    grandma.className = 'spinning-grandma';
    grandma.textContent = '👵'; // O emoji da avó

    // 3. Stagger (escalona) a animação
    // Usa a contagem de avós para espalhá-las
    orbit.style.animationDelay = `-${(grandmaCount * 1.5).toFixed(1)}s`;

    // 4. Monta (Avó dentro da Órbita, Órbita dentro do Botão-Cookie)
    orbit.appendChild(grandma);
    cookieButton.appendChild(orbit);
}


// 13. O "Game Loop" principal (era o 12)
setInterval(function() {
    if (cookiesPerSecond > 0) {
        score += cookiesPerSecond;
        updateScoreDisplay();
    }
    
    if (score >= cursorCost) {
        cursorButton.classList.remove('unavailable');
    } else {
        cursorButton.classList.add('unavailable');
    }
    
    if (score >= grandmaCost) {
        grandmaButton.classList.remove('unavailable');
    } else {
        grandmaButton.classList.add('unavailable');
    }
    
}, 1000);