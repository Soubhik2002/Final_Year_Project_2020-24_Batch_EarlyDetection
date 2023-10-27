const card = document.querySelectorAll('.cell')
const front = document.querySelectorAll('.front')
const container = document.querySelector('.container')
const score = document.querySelector('.score span')

const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');
const bombSound = document.getElementById('bombSound');
const gameSound = document.getElementById('gameSound');

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
    if (timestart === 5) {
        clearInterval(intervalId);
        time.innerHTML = "Game Start";
    } else {
        timestart++;
    }
}
intervalId = setInterval(updateClock, 1000)



score = 0; // Initialize the score variable
function clicking() {
    for (let i = 0; i < card.length; i++) {
        front[i].classList.add('show');

        // Use setTimeout for a 5-second delay
        setTimeout(() => {
            front[i].classList.remove('show');
            enableClick(i); // Enable the click event after the delay
        }, 5000);
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


function match(cardOne, cardTwo) {
    if (cardOne.dataset.index == cardTwo.dataset.index) {
        score.innerHTML = parseInt(score.innerHTML) + 1;

        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');

        cardOne.classList.add('match');
        cardTwo.classList.add('match');

        // Play the flip sound
        flipSound.play();

        if (score.innerHTML == 5) {
            // alert("Congratulations! You've won the game!");
            countdownSound.play();
            card.forEach(cardToHide => {
                if (cardToHide !== card) {
                    cardToHide.classList.add('hidden');
                }
            });
            time.innerHTML = "Game Over";
            swal("Good job!", "Congratulations! You've won the game! Go to the Next Level", "success").then(() => {
                window.location.href = '../level/indexlevel3.html';
            });
        }
    }
    else {
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













