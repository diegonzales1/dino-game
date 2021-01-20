const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let points = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32)
        if(!isJumping)
            jump()
}

function jump() {
    isJumping = true

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval)

            // descendo 
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 20)
        } else {
            // subindo
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)
}

function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000

    cactus.classList.add('cactus')
    background.appendChild(cactus)
    cactus.style.left = 1000 + 'px'

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval)
            background.removeChild(cactus)
            points+=1;
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Game over
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo <br>Pontos: ' + points + '</h1><br><button type="button" onclick="refresh()" class="centralizar">Reiniciar Jogo</button>';
        }else {
            cactusPosition-= 10
            cactus.style.left = cactusPosition + 'px'    
        }
    }, 20)

    setTimeout(createCactus, randomTime)
}

function refresh(){
    window.location.reload();
}

createCactus()
document.addEventListener('keyup', handleKeyUp)