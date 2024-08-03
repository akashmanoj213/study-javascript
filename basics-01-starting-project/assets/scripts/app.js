const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// get input from user
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// create log of operation and output to page
function createAndWriteOutput(operator, previousResult, currentNumber) {
  const calcDescription = `${previousResult} ${operator} ${currentNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(previousResult, operation, enteredNumber, result) {
  const logEntry = {
    prevResult: previousResult,
    operation: operation,
    enteredNumber: enteredNumber,
    result: result,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResutl(calculationType) {
  if (
    (calculationType !== 'ADD' &&
      calculationType !== 'SUBTRACT' &&
      calculationType !== 'MULTIPLY' &&
      calculationType !== 'DIVIDE') ||
    !enteredNumber
  ) {
    return;
  }

  const enteredNumber = getUserNumberInput();
  const previousResult = currentResult;

  let mathOperator;
  if (calculationType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else if (calculationType === 'DIVIDE') {
    currentResult /= enteredNumber;
    mathOperator = '/';
  }

  createAndWriteOutput(mathOperator, previousResult, enteredNumber);
  writeToLog(previousResult, calculationType, enteredNumber, currentResult);
}

function add() {
  calculateResutl('ADD');
}

function subtract() {
  calculateResutl('SUBTRACT');
}

function multiply() {
  calculateResutl('MULTIPLY');
}

function divide() {
  calculateResutl('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
