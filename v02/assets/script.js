(function () {

	// Settings.
	const mathExercises = 10;

	let result;
	const resultMin = 0;
	const resultMax = 100;
	
	const actionOne = ['+', '-'];
	
	let paramOne;
	const paramOneMin = 1;
	const paramOneMax = 99;

	let paramTwo;
	const paramTwoMin = 1;
	const paramTwoMax = 99;



    // Function to pick a random action from actionOne array
    function pickRandomAction() {
        return actionOne[Math.floor(Math.random() * actionOne.length)];
    }

    // Function to generate a random value for paramOne
    function generateParamOne() {
        return Math.floor(Math.random() * (paramOneMax - paramOneMin + 1)) + paramOneMin;
    }

    // Function to generate a random value for result based on the chosen action
    function generateResult(action) {
        let calculatedResult;
        if (resultMax - paramOne < paramTwoMin) {
            // Ensure result can be within resultMin and resultMax range
            paramTwo = resultMax - paramOne;
        } else {
            paramTwo = Math.floor(Math.random() * (resultMax - paramOne - paramTwoMin + 1)) + paramTwoMin;
        }
        switch (action) {
            case '+':
                calculatedResult = paramOne + paramTwo;
                break;
            case '-':
                calculatedResult = paramOne - paramTwo;
                break;
            default:
                calculatedResult = 0;
                break;
        }
        // Ensure the calculated result is not less than resultMin
        result = Math.max(calculatedResult, resultMin);
        return result;
    }

    // Function to generate the problem
    function generateProblem() {
        // Reset user solution input and result display
        const userSolutionInput = document.querySelector('.user-solution');
        const resultDisplay = document.querySelector('.mw-calc__list-item-result');
        userSolutionInput.value = '';
        resultDisplay.textContent = '';

        // Pick random action
        const action = pickRandomAction();

        // Generate paramOne and paramTwo
        paramOne = generateParamOne();
        paramTwo = Math.floor(Math.random() * (paramTwoMax - paramTwoMin + 1)) + paramTwoMin;

        // Generate result
        result = generateResult(action);

        // Display problem
        const problemDisplay = document.querySelector('.mw-calc__list-item-problem');
        problemDisplay.innerHTML = `
			<span class="mw-param param-one">${paramOne}</span>
			<span class="mw-action action-one">${action}</span> 
			<span class="mw-param param-two">${paramTwo}</span>
		`;
    }

    function handleClickStart(event) {
        event.preventDefault();
        generateProblem();
    }

    function handleClickCheck(event) {
        event.preventDefault();
        const userSolutionInput = document.querySelector('.user-solution');
        const resultDisplay = document.querySelector('.mw-calc__list-item-result');
        const userSolution = parseInt(userSolutionInput.value);
        if (userSolution === result) {
            resultDisplay.textContent = 'Correct';
        } else {
            resultDisplay.textContent = 'Wrong';
        }
    }

    const startToggles = document.querySelectorAll('.mw-button-start');
    startToggles.forEach(startToggle => {
        startToggle.addEventListener('click', handleClickStart);
    });

    const checkToggles = document.querySelectorAll('.mw-button-check');
    checkToggles.forEach(checkToggle => {
        checkToggle.addEventListener('click', handleClickCheck);
    });



})();
