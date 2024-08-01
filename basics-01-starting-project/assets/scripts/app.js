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

function add() {
  const enteredNumber = getUserNumberInput();
  const previousResult = currentResult;
  currentResult += enteredNumber;
  createAndWriteOutput('+', previousResult, enteredNumber);
  writeToLog(previousResult, 'ADD', enteredNumber, currentResult);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const previousResult = currentResult;
  currentResult -= enteredNumber;
  createAndWriteOutput('-', previousResult, enteredNumber);
  writeToLog(previousResult, 'SUBTRACT', enteredNumber, currentResult);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const previousResult = currentResult;
  currentResult *= enteredNumber;
  createAndWriteOutput('*', previousResult, enteredNumber);
  writeToLog(previousResult, 'MULTIPLY', enteredNumber, currentResult);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const previousResult = currentResult;
  currentResult /= enteredNumber;
  createAndWriteOutput('/', previousResult, enteredNumber);
  writeToLog(previousResult, 'DIVIDE', enteredNumber, currentResult);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
