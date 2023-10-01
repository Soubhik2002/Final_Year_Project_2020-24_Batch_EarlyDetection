const card = document.querySelectorAll('.cell');
const front = document.querySelectorAll('.front');
const container = document.querySelector('.container');
const score = document.querySelector('.score span');
let interval;

const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');
const gameoverSound = document.getElementById('gameoverSound');
const countdownSound = document.getElementById('countdownSound');

suffleImage()
clicking()
function suffleImage() {
    card.forEach(c => {
        const num = [...Array(card.length).keys()]
        const random = Math.floor(Math.random() * card.length)
        c.style.order = num[random]
    })
}


const time = document.getElementById('time');
let timestart = 1;
let intervalId;

function updateClock() {
    time.innerText = timestart;
    if (timestart === 7) {
        clearInterval(intervalId); 
        time.innerHTML = "Game Start";
        
    } else {
        timestart++;
    }
}
intervalId = setInterval(updateClock, 1000)



function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const countdownSound = document.getElementById('countdownSound');
    let timeLeft = 60;
    function updateCountdown() {
        countdownElement.innerHTML = `${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Game Over";
            countdownSound.play();
            card.forEach(cardToHide => {
                if (cardToHide !== card) {
                    cardToHide.classList.add('hidden');
                }
            }); 
            swal("Ohh No!", "Game Over ! Restart the Game Again", "error").then(() => {
                window.location.reload();
            });
        }
        timeLeft--;
    }
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
}
setTimeout(startCountdown, 7000);



score = 0;
function clicking() {
    for (let i = 0; i < card.length; i++) {
        front[i].classList.add('show');

        setTimeout(() => {
            front[i].classList.remove('show');
            enableClick(i);
        }, 7000);
    }
}

function enableClick(i) {
    card[i].addEventListener('click', () => {
        front[i].classList.add('flip');
        const flippedCard = document.querySelectorAll('.flip');

        if (flippedCard.length == 2) {
            container.style.pointerEvents = 'none';

            setTimeout(() => {
                container.style.pointerEvents = 'all';
                match(flippedCard[0], flippedCard[1]);
            }, 1000);
        }

        // Increment the score whenever a card is clicked
        score++;
        console.log('Score:', score);
    });
}

// Call the clicking function to start the process
clicking();
startCountdown()



function match(cardOne, cardTwo) {
    if (cardOne.dataset.index == cardTwo.dataset.index) {
        score.innerHTML = parseInt(score.innerHTML) + 1;

        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');

        cardOne.classList.add('match');
        cardTwo.classList.add('match');

        // Play the flip sound
        flipSound.play();

        if (score.innerHTML == 8) {
            // alert("Congratulations! You've won the game!");
            gameoverSound.play();
            card.forEach(cardToHide => {
                if (cardToHide !== card) {
                    cardToHide.classList.add('hidden');
                }
            });
            clearInterval(interval);
            swal("Good job!", "Congratulations! You've won the game! Go to the Next Level", "success").then(() => {
                window.location.href = '../level/indexlevel5.html';
            });
            time.innerHTML = "Game Over";
            countdownElement.innerHTML = "Game Over";
        }
    } else {
        setTimeout(() => {
            // score.innerHTML = parseInt(score.innerHTML) - 1;

            if (parseInt(score.innerHTML) == -5) {
                alert("Game Over!");
                resetGame();
            }

            // Play the flip sound
            matchSound.play();
            cardOne.classList.remove('flip');
            cardTwo.classList.remove('flip');
        }, 300);
    }
}

function resetGame() {
    // score.innerHTML = 0;
    window.location.reload();
}














