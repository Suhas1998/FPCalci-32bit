/* For testing:
0.125 : 0011111111000000000000000000000000000000000000000000000000000000
0.2   : 0011111111001001100110011001100110011001100110011001100110011010  */

var mantissaBits = 23;
var possibleMantissas = Math.pow(2, mantissaBits);

function findBin(number){
  var float = new Float64Array([number]);
  var bytes = new Uint8Array(float.buffer);
  var bit64 = [].map.call(bytes, function(b){
      for(var s = b.toString(2),i = s.length; i <8;i++ ){
        s = "0" + s;
      }
      return s;
  });
  bit64 = bit64.reverse();
  bit64 = bit64.join("");

  var sign = bytes[7]>>7;
  // This is just adding the last 7 of bytes[7] and first 4 of bytes[6] to get 11 bit exponent of 64bit version
  var exponent = ((bytes[7] & 0x7f) << 4 | bytes[6] >> 4) - 0x3ff;
  // Basically the below steps are to divide the mantissa with 2^exponent So that the resultant float value (float[0]) in buffer becomes the mantissa where: Actual float = sign*2^exp*mantissa
  bytes[7] = 0x3f;
  bytes[6] |= 0xf0;
  var mantissa = float[0];
  var value = (sign ? -1 : 1) * Math.pow(2,exponent) * mantissa;
  // Later add 32 bit string as well
  var temp = "00000000";

  var bit32 = exponent + 0x7F ;
  bit32 = sign + temp.slice(0,8-(bit32.toString(2).length)) + (exponent + 0x7F).toString(2) + bit64.slice(12,35);

  // The below calculated
  return {
    value: value,
    sign: sign,
    exponent: exponent,
    mantissa: mantissa,
    bit64: bit64,
    bit32: bit32
  };
}

function roundBin(number){
  var mantissaRounded = Math.floor(number.mantissa * possibleMantissas) / possibleMantissas;
  var numberRounded = (number.sign ? -1 : 1) * Math.pow(2, number.exponent) * mantissaRounded;
  var RoundedBin = findBin(numberRounded);

  return RoundedBin;
}

// This is the conversion of bit represented Floating point number to decimal number
function findDec(number){
  if(number.length < 64){
    return 0; // Should improvise this later to add zeroes and carry on with the operation
  }
  // Breaking the number into 8 parts
  var binary = number.match(/.{1,8}/g)
  var bytes = binary.reverse();
  for(var i = 0; i < 8; i++ ){
    // Converting each of those 8 bits to integer
    bytes[i] = parseInt(bytes[i], 2);
  }
  // Converting the array into Uint8Array
  var intArray = new Uint8Array(bytes)
  var floatArray = new Float64Array(intArray.buffer)

  return floatArray[0];
}


function toBinary(num){
  let x = document.getElementById('num'+num).value;
  // Evaluate the result
  var result = roundBin(findBin(x));
  // Write the values as output
  document.getElementById('bin'+num).value = result.bit32;
  console.log(result.bit32);
}

function toDecimal(){
  let x = document.getElementById('bin2').value;
  // Evaluate the result
  var result = findDec(x);
  // Write the values as output
  document.getElementById('num2').value = result;
}

function evaluate(num1,num2,operator) {
  var bin1 = findBin(num1);
  var bin2 = findBin(num2);
  bin1 = roundBin(bin1);
  bin2 = roundBin(bin2);

  var operation = {
    add: function(num1,num2){
          return roundBin(findBin(bin1.value+bin2.value));
        },
    subtract: function(num1,num2){
          return roundBin(findBin(bin1.value-bin2.value));
    },
    multiply: function(num1,num2){
          return roundBin(findBin(bin1.value*bin2.value));
    },
    divide: function(num1,num2){
          return roundBin(findBin(bin1.value/bin2.value));
    },
  };

  var answer = operation[operator]();
  return answer.value;
}

function calculate(){
  var count = parseInt(document.getElementById('count').innerHTML);
  var numbers = [];
  var operators = [];
  for (var i = 1; i <= count; i++) {
    numbers.push(document.getElementById('num'+i).value);
  }
  for (var i = 1; i < count; i++) {
    var op = document.getElementById('operator'+i).value;
    op.toString();
    operators.push(op);
  }

  var result = numbers[0];
  for (var i = 1; i < count; i++) {
    console.log(result);
    console.log(numbers[i]);
    result = evaluate(result,numbers[i],operators[i-1]);
    console.log(result);
  }
  document.getElementById('result').value = result;
}

/* References:
https://www.cs.uaf.edu/2000/fall/cs301/notes/notes/node51.html
*/

// Existing Issues
/* 1. Boundaries of subnormal numbers not checked.
   2. Didnt check for large numbers.
   3. Problem with the representation of 0
*/
