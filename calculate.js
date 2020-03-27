
function findbin(number){
  // Convert int part to binary
  // Convert decimal part to binary
  // Convert to scientific form
  var bytes = [].map.call(new Uint8Array((new Float64Array([number])).buffer), function(b) {
          for (var s = b.toString(2), i = s.length; i < 8; i++) {
              s = "0" + s;
          }
          return s;
      });
  bytes = bytes.reverse();
  var binary = bytes.join();
  console.log(binary);
}

function evaluate(num1, num2, op){
  var bin1, bin2;
  bin1 = findbin(num1);
  bin2 = findbin(num2);
  return 0;
}

function calculate(){
  let x = document.getElementById('num1').value;
  let y = document.getElementById('num2').value;
  let operator = document.getElementById('operator').value;
  // Evaluate the result
  var result = evaluate(x, y, operator);
  // Write the values as output
}
