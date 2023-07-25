const Operations = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
};

const operate = (operator, a, b) => Operations[operator](a, b);

// const operate = (operator, a, b) => {
// 	if (!operator || !a || !b) {
// 		console.log(
// 			`Invalid operation.\nOperator: ${operator}\n1st Value:${a}\n2nd Value:${b}`
// 		);
// 		return;
// 	} else if (operator === 'add') {
// 		add(a, b);
// 		return;
// 	} else if (operator === 'subtract') {
// 		subtract(a, b);
// 		return;
// 	} else if (operator === 'multiply') {
// 		multiply(a, b);
// 	} else if (operator === 'divide') {
// 		divide(a, b);
// 	}
// };
