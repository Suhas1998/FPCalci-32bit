// This is bit wise representation of Floating point number.
function findBin(number){
  var bytes = [].map.call(new Uint8Array((new Float64Array([number])).buffer), function(b) {
          // After converting to Uint8Array, the 64 bits of the flat value is stored as an array of length 8 with each element having 8 bits represented as an int. Thus now converting each of the 8 bit int number as binary.
          for (var s = b.toString(2), i = s.length; i < 8; i++) {
            s = "0" + s; //Adding extra 0s to make it string of length 8.
          }
          return s;
      });
  bytes = bytes.reverse();
  var binary = bytes.join("");
  console.log(new Uint8Array((new Float64Array([number])).buffer))
  return binary;
}

function findDec(number){
  if(number.length < 64){
    return 0;
  }
  var binary = number.match(/.{1,8}/g)
  var bytes = binary.reverse();
  for(var i = 0; i < 8; i++ ){
    bytes[i] = parseInt(bytes[i], 2);
  }

  var intArray = new Uint8Array(bytes)
  var floatArray = new Float64Array(intArray.buffer)

  return floatArray[0];
}

function evaluate(num1, num2, op){
  var bin1, bin2;
  // Convert the numbers into Bindary format with 64 bits
  bin1 = findBin(num1);
  bin2 = findBin(num2);

  document.getElementById('bin1').value = bin1
  document.getElementById('bin2').value = bin2

  return 0;
}

function toBinary(){
  let x = document.getElementById('num1').value;
  // Evaluate the result
  var result = findBin(x);
  // Write the values as output
  document.getElementById('bin1').value = result;
}

function toDecimal(){
  let x = document.getElementById('bin2').value;
  // Evaluate the result
  var result = findDec(x);
  // Write the values as output
  document.getElementById('num2').value = result;
}
