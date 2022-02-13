export var Mode;
(function (Mode) {
  Mode["InsertFirstNumber"] = "InsertFirstNumber";
  Mode["InsertDecimalFirstNumber"] = "InsertDecimalFirstNumber";
  Mode["OperatorPressed"] = "OperatorPressed";
  Mode["InsertSecondNumber"] = "InsertSecondNumber";
  Mode["InsertDecimalSecondNumber"] = "InsertDecimalSecondNumber";
  Mode["ShowingResult"] = "ShowingResult";
})(Mode || (Mode = {}));
export const initialState = {
  mode: Mode.InsertFirstNumber,
  firstNumber: 0,
  secondNumber: 0,
  operator: null,
  result: '0',
};
function performJSMathResult({ first, operator, second, }) {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return first / second;
  }
}
function getMathResult({ first, operator, second, }) {
  const fractionDigits = 12;
  return Number(performJSMathResult({ first, operator, second }).toFixed(fractionDigits));
}
function isDecimal(number) {
  return String(number).includes('.');
}
function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}
function isDigit(value) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(value);
}
export function calculatorReducer(state, action) {
  const payload = action.payload;
  const { mode, firstNumber, secondNumber, operator, result } = state;
  const isFirstNumberInput = [
    Mode.InsertFirstNumber,
    Mode.InsertDecimalFirstNumber,
    Mode.ShowingResult,
  ].includes(mode);
  const isOperatorPressed = [Mode.OperatorPressed, Mode.ShowingResult].includes(mode);
  function getInsertedNumberResult(digit) {
    const existingNumber = isFirstNumberInput ? firstNumber : secondNumber;
    if (isOperatorPressed) {
      return { updatedResult: `${digit}`, updatedNumber: digit };
    }
    const isDecimalMode = [Mode.InsertDecimalFirstNumber, Mode.InsertDecimalSecondNumber].includes(mode);
    const isDecimalNumberThatEndsWithDot = isDecimalMode && !isDecimal(existingNumber);
    const updatedResult = isDecimalNumberThatEndsWithDot
        ? `${existingNumber}.${digit}`
        : `${existingNumber === 0 ? '' : existingNumber}${digit}`;
    const updatedNumber = isDecimalNumberThatEndsWithDot
        ? Number(`${existingNumber}.${digit}`)
        : Number(`${result}${digit}`);
    return { updatedResult, updatedNumber };
  }
  function getEquationResult() {
    if (operator == null) {
      return ![Mode.InsertSecondNumber, Mode.InsertDecimalSecondNumber].includes(mode)
          ? firstNumber
          : secondNumber;
    }
    return getMathResult({ first: firstNumber, second: secondNumber, operator });
  }
  if (isDigit(payload)) {
    const { updatedResult, updatedNumber } = getInsertedNumberResult(payload);
    return Object.assign(Object.assign(Object.assign({}, state), { mode: mode === Mode.OperatorPressed ? Mode.InsertSecondNumber : mode, result: updatedResult }), (isFirstNumberInput ? { firstNumber: updatedNumber } : { secondNumber: updatedNumber }));
  }
  if (payload === '.') {
    const isDecimalNumberMode = [
      Mode.InsertDecimalFirstNumber,
      Mode.InsertDecimalSecondNumber,
    ].includes(mode);
    if (isDecimalNumberMode)
      return state;
    if (mode === Mode.ShowingResult) {
      return Object.assign(Object.assign({}, state), { operator: null, mode: Mode.InsertDecimalFirstNumber, firstNumber: 0, result: '0.' });
    }
    if (mode === Mode.OperatorPressed) {
      return Object.assign(Object.assign({}, state), { mode: Mode.InsertDecimalSecondNumber, secondNumber: 0, result: '0.' });
    }
    return Object.assign(Object.assign(Object.assign({}, state), { mode: isFirstNumberInput ? Mode.InsertDecimalFirstNumber : Mode.InsertDecimalSecondNumber, result: isFirstNumberInput ? `${firstNumber}.` : `${secondNumber}.` }), (isFirstNumberInput ? { firstNumber } : { secondNumber }));
  }
  if (isOperator(payload)) {
    const isReplacingOperator = mode === Mode.OperatorPressed;
    if (isReplacingOperator) {
      return Object.assign(Object.assign({}, state), { operator: payload });
    }
    const builtNumberResult = result.endsWith('.') ? result.substr(0, result.length - 1) : result;
    const updatedResult = isFirstNumberInput
        ? builtNumberResult
        : getMathResult({ first: firstNumber, second: secondNumber, operator: operator !== null && operator !== void 0 ? operator : payload });
    return Object.assign(Object.assign({}, state), { mode: Mode.OperatorPressed, operator: payload, firstNumber: Number(updatedResult), result: `${updatedResult}` });
  }
  if (payload === '+/-') {
    const updatedNumber = -Number(result);
    return Object.assign(Object.assign(Object.assign({}, state), (isFirstNumberInput ? { firstNumber: updatedNumber } : { secondNumber: updatedNumber })), { result: `${updatedNumber}` });
  }
  if (payload === '%') {
    const updatedNumber = isFirstNumberInput
        ? Number(result) / 100
        : (secondNumber / 100) * firstNumber;
    return Object.assign(Object.assign(Object.assign({}, state), (isFirstNumberInput ? { firstNumber: updatedNumber } : { secondNumber: updatedNumber })), { result: `${updatedNumber}` });
  }
  if (payload === '=') {
    const updatedResult = getEquationResult();
    return Object.assign(Object.assign({}, state), { mode: Mode.ShowingResult, result: `${updatedResult}`, firstNumber: updatedResult });
  }
  return initialState;
}
