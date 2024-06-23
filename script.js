var dificuldadeEscolhida = document.getElementById('selectDif')

const dificuldadesJogo = {
    'Fácil': {"duracaoJogo": 60, "duracaoMosca": 1250, "frequencia": 2000},
    'Médio': {"duracaoJogo": 40, "duracaoMosca": 1000, "frequencia": 1500},
    'Difícil': {"duracaoJogo": 20, "duracaoMosca": 750, "frequencia": 1250}
}

var mainMenu = document.getElementById('mainMenu')

try{
dificuldadeEscolhida.addEventListener('change', () => {
    let startBtn = document.createElement('button')
    localStorage.setItem('dificuldade', dificuldadeEscolhida.value)
    startBtn.innerText = 'Iniciar Jogo'
    startBtn.id = 'startBtn'
    startBtn.addEventListener('click', () => {window.location.href='game.html'})
    if (mainMenu.childElementCount == 1 && dificuldadeEscolhida.value != 'Selecione a dificuldade'){
        mainMenu.append(startBtn)
    } else if(mainMenu.childElementCount == 2 && dificuldadeEscolhida.value == 'Selecione a dificuldade' ){
        mainMenu.lastChild.remove()
    }
})
} catch(e) {
}

var dificuldade = localStorage.getItem('dificuldade')

window.onload = () => {
    if(window.location.pathname.includes('game.html')){
        let tempoRestante = document.getElementById('tempoRestante')
        let timerStart = document.createElement('span')
        let countdown = 5
        timerStart.id = 'timerStart'
        cenario.append(timerStart)
        corDificuldade(dificuldade)
        tempoRestante.innerText = dificuldadesJogo[dificuldade].duracaoJogo
        let countdownInterval = setInterval(() => {
            timerStart.innerHTML = countdown--
            if (countdown < 0){
                timerStart.remove()
                clearInterval(countdownInterval)
                comecarJogo()
            }
        }, 1000)
    } else if (window.location.pathname.includes('fimdejogo.html')){
        var resultDiv = document.getElementById('gameover')
        var resultImg = document.createElement('img')
        if(localStorage.getItem('condicao') == 'perdeu'){
            var resultImg = document.createElement('img')
            resultImg.src = 'imagens/game_over.png'
            resultDiv.appendChild(resultImg)
        } else if(localStorage.getItem('condicao') == 'ganhou'){
            resultImg.src = 'imagens/vitoria.png'
            resultDiv.appendChild(resultImg)
        }
    }
} 

var pontuacao = document.getElementById('pontuacao')
var pontostotais = 0
var vidasRestantes = 3

function corDificuldade(x){
    let stringDificuldade = document.getElementById('dificuldade')
    stringDificuldade.innerText = x
    stringDificuldade.classList.add(x)
}

function iteracaoJogo(){
    let vida1 = document.getElementById('heart1')
    let vida2 = document.getElementById('heart2')
    let vida3 = document.getElementById('heart3')
    duracaoMosca = dificuldadesJogo[dificuldade].duracaoMosca
    criarMoscaAleatoria(randomizar('x'), randomizar('y'))
    moscaCriada = document.getElementById('moscaCriada')
    var mouseEvents = ['click', 'dragstart']
    mouseEvents.forEach(ev => 
        moscaCriada.addEventListener(ev, () => {
            if (moscaCriada.classList.contains('grande') == true){
                pontostotais = pontostotais + 40
            } else if (moscaCriada.classList.contains('media') == true){
                pontostotais = pontostotais + 10
            } else if (moscaCriada.classList.contains('pequena') == true){
                pontostotais = pontostotais + 5
            }
            pontuacao.innerText = pontostotais
            moscaCriada.remove();
            clearTimeout(tempoLimite)
        }, false)
    )
    var tempoLimite = setTimeout(() => {
        moscaCriada.remove()
        vidasRestantes -= 1
        if (vidasRestantes == 2){
            vida1.src = 'imagens/coracao_vazio.png'
        } else if (vidasRestantes == 1){
            vida2.src = 'imagens/coracao_vazio.png'
        } else if (vidasRestantes == 0 || duracaoJogo == 0){
            vida3.src = 'imagens/coracao_vazio.png'
            clearInterval(intervaloPrincipal)
            localStorage.setItem('condicao', 'perdeu')
            window.location.href = 'fimdejogo.html'
        }
    }, duracaoMosca)
}

function comecarJogo(){
    tempoRestante = document.getElementById('tempoRestante')
    document.body.style.cursor = "url('imagens/mata_mosca.png'), auto"
    duracaoJogo = dificuldadesJogo[dificuldade].duracaoJogo
    frequencia = dificuldadesJogo[dificuldade].frequencia
    tempoJogo = setInterval(() =>{
        tempoRestante.innerText = duracaoJogo--
        if(tempoRestante.innerText == 0 && vidasRestantes > 0){
            localStorage.setItem('condicao', 'ganhou')
            window.location.href = 'fimdejogo.html'
        }
    }, 1000)
    intervaloPrincipal = setInterval(() => {
        iteracaoJogo()
    }, frequencia)
}

function criarMoscaAleatoria(posX, posY){
    var cenario = document.getElementById('cenario')
    mosca = document.createElement('img')
    mosca.id = 'moscaCriada'
    mosca.style.position = 'absolute'
    mosca.style.top = posY + 'px'
    mosca.style.left = posX + 'px'
    mosca.src = 'imagens/mosca.png'
    mosca.classList.add(tamanhoMosca())
    mosca.classList.add(dificuldade)
    cenario.append(mosca)
}

function tamanhoMosca(){
    randomizador = Math.ceil(Math.random()*100)
    if (randomizador < 15){
        return 'grande'
    }  else if (randomizador > 15 && randomizador < 50){
        return 'media'
    } else {
        return 'pequena'
    }
}

function randomizar(value){
    let valorX = Math.ceil(Math.random()*window.innerWidth) - 200
    let valorY = Math.ceil(Math.random()*innerHeight) - 200
    if (value == 'x'){
        if (valorX < 100){
            valorX += 300
        } return valorX
    } else if (value == 'y'){
        if (valorY < 100){
            valorY += 300
        } return valorY
    }
}

// Página de fim de jogo

try{
    jogarNovamente = document.getElementById('play-again')
    jogarNovamente.addEventListener('click', () => {
        window.location.href = 'game.html'
    })
    voltarMenu = document.getElementById('return-menu')
    voltarMenu.addEventListener('click', () => {
        window.location.href = 'index.html'
    })
    } catch(e){     
}
