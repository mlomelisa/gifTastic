$(document).ready(function(){

  let keyArray = ['surf','fencing', 'running','swimming', 'ski'];


  for (let i=0; i < keyArray.length; i++){
    var btn = $('<button>');
    btn.attr('val', keyArray[i]).text(keyArray[i]);
    $('#buttonSec').append(btn);

  }



}); //ready