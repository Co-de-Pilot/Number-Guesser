const guessNumberField = document.querySelector('#guessNumber');
const resultfield = document.querySelector('#result');
const historyfield = document.querySelector('#history');
const guessButton = document.querySelector('.js-guess');
const newGameButton = document.querySelector('.js-newgame');
let inputString;
let inputNumber;
let randomNumber;
let historyArray = [];
let historyColor;
let isValid;

document.querySelector('.js-form').addEventListener('submit', formSubmit);
function formSubmit(event) {
    event.preventDefault();
}

function generateRandomNumber() {
    randomNumber = Math.trunc( Math.random() * 100 ) + 1;
}

function readInput() {
    inputString = guessNumberField.value;
}

function validateInput() {
    isValid = true;
    if (inputString === '' ||
        inputString === '0' ||
        inputString.includes('-') ||
        inputString.includes('.') ||
        (inputString.length > 2 && inputString !== '100')) {
        isValid = false;
    }
}

function convertInput() {
    inputNumber = Number.parseInt(inputString);
}

function isWon() {
    if (inputNumber === randomNumber) return true;
    return false;
}

function isGreater() {
    if (inputNumber > randomNumber) return true;
    return false;
}

function isSmaller() {
    if (inputNumber < randomNumber) return true;
    return false;
}

function displayResult() {
    resultfield.innerHTML = '';
    if (!isValid) {
        resultfield.innerHTML = 'Adj meg egyérvényes számtippet!';
        historyColor = 'red';
    } else {
        if (isWon()) {
            historyColor = 'green';
            resultfield.innerHTML = "Gratulálunk! Eltaláltad a számot! Tippek száma: " + (historyArray.length + 1);
            disableButtonAndInput();
        } else if (isGreater()) {
            historyColor = 'orange';
            resultfield.innerHTML = "Nem talált! A tipped (" + inputNumber + ") <span class='orange'>NAGYOBB</span>, mint a keresett szám.";
        } else if (isSmaller()) {
            historyColor = 'yellow';
            resultfield.innerHTML = "Nem talált! A tipped (" + inputNumber + ") <span class='yellow'>KISEBB</span>, mint a keresett szám.";
        }
    }
}

function displayHistory() {
    historyArray = [`<li class="${historyColor}">${new Date().toUTCString()}: ${resultfield.innerHTML}</li>`, ...historyArray];
    historyfield.innerHTML = `<ul>${historyArray.map(h => `<li>${h}</li>`).join("")}</ul>`;
}

function resetFieldsAndHistory() {
    resultfield.innerHTML = '';
    historyfield.innerHTML = '';
    guessNumberField.value = '';
    historyArray = [];
}

function disableButtonAndInput() {
    guessNumberField.disabled = true;
    guessButton.disabled = true;
};
disableButtonAndInput();

function enableButtonAndInput() {
    guessNumberField.disabled = false;
    guessButton.disabled = false;
}

guessButton.addEventListener('click', () => {
    readInput();
    validateInput();
    convertInput();
    displayResult();
    displayHistory();
});

newGameButton.addEventListener('click', () => {
    enableButtonAndInput();
    generateRandomNumber();
    resetFieldsAndHistory();
});