$(document).ready(function(){

  let topics = ['surf','fencing', 'running','swimming', 'skiing', 'skating','windsurf','cycling','hiking','diving','roading'];

  // Generates the buttons with keys of keyArray
  function btnGenerator(){
    $('#buttonSec').empty();
    for (let i=0; i < topics.length; i++){
      var btn = $('<button>').addClass('btn-topic');
      btn.attr('value', topics[i]).text(topics[i]);
      $('#buttonSec').append(btn);
    }
  };// Func generate buttons

 btnGenerator();

   // Function to add new topic
   $('#submit').on('click', function(){
    var newTopicVal = $('.newTopic').val();
    topics.push(newTopicVal);
    btnGenerator();

  }); //Func add new topic

  //Function to animate gifts
  $('.gif').on('click', function(){
    
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
  $(document).on('click', '.btn-topic', function() {
    console.log("im here");
    $('#gifSec').empty();
     var keyWord = $(this).val();
     
     var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=koHETa6OSaTbs5R8mCoDih5i6Wh6pciU&q=' + keyWord +'&limit=10&offset=0&rating=PG&lang=en';
     console.log(queryUrl);
     $.ajax({
       url: queryUrl,
       method: "GET"
     }).then(function(response){
      
      var imagesArray = response.data.length;
     
      for (let j = 0; j < imagesArray; j++){
        var rating = response.data[j].rating
        
        var urlSource = response.data[j].images.fixed_height_small_still.url;
        
        var urlAnimate = response.data[j].images.fixed_height_small.url;
        
        var giftCard = $('<div>').addClass('card');
        var ratingTitle  = $('<div>').addClass('card-body').text('Rating: ' + rating);
        var imgContent = $('<img>').addClass('gif card-img-bottom');
        imgContent.attr('src',urlSource);
        imgContent.attr({                                     // Add attributes to the image
                src : urlSource,
                'data-still' : urlSource,
                'data-animate' : urlAnimate,
                'data-state' : 'still',
                'heigh' : 200,
                'width' : 200
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