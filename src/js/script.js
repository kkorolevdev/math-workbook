document.addEventListener('DOMContentLoaded', function () {
    generateProblems(10);
});

function generateProblems(numProblems) {
    const mwList = document.querySelector('.mw-list');
    mwList.innerHTML = ''; // Clear previous content

    for (let i = 0; i < numProblems; i++) {
        const problemItem = document.createElement('div');
        problemItem.classList.add('mw-list__item');

        const problemContainer = document.createElement('div');
        problemContainer.classList.add('mw-list__problem');

        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);

        problemContainer.textContent = `${num1} + ${num2} = `;

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



function checkAnswers() {
    const inputElements = document.querySelectorAll('.mw-list__item .mw-list__answer input');
    const resultsContainer = document.querySelector('.mw-results');
    resultsContainer.textContent = ''; // Clear previous results

    let correctCount = 0;

    inputElements.forEach((input, index) => {
        const userAnswer = parseInt(input.value, 10);

        if (isNaN(userAnswer)) {
            input.classList.add('error');
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

    const percentageCorrect = (correctCount / inputElements.length) * 100;
    resultsContainer.textContent = `Percentage Correct: ${percentageCorrect.toFixed(2)}%`;
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
