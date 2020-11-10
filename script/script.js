// Global Variables -----------------------------------------------------

// SOME VARIABLES FOR IDS
let start = document.getElementById('start-button');
let restart = document.getElementById('restart-button');
let counter = document.getElementById('counter');
let update = document.getElementById('mistakes');
let getHint = document.getElementById("hint");
let showClue = document.getElementById("clue");
let alphabet = document.getElementById('alphabet');
let inputText = document.getElementById('input-text');
let body = document.getElementById('body');
let arm = document.getElementById('arm');
let leg = document.getElementById('leg');
let head = document.getElementById('head');
let pole = document.getElementById('pole');
let ground = document.getElementById('ground');

// DOM STYLE - HIDE SOME STUFF 
ground.style.visibility = 'hidden';
pole.style.visibility = 'hidden';
head.style.visibility = 'hidden';
leg.style.visibility = 'hidden';
arm.style.visibility = 'hidden';
body.style.visibility = 'hidden';
counter.style.visibility = 'hidden';
restart.style.visibility = 'hidden';
alphabet.style.visibility = 'hidden';
getHint.style.visibility = 'hidden';

// SOME MORE VARIABLES WITH VALUE 0 AND EMPTY ARREY
let answerArray = [];
let mistakes = 0;
let win = 0;
let dead = 0;

// WORDS AND HINTS ARREYS ---------------------------------------------
let hints = ["pokemon", "brain-damage", "soothing", "predator", "fruit", "reptile", "essential", "cocktail", "bird"];
let words = ["pikachu", "javascript", "sunset", "hyena", "banana", "turtle", "coffee", "sidecar", "sparrow"];

// RANDOMIZER ---------------------------------------------------------
let randomWords = words[Math.floor(Math.random() * words.length)];

// GET A HINT FROM THE ARREY WITH THE SAME INDEX AS RANDOMIZED WORD FROM THAT ARREY
getHint.addEventListener('click', () => {
    var a = words.indexOf(randomWords);
    var equalHint = hints[a];
    showClue.innerHTML = `BETTER GET IT RIGHT NOW <br> <u>${equalHint}<u>`;
})

// RESTART BUTTON ------------------------------------------------------------------
restart.addEventListener('click', () => {
    location.reload();
})

// START BUTTON WITH EVENTLISTNER AND CREATING A "EMPTY" LIST [_ _ _ _ _ _] 
// LENGTH EQUAL TO THE RANDOMIZED WORD -------------------------------------------
    start.addEventListener('click', () => {
    start.style.visibility = 'hidden';
    alphabet.style.visibility = '';
    counter.style.visibility = '';
    getHint.style.visibility = '';
    
    // LOOP
    for (let i = 0; i < randomWords.length; i++) {
        answerArray[i] = ' _ ';
        joinThat();
    }
})
// CHECKING IF CHOOSEN LETTER IS A MATCH ON THE RANDOMIZED WORD
// IF SO IT REPLACES THE INDEX IN THE "EMPTY" LIST WITH THAT LETTER
let guess = (id) => {
    if (randomWords.includes(id)) {
        for (x = 0; x < randomWords.length; x++) {
            if (randomWords[x] === id) {
                answerArray[x] = (id);
                joinThat();
                check();
            }
        }
    }
    else {
        count();
        updateCounter();
    }
}

// FUNCTIONS FOR THE GAME ------------------------------------------------------------------

// ADDS ONE MISTAKE AND CHECKS IF MAX MISTAKES IS REACHED THEN ITS GAME OVER.
function count() {
    mistakes += 1;
    if (mistakes === 5) {
        restart.style.visibility = '';
        leg.style.visibility = '';
        alphabet.style.visibility = 'hidden';
        inputText.innerHTML = `RIGHT WORD WAS <u>${randomWords}</u> YOU SUCK!`;
        gameOver();
        hideThese();
    }
    // ADDS THE HANING MAN SVGS BY EACH MISTAKE
    if (mistakes === 1) {
        ground.style.visibility = '';
        pole.style.visibility = '';
    } if (mistakes === 2) {
        head.style.visibility = '';
    } if (mistakes === 3) {
        body.style.visibility = '';
    } if (mistakes === 4) {
        arm.style.visibility = '';
    }
}

// CHECKS IF YOU HAVE GUESSED THE RIGHT WORD
function check() {
    win += 1;
    if (win >= randomWords.length) {
        inputText.innerHTML = `YOU FUCKING DESTROYED THIS GAME!`;
        restart.style.visibility = '';
        hideThese();
        clear();
    }
}

// UPDATE MISTAKES ON SCREEN
function updateCounter() {
    update.innerHTML = mistakes;
}
// REMOVES LETTER AFTER ITS CLICKED
function hideButtons() {
    document.querySelectorAll('li').forEach(li =>
        li.addEventListener('click', _ => li.style.visibility = 'hidden'));
}

// DOM STYLE - HIDDEN FUNCTION
function hideThese() {
    alphabet.style.visibility = 'hidden';
    counter.style.visibility = 'hidden';
    getHint.style.visibility = 'hidden';
    showClue.style.visibility = 'hidden';
    counter.style.visibility = 'hidden';
    getHint.style.visibility = 'hidden';
    showClue.style.visibility = 'hidden';
}


// JOIN RETURNS THE ARREY AS A STRING THATS WHY WE GET THE EMPTY ARREY OR WHEN WE GET A HIT IT FILLS THAT INDEX WITH A LETTER
function joinThat() {
    inputText.innerHTML = answerArray.join('');
}

// SOUND FUNCTIONS
function gameOver() {
    let audio = new Audio("/assets/miss.mp3");
    audio.play();
}

function clear() {
    let audio = new Audio("/assets/clear.mp3");
    audio.play();
}