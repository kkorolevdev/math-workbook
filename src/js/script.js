let numberOfProblemsToShow = 5; // Change this number as needed
let maxNumber = 100; // Change this number to control the range of numbers
let includeAddition = true; // Flag for including addition
let includeSubtraction = true; // Flag for including subtraction
let includeMultiplication = true; // Flag for including multiplication
let includeDivision = true; // Flag for including division
let maxDivisor = 5; // Change this number to control the maximum divisor in division
let allowNegativeAnswers = false; // Flag for allowing negative answers

document.addEventListener('DOMContentLoaded', function () {
    generateProblems(numberOfProblemsToShow);
});

function generateProblems(numProblems) {
    const mwList = document.querySelector('.mw-list');
    mwList.innerHTML = ''; // Clear previous content

    for (let i = 0; i < numProblems; i++) {
        const problemItem = document.createElement('div');
        problemItem.classList.add('mw-list__item');

        const problemContainer = document.createElement('div');
        problemContainer.classList.add('mw-list__problem');

        let num1, num2, operator, answer;

        do {
            num1 = getRandomNumber();
            num2 = getRandomNumber();
            operator = getRandomOperator();
            answer = calculateAnswer(num1, num2, operator);
        } while (!isProblemValid(answer));

        problemContainer.textContent = `${num1} ${operator} ${num2} = `;

        problemItem.appendChild(problemContainer);

        const answerContainer = document.createElement('div');
        answerContainer.classList.add('mw-list__answer');
        const answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerContainer.appendChild(answerInput);
        problemItem.appendChild(answerContainer);

        mwList.appendChild(problemItem);
    }

    document.querySelector('.mw-results').textContent = ''; // Clear previous results
}

function getRandomNumber() {
    const isPositiveOnly = !allowNegativeAnswers;
    const sign = isPositiveOnly ? 1 : Math.random() < 0.5 ? -1 : 1;
    return sign * Math.floor(Math.random() * (maxNumber + 1));
}

function getRandomOperator() {
    const operators = [];
    if (includeAddition) operators.push('+');
    if (includeSubtraction) operators.push('-');
    if (includeMultiplication) operators.push('*');
    if (includeDivision) operators.push('/');
    
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
}

function calculateAnswer(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return NaN;
    }
}

function isProblemValid(answer) {
    // Check if the answer is within the specified range
    const isValidRange = Math.abs(answer) <= maxNumber;
    
    // Check if the answer is a whole number when division is involved
    return isValidRange && !(includeDivision && answer % 1 !== 0) && 
           !(answer < 0 && !allowNegativeAnswers);
}



function checkAnswers() {
    const inputElements = document.querySelectorAll('.mw-list__item .mw-list__answer input');
    const resultsContainer = document.querySelector('.mw-results');
    resultsContainer.textContent = ''; // Clear previous results

    let correctCount = 0;
    let allFilled = true;

    inputElements.forEach((input, index) => {
        const userAnswer = parseInt(input.value, 10);

        if (isNaN(userAnswer)) {
            input.classList.add('error');
            allFilled = false;
        } else {
            input.classList.remove('error');
            const { num1, num2, answer } = getProblem(index);
            const isCorrect = userAnswer === answer;
            displayResult(index, isCorrect);
            if (isCorrect) {
                correctCount++;
            }
        }
    });

    if (allFilled) {
        const percentageCorrect = (correctCount / inputElements.length) * 100;
        resultsContainer.textContent = `Percentage Correct: ${percentageCorrect.toFixed(2)}%`;
    }
}

function getProblem(index) {
    const mwListItems = document.querySelectorAll('.mw-list__item');
    const problem = mwListItems[index].querySelector('.mw-list__problem');
    const [num1, num2] = problem.textContent.split('+').map(str => parseInt(str, 10));
    const answer = num1 + num2;
    return { num1, num2, answer };
}

function displayResult(index, isCorrect) {
    const mwListItems = document.querySelectorAll('.mw-list__item');
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('mw-list__result');
    resultContainer.textContent = isCorrect ? 'Correct' : 'Wrong';
    mwListItems[index].appendChild(resultContainer);
}
