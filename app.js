$(document).ready(function() {
  




amzn_assoc_placement = "adunit0";
amzn_assoc_search_bar = "true";
amzn_assoc_tracking_id = "danefinder-20";
amzn_assoc_search_bar_position = "bottom";
amzn_assoc_ad_mode = "search";
amzn_assoc_ad_type = "smart";
amzn_assoc_marketplace = "amazon";
amzn_assoc_region = "US";
amzn_assoc_title = "Shop Related Products";
amzn_assoc_default_search_phrase = "great dane";
amzn_assoc_default_category = "All";
amzn_assoc_linkid = "250ca789c914b6d9f59e707d79902b91";
















  
  var commonVars = {};
  commonVars.offSet = 0;
  commonVars.url = 'http://api.petfinder.com/pet.find?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&animal=dog&breed=Great%20Dane&output=full&location='

  $('.newPet').on("click", function(e) {
    if ($('#zip').val().length == 5) {
    e.preventDefault();
    commonVars.offSet ++
    commonVars.zip = $('#zip').val();
    $('#petfinderInfo').empty();
    $('.splash').addClass('hidden');
    $.ajax({
      type: 'GET',
      data: {},
      url: commonVars.url += commonVars.zip + '&callback=?',
      dataType: 'json',
      success: function(data) {
        var petfinder = data.petfinder;
        //alert(JSON.stringify(commonVars.offSet, '', 2));
        commonVars.url = 'http://api.petfinder.com/pet.find?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&animal=dog&breed=Great%20Dane&output=full';
        
        
          //alert(JSON.stringify(petfinder.pets.pet.media.photos, '', 2));
        commonVars.url += '&offset=' + commonVars.offSet + '&location=';
        commonVars.pic = petfinder.pets.pet.media.photos.photo[2].$t;
        commonVars.id = petfinder.pets.pet.id.$t;
        commonVars.name = petfinder.pets.pet.name.$t;
        commonVars.email = petfinder.pets.pet.contact.email.$t;
        commonVars.phone = petfinder.pets.pet.contact.phone.$t;
        commonVars.city = petfinder.pets.pet.contact.city.$t;
        commonVars.state = petfinder.pets.pet.contact.state.$t;
        commonVars.shelterID = petfinder.pets.pet.shelterId.$t;

        var str1 = commonVars.name;
        for (var i in str1) {
          var words = str1.split("-")[0];
          commonVars.firstName = words;
        }

        // alert(JSON.stringify(petfinder.lastOffset.$t, '', 2))
        var infoHTML = '';
        infoHTML += '<h3>Hi! My name is ' + commonVars.firstName + '!</h3>';
        infoHTML += '<br>';
        infoHTML += '<strong>Here\'s what people say about me</strong><br>';
        infoHTML += '<pre>' + petfinder.pets.pet.description.$t + '</pre>';
        infoHTML += '<br>';
        infoHTML += '<div id="information" class="hidden"></div>';

        infoHTML += '<button id="info">Learn More About Me</button><a href="mailto:' + commonVars.email + '?subject=Adopting%20' + commonVars.name + '&body=Body%20goes%20here"><button id="adopt">Take Me Home!</button></a></ul>';

        $('#petfinderInfo').append('<a target="_blank" href="https://www.petfinder.com/petdetail/' + commonVars.id + '"><img src=' + commonVars.pic + '></a>' + infoHTML);
     
      },
    })
    };
  });
  
  /////////
  /////////////
  /////////
  //PREV BUTTON
  $('#prevBtn').on("click", function(e) {
    e.preventDefault();
    commonVars.offSet --
    commonVars.zip = $('#zip').val();
    $('#petfinderInfo').empty();
    $('.splash').addClass('hidden');
    $.ajax({
      type: 'GET',
      data: {},
      url: commonVars.url += commonVars.zip + '&callback=?',
      dataType: 'json',
      success: function(data) {
        var petfinder = data.petfinder;
        //alert(JSON.stringify(commonVars.offSet, '', 2));
        commonVars.url = 'http://api.petfinder.com/pet.find?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&animal=dog&breed=Great%20Dane&output=full';
        
        
          //alert(JSON.stringify(commonVars.offSet, '', 2));
        commonVars.url += '&offset=' + commonVars.offSet + '&location=';
        commonVars.pic = petfinder.pets.pet.media.photos.photo[2].$t;
        commonVars.id = petfinder.pets.pet.id.$t;
        commonVars.name = petfinder.pets.pet.name.$t;
        commonVars.email = petfinder.pets.pet.contact.email.$t;
        commonVars.phone = petfinder.pets.pet.contact.phone.$t;
        commonVars.city = petfinder.pets.pet.contact.city.$t;
        commonVars.state = petfinder.pets.pet.contact.state.$t;
        commonVars.shelterID = petfinder.pets.pet.shelterId.$t;

        var str1 = commonVars.name;
        for (var i in str1) {
          var words = str1.split("-")[0];
          commonVars.firstName = words;
        }

        // alert(JSON.stringify(petfinder.lastOffset.$t, '', 2))
        var infoHTML = '';
        infoHTML += '<h3>Hi! My name is ' + commonVars.firstName + '!</h3>';
        infoHTML += '<br>';
        infoHTML += '<strong>Here\'s what people say about me</strong><br>';
        infoHTML += '<pre>' + petfinder.pets.pet.description.$t + '</pre>';
        infoHTML += '<br>';
        infoHTML += '<div id="information" class="hidden"></div>';

        infoHTML += '<button id="info">Learn More About Me</button><a href="mailto:' + commonVars.email + '?subject=Adopting%20' + commonVars.name + '&body=Body%20goes%20here"><button id="adopt">Take Me Home!</button></a></ul>';

        $('#petfinderInfo').append('<a target="_blank" href="https://www.petfinder.com/petdetail/' + commonVars.id + '"><img src=' + commonVars.pic + '></a>' + infoHTML);
      },
    });
  });
 
  //////////
  /////////////
  
  

  ////
  /////////
  ////INFO CALL

  $('#petfinderInfo').on("mouseenter", "#info", function(e) {
    commonVars.shelterLink = 'http://api.petfinder.com/shelter.get?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&id=' + commonVars.shelterID + '&output=full';
    $('.splash').addClass('hidden');
    $.ajax({
      type: 'GET',
      data: {},
      url: commonVars.shelterLink + '&callback=?',
      dataType: 'json',
      success: function(data) {
        var shelterFinder = data.petfinder;
        commonVars.shelterName = shelterFinder.shelter.name.$t;
        commonVars.long = shelterFinder.shelter.longitude.$t;
        commonVars.lat = shelterFinder.shelter.latitude.$t;
        commonVars.addy = shelterFinder.shelter.address1.$t;
        //alert(commonVars.shelterName)
       // alert(JSON.stringify(shelterFinder.shelter, '', 2));
      }
    });
  });
  //
  ////       INFO BOX
  ///////
  $("#petfinderInfo").on("click", "#info,#information", function (e) {
    $('#information').empty().toggleClass('hidden').append('<div class="col-6"><iframe frameborder="0" id="map" src="https://maps.google.com/maps?output=embed&iwloc&z=10&mid=1rTY7Rf5tSCc5FOdtFeeiszRYcNc&&daddr=' + commonVars.lat + ',' + commonVars.long + '"></iframe></div><div class="col-6"><p><strong>Name:</strong> ' + commonVars.name + '<br><strong>Shelter:</strong> ' + commonVars.shelterName + '<br><strong>Location</strong>: ' + commonVars.addy+ '<br>' + commonVars.city + ', ' + commonVars.state + '<br><strong>E-mail: </strong><a href="mailto:' + commonVars.email + '">' + commonVars.email + '</a><br><strong>Phone: </strong> ' + '<a href="tel:+' + commonVars.phone + '">' + commonVars.phone + '</a></p></div><span class="closeX">X</span>');
  });
  $('#petfinderInfo').on("mouseover", ".closeX", function(e) {
    $('.closeX').addClass("xHover");
  });
  $('#petfinderInfo').on("mouseleave", ".closeX", function(e) {
    $('.closeX').removeClass("xHover");
  });

  $('#splashButton').on("click", function() {
    $('#nextPet, .reset, iframe, #prevBtn').removeClass('hidden');
  })

  $('.reset').on("click", function() {
    $('.splash').removeClass('hidden');
  })

  
  
  
  
  
  
});

//unsed radio
//var an = $('input[name="anType"]:checked').val()




