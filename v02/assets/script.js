(function () {

	const problemList = document.querySelector('.mw-calc__list');
	const results = [];
	let correctAnswers = 0; // Variable to keep track of the number of correct answers

	// Settings.
	const mathExercises = 10;

	let result;
	const resultMin = 0;
	const resultMax = 1000;
	
	const actionOne = ['+', '-', '*', '/'];
	
	let paramOne;
	const paramOneMin = 1;
	const paramOneMax = 999;

	let paramTwo;
	const paramTwoMin = 1;
	const paramTwoMax = 999;

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

		if (action === '-') {
			if (paramOne > resultMax) {
				// If paramOne is greater than resultMax, generate paramTwo between paramTwoMin and paramOne - resultMax
				paramTwo = Math.floor(Math.random() * (paramOne - resultMax + 1)) + paramTwoMin;
			} else {
				// Ensure paramTwo is between paramTwoMin and the difference between paramOne and resultMin
				paramTwo = Math.floor(Math.random() * (paramOne - resultMin - paramTwoMin + 1)) + paramTwoMin;
			}
		} else if (action === '*') {
			// For multiplication, ensure that the result does not exceed resultMax
			const maxPossibleResult = Math.min(resultMax, paramOne * paramTwoMax);
			if (maxPossibleResult > resultMin) {
				paramTwo = Math.floor(Math.random() * (maxPossibleResult / paramOne - paramTwoMin + 1)) + paramTwoMin;
			} else {
				// If the maximum possible result is less than or equal to resultMin, set paramTwo to 0
				paramTwo = 0;
			}
		} else if (action === '/') {
			// For division, generate paramOne and paramTwo for multiplication
			paramOne = generateParamOne();
			paramTwo = Math.floor(Math.random() * (paramTwoMax - paramTwoMin + 1)) + paramTwoMin;

			// Calculate the result for multiplication
			let multiplicationResult = paramOne * paramTwo;

			// Check if the multiplication result exceeds resultMax
			if (multiplicationResult > resultMax) {
				// If it does, generate paramTwo such that the multiplication result is within resultMax
				paramTwo = Math.floor(resultMax / paramOne);
				// Recalculate the multiplication result
				multiplicationResult = paramOne * paramTwo;
			}

			// Reverse the parameters for division
			paramOne = multiplicationResult;
			paramTwo = paramTwo !== 0 ? paramTwo : 1; // Ensure paramTwo is not zero to avoid division by zero

			// Calculate the result for division
			calculatedResult = paramOne / paramTwo;
		} else {
			// For addition, multiplication, division, etc.
			paramTwo = Math.floor(Math.random() * (resultMax - paramOne - paramTwoMin + 1)) + paramTwoMin;
		}

		switch (action) {
			case '+':
				calculatedResult = paramOne + paramTwo;
				break;
			case '-':
				calculatedResult = paramOne - paramTwo;
				break;
			case '*':
				calculatedResult = paramOne * paramTwo;
				break;
			case '/':
				calculatedResult = paramOne / paramTwo;
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

		// Clear the stats
		const statsDiv = document.querySelector('.mw-calc__stats');
		statsDiv.textContent = '';

		generateProblems();
	}

    function handleClickCheck(event) {
        event.preventDefault();

        // Get all problem containers
        const problemContainers = document.querySelectorAll('.mw-calc__list-item');

		// Reset the number of correct answers
		correctAnswers = 0;

        // Loop through each problem to check its solution
        problemContainers.forEach((problemContainer, index) => {
            const userSolutionInput = problemContainer.querySelector('.mw-solution');
            const resultDisplay = problemContainer.querySelector('.mw-calc__list-item-result');

            const userSolution = parseInt(userSolutionInput.value);
            const correctResult = results[index];

            if (userSolution === correctResult) {
                resultDisplay.textContent = 'Correct';
				resultDisplay.classList.add('correct');
				correctAnswers++;
            } else {
                resultDisplay.textContent = `Wrong, ${correctResult}` ;
				resultDisplay.classList.add('wrong');
            }
        });

		// Calculate the percentage of correct answers
		const percentage = Math.round((correctAnswers / mathExercises) * 100);

		// Publish the percentage on the page
		const statsDiv = document.querySelector('.mw-calc__stats');
		statsDiv.textContent = `Score: ${percentage}% (${correctAnswers} of ${mathExercises})`;
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
