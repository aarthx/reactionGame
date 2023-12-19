const strButton: HTMLElement | null = document.getElementById("strButton")
const telaPrincipal: HTMLElement | null = document.getElementById("telaPrincipal")
strButton?.addEventListener('click', gameStart)
let tempoReacaoFinal: number = 0

function gameStart() {
  if(telaPrincipal) {
    telaPrincipal.innerHTML = '<span class="loading" id="loadingScreen"></span>'
  }
  let telaLoading: HTMLElement | null = document.getElementById("loadingScreen")
  let intervaloAzul: number = setInterval(() => {
    if (telaLoading) {
      if(telaLoading.innerText === '...') {
        telaLoading.innerText = '.'
      } else {
        telaLoading.innerText += '.'
      }
    }
  }, 500)
  setTimeout(() => {
    if(telaLoading) {
      telaLoading.innerHTML = ''
    }
    clearInterval(intervaloAzul)
    if(telaPrincipal) {
      telaPrincipal.style.backgroundColor = '#292C7E'
    }
    contandoTempo()
  }, (Math.random() * 10000 + 1))
}

function contandoTempo() {
  let inicioTempo: number = performance.now()
  let fimTempo: number = 0
  function contaTempoDeReacao(e: KeyboardEvent) {
    if (e.code === 'Space') {
      fimTempo = performance.now()
    }
    document.removeEventListener('keydown', contaTempoDeReacao)
    tempoReacaoFinal = fimTempo - inicioTempo
    if (telaPrincipal) {
      telaPrincipal.style.backgroundColor = 'white'
    }
    apresentaTempoFinal()
  }
  document.addEventListener('keydown', contaTempoDeReacao)
}

function apresentaTempoFinal() {
  if(telaPrincipal) {
    telaPrincipal.innerHTML = `
    <p class="game-description">Your reaction time was
    <b>${tempoReacaoFinal}</b> milliseconds!</p>
    <button class="str-button" onclick="gameStart()">PLAY AGAIN</button>`
  }
}