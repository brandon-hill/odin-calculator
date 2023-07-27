const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear-btn');
const deleteBtn = document.querySelector('#delete-btn');
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

class Calculator {
	constructor(previousOperandElement, currentOperandElement) {
		this.previousOperandElement = previousOperandElement;
		this.currentOperandElement = currentOperandElement;
		this.clear();
	}

	clear() {
		this.previousOperand = '';
		this.currentOperand = '';
		this.operator = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.toString().includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	setOperator(operator) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operator = operator;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let result;
		const previous = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(previous) || isNaN(current)) return;
		switch (this.operator) {
			case 'add':
				result = previous + current;
				break;
			case 'subtract':
				result = previous - current;
				break;
			case 'multiply':
				result = previous * current;
				break;
			case 'divide':
				if (current === 0) {
					alert('Nice try');
					return;
				}
				result = previous / current;
				break;
			default:
				return;
		}
		this.currentOperand = result;
		this.operator = undefined;
		this.previousOperand = '';
	}

	formatOperand(operand) {
		let formattedOperand = operand.split('').slice(0, 11).join('');
		return formattedOperand;
	}

	getDisplayNumber(number) {
		let stringNumber = number.toString();
		if (stringNumber.length > 11) {
			stringNumber = this.formatOperand(stringNumber);
		}
		let integerDigits = parseFloat(stringNumber.split('.')[0]);
		let decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandElement.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operator != null) {
			let operatorSymbol = document.getElementById(
				`${this.operator}`
			).innerText;
			this.previousOperandElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${operatorSymbol}`;
		} else {
			this.previousOperandElement.innerText = '';
		}
	}
}

const calculator = new Calculator(
	previousOperandElement,
	currentOperandElement
);

numberBtns.forEach((btn) =>
	btn.addEventListener('click', () => {
		calculator.appendNumber(btn.innerText);
		calculator.updateDisplay();
	})
);

operatorBtns.forEach((operator) =>
	operator.addEventListener('click', () => {
		calculator.setOperator(operator.id);
		calculator.updateDisplay();
	})
);

equalBtn.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
});

clearBtn.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});
