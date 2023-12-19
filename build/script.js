"use strict";
const strButton = document.getElementById("strButton");
const telaPrincipal = document.getElementById("telaPrincipal");
strButton === null || strButton === void 0 ? void 0 : strButton.addEventListener('click', gameStart);
let tempoReacaoFinal = 0;
function gameStart() {
    if (telaPrincipal) {
        telaPrincipal.innerHTML = '<span class="loading" id="loadingScreen"></span>';
    }
    let telaLoading = document.getElementById("loadingScreen");
    let intervaloAzul = setInterval(() => {
        if (telaLoading) {
            if (telaLoading.innerText === '...') {
                telaLoading.innerText = '.';
            }
            else {
                telaLoading.innerText += '.';
            }
        }
    }, 500);
    setTimeout(() => {
        if (telaLoading) {
            telaLoading.innerHTML = '';
        }
        clearInterval(intervaloAzul);
        if (telaPrincipal) {
            telaPrincipal.style.backgroundColor = '#292C7E';
        }
        contandoTempo();
    }, (Math.random() * 10000 + 1));
}
function contandoTempo() {
    let inicioTempo = performance.now();
    let fimTempo = 0;
    function contaTempoDeReacao(e) {
        if (e.code === 'Space') {
            fimTempo = performance.now();
        }
        document.removeEventListener('keydown', contaTempoDeReacao);
        tempoReacaoFinal = fimTempo - inicioTempo;
        if (telaPrincipal) {
            telaPrincipal.style.backgroundColor = 'white';
        }
        apresentaTempoFinal();
    }
    document.addEventListener('keydown', contaTempoDeReacao);
}
function apresentaTempoFinal() {
    if (telaPrincipal) {
        telaPrincipal.innerHTML = `
    <p class="game-description">Your reaction time was
    <b>${tempoReacaoFinal}</b> milliseconds!</p>
    <button class="str-button" onclick="gameStart()">PLAY AGAIN</button>`;
    }
}
