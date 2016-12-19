$(document).ready(function(e) {

  var commonVars = {};
  commonVars.offSet = -1;
  commonVars.option = '';
  commonVars.needs = "";
  commonVars.radius = $('#zipRadius').val();
  commonVars.url = 'https://api.petfinder.com/pet.find?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&animal=dog&breed=Great%20Dane&output=full';

  $('.checker').on("click", function(e) {
    commonVars.option += $(this).val();
  });

  function getter() {
    $.ajax({
      type: 'GET',
      async: true,
      data: {},
      url: commonVars.url + commonVars.zip + '&offset=' + commonVars.offSet + commonVars.option + commonVars.radius + '&callback=?',
      dataType: 'jsonp',
      success: function(data) {
        addy(data);
      },
    });
  }

  function addy(b) {
    var petfinder = b.petfinder;

    commonVars.pic = petfinder.pets.pet.media.photos.photo[2].$t;
    commonVars.id = petfinder.pets.pet.id.$t;
    commonVars.name = petfinder.pets.pet.name.$t;
    commonVars.email = petfinder.pets.pet.contact.email.$t;
    commonVars.phone = petfinder.pets.pet.contact.phone.$t;
    commonVars.city = petfinder.pets.pet.contact.city.$t;
    commonVars.state = petfinder.pets.pet.contact.state.$t;
    commonVars.shelterID = petfinder.pets.pet.shelterId.$t;

    //////////
    //DETAILS
    //////////
    for (var z in petfinder.pets.pet.options.option) {
      if (Object.values(petfinder.pets.pet.options.option[z]) == "hasShots") {
        commonVars.needs = "I have my shots! &#x2714";
      }
      if (Object.values(petfinder.pets.pet.options.option[z]) == "housetrained") {
        commonVars.needs += "<br>I'm housetrained! &#x2714";
      }
      if (Object.values(petfinder.pets.pet.options.option[z]) == "altered") {
        commonVars.needs += "<br>I'm already spayed/neutered &#x2714";
      }
      if (Object.values(petfinder.pets.pet.options.option[z]) == "noDogs") {
        commonVars.needs += "<br>I like to be the only dog in the house &#x2714";
      }
      if (Object.values(petfinder.pets.pet.options.option[z]) == "noCats") {
        commonVars.needs += "<br>Grrr I don't like cats! &#x2714";
      }
      if (Object.values(petfinder.pets.pet.options.option[z]) == "specialNeeds") {
        commonVars.needs += "<br>I've got some special needs &#x2714";
      }
    }
    ///////////////// 
    ////////////////
    var str1 = commonVars.name;
    for (var i in str1) {
      var words = str1.split("-")[0];
      commonVars.firstName = words;
    }

    var infoHTML = '';
    infoHTML += '<h3>Hi! My name is ' + commonVars.firstName + '!</h3>';
    infoHTML += '<br>';
    infoHTML += '<strong>Here\'s what people say about me</strong><br>';
    infoHTML += '<pre>' + petfinder.pets.pet.description.$t + '</pre>';
    infoHTML += '<br>';
    infoHTML += '<div id="information" class="hidden"></div>';
    infoHTML += '<button id="info">Learn More About Me</button><a href="mailto:' + commonVars.email + '?subject=Adopting%20' + commonVars.name + '&body=Body%20goes%20here"><button id="adopt">Take Me Home!</button></a></ul>';

    $('#petfinderInfo').append('<a target="_blank" href="https://www.petfinder.com/petdetail/' + commonVars.id + '"><img class="petPic" src=' + commonVars.pic + '></a>' + infoHTML);
  }

  ///////   Next Button
  //////////
  $('.newPet, .finder').on("click", function(e) {
    if ($('#zip').val().length == 5) {
      e.preventDefault();
      commonVars.offSet++;
      commonVars.zip = "&location=" + $('#zip').val();
      commonVars.groomZip = $('#zip').val();
      $("#lmgtfy").prop('href', 'https://www.google.com/search?q=dog+training+' + $('#zip').val());
      $('#petfinderInfo').empty();
      $('.splash').addClass('hidden');
      getter();
    }
  });
  //////
  ////////////Swipe Right New Pet

  $('.col-12').on("swiperight", function(e) {
    if ($('#zip').val().length == 5) {
      e.preventDefault();
      commonVars.offSet++
        commonVars.zip = "&location=" + $('#zip').val();
      $("#lmgtfy").prop('href', 'https://www.google.com/search?q=great+dane+training+' + $('#zip').val())
      $('#petfinderInfo').empty();
      $('.splash').addClass('hidden');
      getter();
    };
  });

  /////
  /////////Swipe Left Last Pet

  $('.col-12').on("swipeleft", function(e) {
    e.preventDefault();
    if (commonVars.offSet > 0) {
      commonVars.offSet--;
    };
    $('#petfinderInfo').empty();
    $('.splash').addClass('hidden');
    getter();
  });

  /////////
  //PREV BUTTON

  $('#prevBtn').on("click", function(e) {
    e.preventDefault();
    if (commonVars.offSet !== 0) {
      commonVars.offSet--;
    };
    $('#petfinderInfo').empty();
    $('.splash').addClass('hidden');

    getter();
  });

  /////////
  ////INFO CALL
  $('#petfinderInfo').on("mouseenter touchstart", "#info", function(e) {
    commonVars.shelterLink = 'https://api.petfinder.com/shelter.get?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&id=' + commonVars.shelterID + '&output=full';
    $('.splash').addClass('hidden');
    $.ajax({
      type: 'GET',
      data: {},
      url: commonVars.shelterLink + '&callback=?',
      dataType: 'jsonp',
      success: function(data) {
        var shelterFinder = data.petfinder;
        commonVars.shelterName = shelterFinder.shelter.name.$t;
        commonVars.long = shelterFinder.shelter.longitude.$t;
        commonVars.lat = shelterFinder.shelter.latitude.$t;
        commonVars.addy = shelterFinder.shelter.address1.$t;
      }
    });
  });

  ////       INFO BOX
  ///////
  $("#petfinderInfo").on("click", "#info,#information", function(e) {
    $('#information').empty().toggleClass('hidden').append('<div class="col-6"><div id="mapBorder"><div class="overlay"><iframe frameborder="0" id="map" src="https://maps.google.com/maps?output=embed&iwloc&z=10&mid=1rTY7Rf5tSCc5FOdtFeeiszRYcNc&&daddr=' + commonVars.lat + ',' + commonVars.long + '"></iframe></div></div></div><div class="col-6" id="needs"><p><strong>Name:</strong> ' + commonVars.name + '<br><strong>Shelter:</strong><a target="_blank" href="http://awos.petfinder.com/shelters/' + commonVars.shelterID + '.html">' + commonVars.shelterName + '</a><br><strong>Location</strong>: <a target=_blank href="https://www.google.com/maps/place/@' + commonVars.lat + ',' + commonVars.long + ',' + '13z/">' + commonVars.addy + '</a><br>' + commonVars.city + ', ' + commonVars.state + '<br><strong>E-mail: </strong><a href="mailto:' + commonVars.email + '">' + commonVars.email + '</a><br><strong>Phone: </strong> ' + '<a href="tel:+' + commonVars.phone + '">' + commonVars.phone + '</a>' + '<br>' + commonVars.needs + '</p></div><span id="spinny">X</span>');
  });

  $('#splashButton, .finder').on("click", function(e) {
    if ($('#zip').val().length == 5) {
      $('#nextPet, #resources, .reset, iframe, #prevBtn, .swipeMessage, .row').removeClass('hidden');
    }
  });

  $('.reset').on("click", function(e) {
    $('.splash').removeClass('hidden');
    $('#zip').val() === 0;
  });
  
  //////////      Donate
  /////
  $('#shelterDonate').on("click", function(e) {
    $("#donate").attr("src", "https://secure.aspca.org/donate/ps-gn-p2?ms=MP_PMK_Googlenonbrand-T4&initialms=MP_PMK_Googlenonbrand-T4&pcode=WPSE9XXGOGN2PK00024&lpcode=WPSE9XXGOGN1PK00024&ms=MP_PMK_Googlenonbrand-T4&initialms=MP_PMK_Googlenonbrand-T4&pcode=WPSE9XXGOGN2PK00024&lpcode=WPSE9XXGOGN1PK00024&gclid=Cj0KEQiA6_TBBRDInaPjhcelt5oBEiQApPeTF59I-TNmSJZRbaSpIXxks6W9cN9FQwyr2CNmP4qoav0aAkvl8P8HAQ")
    $('#donateDiv').removeClass("hidden");
  });

  $('#donateClose').on("click", function(e) {
    $('#donateDiv').addClass("hidden");
  });

  $(document).click(function(e) {
    if ((e.target.id != 'donateDiv') && (e.target.id != 'shelterH') && !$('#donateDiv').hasClass("hidden")) {
      $("#donateDiv").addClass("hidden");
    }
  });

  $('#toys, .azonClose').on("click", function(e) {
    $('#workDammit').toggleClass("hidden2");
  });

  $('#groomLink, .groomClose').on("click", function(e) {
    $('#groomSection, .groomCloseWrap').toggleClass("hidden");
  });

  /////////GRooming 
  //////////////////////

  function loadScript(src, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";
    if (callback) script.onload = callback;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = src;
  }

  $('#groomLink').on("click", function(e) {
    $('#groomSection').empty();
    window.groomCall = function() {
      var service = new google.maps.places.PlacesService($('.groom').get(0));

      function link() {
        service.getDetails({
          placeId: commonVars.placeId
        }, function(response2, status) {
          //alert(JSON.stringify(response2, '', 2))
          commonVars.website = response2.website;
          commonVars.bizName = response2.name;
          commonVars.bizAddress = response2.vicinity;
          commonVars.types = response2.types;
          commonVars.rated = response2.rating;
          commonVars.groomPhone = response2.formatted_phone_number;

          if (commonVars.website == null) {
            $('.groom').append('<div class="col-4 groom2"><a target="_blank" href="http://www.google.com/#q=' + commonVars.bizName + '"><h4>' + commonVars.bizName + '</h4></a><br>' + commonVars.bizAddress + '<br>' + commonVars.groomPhone + '<br><span class="cappy">' + commonVars.types[0].replace(/_/g, " ") + ' / ' + commonVars.types[1].replace(/_/g, " ") + '</span><br>' + commonVars.rated + '</div>');
            $('.cappy').css("text-transform", "capitalize");
          } else if (commonVars.website != null) {
            $('.groom').append('<div class="col-4 groom2"><a target="_blank" href="' + commonVars.website + '"><h4>' + commonVars.bizName + '</h4></a>' + commonVars.bizAddress + '<br>' + commonVars.groomPhone + '<br><span class="cappy">' + commonVars.types[0].replace(/_/g, " ") + ' / ' + commonVars.types[1].replace(/_/g, " ") + '</span><br>' + "Google Places rating: " + commonVars.rated + '</div>');
            $('.cappy').css("text-transform", "capitalize");
          }
        });
      }

      service.textSearch({
        query: commonVars.groomZip + "dog grooming"
      }, function(response, status) {
        console.log(JSON.stringify(response, '', 2))
          // alert(JSON.stringify(response[0].place_id, '', 2))

        var x = 0;
        for (var i in response) {
          // alert(response)
          commonVars.rating = response[x].rating;
          commonVars.placeId = response[x].place_id;
          x++;
          if (typeof commonVars.rating == 'number') {
            link();
            
           
          }
        }
      })
    }
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBmJ0_YAaSOyxFKql5LFhoaAa9K2EXhX8I&libraries=places&callback=groomCall',
      function() {
        log('google-loader has been loaded, but not the maps-API ');
      });
  })
})