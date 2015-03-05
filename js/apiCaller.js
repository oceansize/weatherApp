console.log("They're coming to get you Barbara...");

$(document).ready(function() {

  var city = 'mexico_city'
  var data = $.ajax({
    dataType: "jsonp",
    url: 'http://weather-api.herokuapp.com/temperature?city=' + city,
    success: function(response ) {
      console.log( data.responseJSON ); // server response
      $('.temperature').text(data.responseJSON.temp);
      $('img').attr("src", 'images/' + data.responseJSON.outlook + '.svg');
      $('#icon').removeClass().addClass(data.responseJSON.outlook);
    }
  });

});