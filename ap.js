


// Adicionano lista de palavras para o jogo
const listaPalavras = ['ebria','jaca','manga','vanesssssa'];

let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestates;


//FUNCÇÃO PARA INICIAR O JOGO

function iniciarJogo(){
    //escolher palavra aleatoria dalista
    palavraEscolhida = listaPalavras[Math.floor(Math.random()*listaPalavras.length)]

    //inivializar a exibição 
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');

    //iniciaçizar a lista de palavras chutadas
    letrasChutadas = [];

    //definir o numero maximo de tentativaas
    tentativasRestates = 7;

    numeroErros = 0;

    atualizarExibicao();
}

function atualizarExibicao(){
    document.getElementById('exibicao-palavra').innerText = exibicaoPalavra.join(" ");
    document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(", ")}`
    
    document.getElementById("imagem").src = `img/forca${numeroErros}.png`

    //verificar se o jogo terminou
    if(tentativasRestates ===0){
        encerrarJogo('FIM DE JOGO!!!');
    } else if(!exibicaoPalavra.includes('_')){
        encerrarJogo('Parabéns! Você venceu!')
    }

}

function chutarLetra(){
    const entradaLetra = document.getElementById('entrada-letra');
    const letra = entradaLetra.value.toLowerCase();

    if(!letra.match(/[a-zà-ùç]/i)){
        alert('Por favor, insira uma letra válida.')
        return;
    }
    if(letrasChutadas.includes(letra)){
        alert('Você já tentou esta letra, Tente outra.')
        return;
    }

    letrasChutadas.push(letra);

    if(palavraEscolhida.includes(letra)){
        for (let i=0; i < palavraEscolhida.length; i++){
            if (palavraEscolhida[i] === letra){
                exibicaoPalavra[i] = letra;
            }
        }
    } else {
        tentativasRestates--;
        numeroErros++;
    }
    entradaLetra.value = '';

    atualizarExibicao();
}

function encerrarJogo(mensagem){
    //desanilitar campinho
    document.getElementById('entrada-letra').disabled = true;

     // Exibir mensagem
     if (tentativasRestates === 0) {
        mensagem += ` A palavra era: "${palavraEscolhida}".`;
    }

    //exibir mensagem
    document.getElementById('mensagem').innerText = mensagem;

    //exibir botao reiniciar
    document.getElementById('botao-reiniciar').style.display = 'block'

}



window.load = iniciarJogo();