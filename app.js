$(document).ready(function() {

  var commonVars = {};
  commonVars.url = 'https://api.petfinder.com/pet.find?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&animal=dog&breed=Great%20Dane&location=48732&distance=10&output=full';

  $('.newPet').on("click", function() {
    
    $('#petfinderInfo').empty();
    $('.splash').addClass('hidden');
    $.ajax({
      type: 'GET',
      data: {},
      url: commonVars.url + '&callback=?',
      dataType: 'json',
      success: function(data) {

        var petfinder = data.petfinder;
        
        //alert(JSON.stringify(petfinder, '', 2));
        commonVars.url = 'https://api.petfinder.com/pet.find?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&animal=dog&breed=Great%20Dane&location=48732&distance=10&output=full';
        commonVars.url += '&offset=' + petfinder.lastOffset.$t;

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
        infoHTML += petfinder.pets.pet.description.$t;
        infoHTML += '<br>';
        infoHTML += '<div id="information" class="hidden"></div>';

        infoHTML += '<button id="info">Learn More About Me</button><a href="mailto:' + commonVars.email + '?subject=Adopting%20' + commonVars.name + '&body=Body%20goes%20here"><button id="adopt">Take Me Home!</button></a></ul>';

        $('#petfinderInfo').append('<a target="_blank" href="https://www.petfinder.com/petdetail/' + commonVars.id + '"><img src=' + commonVars.pic + '></a>' + infoHTML);
      },
    });
  });

  ////
  /////////
  ////INFO CALL

  $('#petfinderInfo').on("mouseenter", "#info", function(e) {
      commonVars.shelterLink = 'https://api.petfinder.com/shelter.get?format=json&key=078fb1d0bd3aa6e9dba1f991d5972ae7&count=1&id=' + commonVars.shelterID + '&output=full';
      $('.splash').addClass('hidden');
      $.ajax({
        type: 'GET',
        data: {},
        url: commonVars.shelterLink + '&callback=?',
        dataType: 'json',
        success: function(data) {
          var shelterFinder = data.petfinder;
          commonVars.shelterName = shelterFinder.shelter.name.$t;
            //alert(commonVars.shelterName)
            // alert(JSON.stringify(shelterFinder, '', 2));
        }
      });
    });
    //
    ////       INFO BOX
    ///////
  $("#petfinderInfo").on("click", "#info,#information", function(e) {
    $('#information').empty().toggleClass('hidden').append('<p><strong>Name:</strong> ' + commonVars.name + '<br>Shelter: ' + commonVars.shelterName + '<br><strong>Location</strong>: ' + commonVars.city + ', ' + commonVars.state + '<br><strong>E-mail: </strong><a href="mailto:' + commonVars.email + '">' + commonVars.email + '</a><br><strong>Phone: </strong> ' + '<a href="tel:+' + commonVars.phone + '">' + commonVars.phone + '</a></p><span class="closeX">X</span>');

  });
  $('#petfinderInfo').on("mouseover", ".closeX", function(e) {
    $('.closeX').addClass("xHover");
  });
  $('#petfinderInfo').on("mouseleave", ".closeX", function(e) {
    $('.closeX').removeClass("xHover");
  });
});

//unsed radio
//var an = $('input[name="anType"]:checked').val()