/* For testing:
0.125 : 0011111111000000000000000000000000000000000000000000000000000000
0.2   : 0011111111001001100110011001100110011001100110011001100110011010  */

// This is bit wise representation of Floating point number.

var mantissaBits = 23;
var possibleMantissas = Math.pow(2, mantissaBits);

function findBin(number){
  // Before Rounding
  var float = new Float64Array([number]);
  var bytes = new Uint8Array(float.buffer);
  var bitwise = [].map.call(bytes, function(b){
      for(var s = b.toString(2),i = s.length; i <8;i++ ){
        s = "0" + s;
      }
  })
  bitwise = bitwise.reverse().join("");

  var sign = bytes[7]>>7;
  var exponent = ((bytes[7] & 0x7f) << 4 | bytes[6] >> 4) - 0x3ff;
  bytes[7] = 0x3f;
  bytes[6] |= 0xf0;
  var mantissa = float[0];
  // Didnt bias the exponent yet
  console.log(bitwise);
  console.log(sign+" "+exponent+" "+mantissa);

  return {
    sign: sign,
    exponent: exponent,
    mantissa: mantissa,
    bitwise: bitwise
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

function fadd1(num1,num2) {
  bin1 = findBin(num1);
  bin2 = findBin(num2);

  var sum = roundBin(roundBin(bin1).matissa + roundBin(bin2).mantissa);

  console.log(sum);
}

function calculate(){
  let x = document.getElementById('num1').value;
  let y = document.getElementById('num2').value;
  // Later add code to get the operator (For now addition)
  var result = fadd1(x,y)
  document.getElementById('result').value = result;
}

/* References:
https://www.cs.uaf.edu/2000/fall/cs301/notes/notes/node51.html
*/
