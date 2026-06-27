const themeSelector = document.getElementById('theme-selector');
const calculatorApp = document.getElementById('calculator');

function startApp(themeClass) {
  document.body.className = themeClass;
  themeSelector.classList.add('hidden');
  calculatorApp.classList.remove('hidden');
}

function goBack() {
  calculatorApp.classList.add('hidden');
  themeSelector.classList.remove('hidden');
  document.body.className = 'theme-start'; 
}

let currentInput = '0';
let previousInput = '';
let operator = null;

const display = document.getElementById('display');

function updateDisplay() {
  if (currentInput.length > 11) {
    display.innerText = currentInput.substring(0, 11);
  } else {
    display.innerText = currentInput;
  }
}

function appendNumber(number) {
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if (current === 0) {
        computation = 'Error';
      } else {
        computation = prev / current;
      }
      break;
    case '%':
      computation = prev % current;
      break;
    default:
      return;
  }
  
  currentInput = computation.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function deleteLast() {
  if (currentInput === 'Error') {
    clearDisplay();
    return;
  }
  
  currentInput = currentInput.toString().slice(0, -1);
  
  if (currentInput === '') {
    currentInput = '0';
  }
  updateDisplay();
}