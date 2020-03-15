const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function addNumbers(){
  let x = document.getElementById('num1').value
  let y = document.getElementById('num2').value
  var sum = parseInt(x) + parseInt(y)
  document.getElementById('result').value = sum
}
