// --- CONFIGURAÇÃO ---
// Cole sua URL completa do Bloco 1 aqui
const apiUrl = 'https://pjsxo5g4na.execute-api.us-east-1.amazonaws.com/jogo'; 
// --- FIM DA CONFIGURAÇÃO ---


// 1. Pegar os elementos da página que vamos usar
const cookieButton = document.getElementById('cookie-btn');
const scoreDisplay = document.getElementById('score-display');
const statusMessage = document.getElementById('status-message');

// 2. Inicializar a pontuação
let score = 0;
let statusTimer; // Variável para controlar o timer da mensagem

// 3. A função principal que é chamada a cada clique
async function handleCookieClick() {
    // Incrementa a pontuação localmente e atualiza a tela
    score++;
    scoreDisplay.textContent = score;

    // Prepara os dados para enviar à API (como no código Lambda)
    const dadosParaEnviar = {
        pontuacao: score,
        jogador: 'marcelo_henrique' // Você pode personalizar isso
    };

    console.log('Enviando dados para a API:', dadosParaEnviar);

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
            // Sucesso!
            console.log('Dados salvos no back-end com sucesso!');
            showStatusMessage('Pontuação salva na nuvem!', 'green');
        } else {
            // Erro do servidor (API, Lambda, etc)
            console.error('Erro ao salvar no back-end:', response.status);
            showStatusMessage('Erro ao salvar (servidor)', 'red');
        }
    } catch (error) {
        // Erro de rede (CORS, internet caiu, etc)
        console.error('Erro de rede ao chamar a API:', error);
        showStatusMessage('Erro de rede (verifique o CORS)', 'red');
    }
}

// 5. Função para mostrar mensagens de status (ex: "Salvo!")
function showStatusMessage(message, color) {
    statusMessage.textContent = message;
    statusMessage.style.color = color;
    
    // Limpa o timer anterior se existir
    clearTimeout(statusTimer);

    // Define um timer para limpar a mensagem após 2 segundos
    statusTimer = setTimeout(() => {
        statusMessage.textContent = '';
    }, 2000);
}

// 6. "Ouvir" o clique no cookie e chamar a função principal
cookieButton.addEventListener('click', handleCookieClick);