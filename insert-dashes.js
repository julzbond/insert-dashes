/**
 * Create a function called insertDashes.
 * @param {string} string
 * @return {string} with dashes between any consecutive odd integers
 */

function insertDashes(string){
  if (typeof string !== "string"){
    return "";
  }
  //else {
    var arr = string.split("");
    for(var i = 0; i < arr.length; i++){
      if (checkOdd(arr[i]) && checkOdd(arr[i+1])) {
        arr[i] += "-";
      }
    }
    combine = arr.join("");
    return combine;
  //}
}

function checkOdd(character){
  var number = parseInt(character);
  if (number % 2){
    return true;
  }
  return false;
/*  if (isNaN(number)){
    return false;
  }
  else if (number % 2 !== 0){
    return true;
  }
  return false;
*/
}