const numberBtns = document.querySelectorAll('.number-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const decimalBtn = document.querySelector('#decimal-btn');
const clearBtn = document.querySelector('#clear-btn');

let operand1 = '';
let operand2 = '';
let operator = '';
let results = '';
let decimal = false;

const operations = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
};

const handleDecimal = () => {
	let displayValue = document.querySelector('#display-number');
	decimal = true;
	displayValue.textContent += '.';
	decimalBtn.classList.toggle('selected');
};

const handleNumber = (number) => {
	let displayValue = document.querySelector('#display-number');
	if (results !== '' && !operator) {
		operand1 = number;
		results = '';
		displayValue.textContent = operand1;
	} else if (results !== '' && operator) {
		if (displayValue.textContent == 0) {
			operand2 = number;
		} else {
			operand2 += number;
		}
		displayValue.textContent = operand2;
	} else if (operand1 === '' && !decimal) {
		operand1 = number;
		displayValue.textContent = operand1;
	} else if (decimal) {
		let numberArr = displayValue.textContent.split('');
		numberArr.push(number);
		console.log(numberArr);
		operand1 = Number(numberArr.join(''));
		console.log(operand1);
		displayValue.textContent = operand1;
	} else if (operand1 !== '' && !operator) {
		if (operand1 == 0) {
			operand1 = number;
		} else {
			operand1 += number;
		}
		displayValue.textContent = operand1;
	} else if (operand1 !== '' && operator) {
		if (operand2 == 0) {
			operand2 = number;
		} else {
			operand2 += number;
		}
		let activeOperator = document.getElementById(`${operator}`);
		activeOperator.classList.remove('selected');
		displayValue.textContent = operand2;
	} else {
		console.log('what did you do?');
	}
};

const handleOperator = (operatorClicked) => {
	let displayValue = document.querySelector('#display-number');
	if (!operator && results == '') {
		operand1 = Number(displayValue.textContent);
		if (operatorClicked.target.id !== 'equals') {
			operator = operatorClicked.target.id;
			operatorClicked.target.classList.add('selected');
		}
	} else if (!operator && results) {
		operator = operatorClicked.target.id;
		operatorClicked.target.classList.add('selected');
	} else if (operator) {
		let activeOperator = document.getElementById(`${operator}`);
		activeOperator.classList.remove('selected');
		if (operatorClicked.target.id !== 'equals') {
			operatorClicked.target.classList.add('selected');
		}
		operand2 = Number(displayValue.textContent);
		if (activeOperator.id == 'divide' && operand2 == 0) {
			clearAll();
			displayValue.textContent = 'lol nope';
		} else {
			results = operate(activeOperator.id, operand1, operand2);
			if (results.toString().length > 10) {
				results = results.toPrecision(10);
				console.log(results);
			}
			operand1 = results;
			operand2 = '';
			if (operatorClicked.target.id == 'equals') {
				operator = '';
			} else {
				operator = operatorClicked.target.id;
			}
			displayValue.textContent = results;
		}
	}
};

const operate = (operator, a, b) => operations[operator](a, b);

const clearAll = () => {
	operand1 = '';
	operand2 = '';
	operator = '';
	results = '';
	decimal = false;
	let displayValue = document.querySelector('#display-number');
	displayValue.textContent = '0';
	let activeOperator = document.querySelector('.operator-btn.selected');
	if (activeOperator) {
		activeOperator.classList.remove('selected');
	}
};

numberBtns.forEach((btn) =>
	btn.addEventListener('click', (e) => handleNumber(e.target.textContent))
);

operatorBtns.forEach((btn) =>
	btn.addEventListener('click', (e) => handleOperator(e))
);

decimalBtn.addEventListener('click', (e) =>
	handleDecimal(e.target.textContent)
);

clearBtn.addEventListener('click', (e) => clearAll());

clearAll();
