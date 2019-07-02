$(document).ready(function(){
  var offsetVal = 0;
  var checkboxNum = 0;
  var favoritesArray = [];
  let topics = ['surf','fencing', 'running','swimming', 'skiing', 'skating','windsurf','cycling','hiking','diving','roading'];


 btnGenerator();
 
  // Generates the buttons with keys of keyArray
  function btnGenerator(){
    $('#buttonSec').empty();
    
    for (let i=0; i < topics.length; i++){
      var btn = $('<button>').addClass('btn-topic');
      btn.attr('value', topics[i]).text(topics[i]);
      $('#buttonSec').append(btn);
      
    }
  };// Func generate buttons

 
   // Function to add new topic
   $('#submit').on('click', function(){
    var newTopicVal = $('#newTopic').val();
    
    if(newTopicVal.length == 0 ){
     
      alert('Please enter a word without whitespace characters')
      
    }else {
      topics.push(newTopicVal);
      jQuery.uniqueSort(topics);

      btnGenerator();
      $('#newTopic').val('');
     
    }

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
  offsetVal = 0;
  checkboxNum = 0;
    $('#gifSec').empty();
     var keyWord = $(this).val();

 // Function add more Gifs
 
   
    
    var generatorGifs = function () {
      var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=koHETa6OSaTbs5R8mCoDih5i6Wh6pciU&q=' + keyWord + '&limit=10&offset=' + offsetVal +'&lang=en';
      console.log(queryUrl);
   
     
     $.ajax({
       url: queryUrl,
       method: "GET"
     }).then(function(response){
      
      var imagesArray = response.data.length;
     
      for (let j = 0; j < imagesArray; j++){

        var rating = response.data[j].rating;
        var title = response.data[j].title;
        
        var urlSource = response.data[j].images.fixed_height_still.url;
        
        var urlAnimate = response.data[j].images.fixed_height.url;
        

        // Add button
        var btnAddFav = $('<button>').addClass("btn btn-primary btnAddFav");
        btnAddFav.attr({
          'data-id' : checkboxNum,
          type: 'button'
        });
        btnAddFav.text("Add Favorites");
        

        var giftCard = $('<div>').addClass('card');
        giftCard.attr('data-id', checkboxNum);
        var titleVar  = $('<div>').addClass('card-body title').text(title);
        titleVar.attr('name',title);
        var imgContent = $('<img>').addClass('gif card-img-bottom');
        var ratingVar = $('<div>').addClass('card-body rating');
        var p = $('<p>').addClass('card-text').text('Rating: ' + rating);
        ratingVar.attr('name',rating);
        ratingVar.append(p);
        imgContent.attr('src',urlSource);
        imgContent.attr({                                     // Add attributes to the image
                src : urlSource,
                'data-still' : urlSource,
                'data-animate' : urlAnimate,
                'data-state' : 'still',
 
           });
         giftCard.append(titleVar);
         
         giftCard.append(imgContent);
         giftCard.append(ratingVar);
         giftCard.append(btnAddFav);

        $('#gifSec').append(giftCard);

        checkboxNum++;
       } // For Pull images and create entries in DOM

     });// Then

    } // generatorGifs function
    
    $('#btnAdd').off('click').click(function(){
      
      offsetVal +=10;
      
      generatorGifs();
      
  
    }); // ButtonAdd Custom Select

    generatorGifs();
   
        
   

   });// click function

 


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

  

  

  // Function to add favorites to localstorage


    $(document).on('click', ".btnAddFav" , function (){
     console.log("Im here?");

      
    var checkID = $(this).attr('data-id');
    console.log(checkID);
        
     var titleFav= $(this).siblings('.title').attr('name');
     var imgFav= $(this).siblings('.gif').attr('src');
     var ratingFav=$(this).siblings('.rating').attr('name');

     $(this).attr('state', 'checked');
     
     console.log(titleFav + " " + imgFav + " " + ratingFav);
        
     favoritesArray.push({'title' : titleFav, 'img':imgFav, 'rating': ratingFav});
  
     console.log( favoritesArray);
    
 

   }); // Checkbox function

}); //ready