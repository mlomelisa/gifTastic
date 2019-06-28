$(document).ready(function(){

  let keyArray = ['surf','fencing', 'running','swimming', 'ski'];

  // Generates the buttons with keys of keyArray
  for (let i=0; i < keyArray.length; i++){
    var btn = $('<button>');
    btn.attr('value', keyArray[i]).text(keyArray[i]);
    $('#buttonSec').append(btn);
  }

  //Function to animate gifts
  $('.gif').on('click', function(){
    console.log("im here");
    var state = $(this).attr('data-state').val();
    var animateState = $(this).attr('data-animate');
    var stillState = $(this).attr('data-still');

    if(state === 'still'){    // Verify if is already in still state change to animate
      $(this).attr('src',animateState);
      $(this).attr('data-state', 'animate');

    }

    if(state === 'animate'){
      $(this).attr('src',stillState);
      $(this).attr('data-state', 'still');

    }

  }); // Gif Click function
 
  //Function to detect a button has click
   $('button').on('click', function() {
     var keyWord = $(this).val();
     
     var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=koHETa6OSaTbs5R8mCoDih5i6Wh6pciU&q=' + keyWord +'&limit=10&offset=0&rating=PG&lang=en';
     
     $.ajax({
       url: queryUrl,
       method: "GET"
     }).then(function(response){
      
      var imagesArray = response.data.length;
     
      for (let j = 0; j < imagesArray; j++){
        var rating = response.data[j].rating
        
        var urlSource = response.data[j].images.fixed_height_still.url;
        
        var urlAnimate = response.data[j].images.fixed_height.url;
        
        var giftCard = $('<div>').addClass('card');
        var ratingTitle  = $('<div>').addClass('card-body').text('Rating: ' + rating);
        var imgContent = $('<img>').addClass('gif card-img-bottom');
        imgContent.attr('src',urlSource);
        imgContent.attr({                                     // Add attributes to the image
                src : urlSource,
                'data-still' : urlSource,
                'data-animate' : urlAnimate,
                'data-state' : 'still'
           });
         giftCard.append(ratingTitle);
         giftCard.append(imgContent);

        $('#gifSec').append(giftCard);

       } // For Pull images and create entries in DOM

     });// Then

   });//button click function

  //Function to animate gifts
  $(document).on('click', '.gif', function(){
    
    var state = $(this).attr('data-state');
    console.log(state);
    var animateState = $(this).attr('data-animate');
    var stillState = $(this).attr('data-still');

    if(state === 'still'){    // Verify if is already in still state change to animate
      $(this).attr('src',animateState);
      $(this).attr('data-state', 'animate');

    }

    if(state === 'animate'){
      $(this).attr('src',stillState);
      $(this).attr('data-state', 'still');

    }

  }); // Gif Click function



}); //ready