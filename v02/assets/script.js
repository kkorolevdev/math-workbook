(function () {

	const problemList = document.querySelector('.mw-calc__list');
	const results = [];

	// Settings.
	const mathExercises = 5;

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

	function renderProblemList(paramOne, action, paramTwo) {
		// Create a new list item for the problem
		const listItem = document.createElement('div');
		listItem.classList.add('mw-calc__list-item');
		listItem.innerHTML = `
			<div class="mw-calc__list-item-problem">
				<span class="mw-param param-one">${paramOne}</span>
				<span class="mw-action action-one">${action}</span> 
				<span class="mw-param param-two">${paramTwo}</span>
				<span class="mw-action">=</span>
				<input type="text" class="mw-solution user-solution">
				<span class="mw-calc__list-item-result"></span>
			</div>
		`;
	
		// Append the new problem to the list of problems
		problemList.appendChild(listItem);
	}

	// Function to generate the problem
	function generateProblem() {

		// Pick random action
		const action = pickRandomAction();

		// Generate paramOne and paramTwo
		paramOne = generateParamOne();
		paramTwo = Math.floor(Math.random() * (paramTwoMax - paramTwoMin + 1)) + paramTwoMin;

		// Generate result
		result = generateResult(action);
		results.push(result);

		renderProblemList(paramOne, action, paramTwo);

		console.log(`${paramOne} ${action} ${paramTwo} = ${result}`);
	}

	function generateProblems() {
		console.log(`${mathExercises} problem(s) generated`);

		for (let i = 0; i < mathExercises; i++) {
			generateProblem();
		}

		console.log('------------------------------------')
	}

	function clearProblemList() {
		problemList.innerHTML = '';
		results.length = 0; // Clear the results array
	}

	function handleClickStart(event) {
		event.preventDefault();

		clearProblemList();
		generateProblems();
	}

    function handleClickCheck(event) {
        event.preventDefault();

        // Get all problem containers
        const problemContainers = document.querySelectorAll('.mw-calc__list-item');

        // Loop through each problem to check its solution
        problemContainers.forEach((problemContainer, index) => {
            const userSolutionInput = problemContainer.querySelector('.mw-solution');
            const resultDisplay = problemContainer.querySelector('.mw-calc__list-item-result');

            const userSolution = parseInt(userSolutionInput.value);
            const correctResult = results[index];

            if (userSolution === correctResult) {
                resultDisplay.textContent = 'Correct';
				resultDisplay.classList.add('correct');
            } else {
                resultDisplay.textContent = 'Wrong';
				resultDisplay.classList.add('wrong');
            }
        });
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
