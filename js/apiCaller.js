console.log("They're coming to get you Barbara...");

$(document).ready(function() {

  $.ajax({
    url: 'http://weather-api.herokuapp.com/cities',
    dataType: "jsonp"
  }).done(function(cityList) {
      $.each(cityList.cities, function(index, city) {
        $('.cities').append(
          $('<option></option>').val(city).html(city));
      });
    });

  $('select').change(function() {
    var city = $( "select option:selected" ).val();
    console.log(city);
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

});