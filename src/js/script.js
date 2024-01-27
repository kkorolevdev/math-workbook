let currentProblem;

document.addEventListener('DOMContentLoaded', function () {
	generateProblem();
});

function generateProblem() {
	const num1 = Math.floor(Math.random() * 10);
	const num2 = Math.floor(Math.random() * 10);
	currentProblem = { num1, num2, answer: num1 + num2 };

	const problemContainer = document.getElementById('problem-container');
	problemContainer.textContent = `${num1} + ${num2} = `;
	document.getElementById('answerInput').value = '';
	document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
	const userAnswer = parseInt(document.getElementById('answerInput').value, 10);

	if (userAnswer === currentProblem.answer) {
		document.getElementById('feedback').textContent = 'Correct! Well done!';
	} else {
		document.getElementById('feedback').textContent = 'Incorrect. Try again!';
	}
}
