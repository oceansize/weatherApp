console.log("They're coming to get you Barbara...");

var cityListApi = 'http://weather-api.herokuapp.com/cities';
var individualCityApi = 'http://weather-api.herokuapp.com/temperature?city=';

$(document).ready(function() {

  var populateSelect = function(cityList) {
    $.each(cityList.cities, function(index, city) {
      $('.cities').append(
        $('<option></option>').val(city).html(city));
    });
  };

  var retrieveCities = function() {
    $.ajax({
      url: cityListApi,
      dataType: 'jsonp'
    }).done(function(cityList) {
      populateSelect(cityList);
      getIndividualCity(cityList.cities[0]);
    });
  };

  var updateStyling = function(individualCity){
    $('.temperature').text(individualCity.temp);
    console.log(individualCity);
    $('img').attr('src', 'images/' + individualCity.outlook + '.svg');
    $('#icon').attr('class',individualCity.outlook);
    $('body').attr('class',individualCity.outlook + '_wallpaper');
  };

  var getIndividualCity = function(city) {
    $.ajax({
      dataType: 'jsonp',
      url: individualCityApi + city,
      success: function(individualCity) { updateStyling(individualCity); }
    });
  };

  $('select').change(function() {
    var city = $( 'select option:selected' ).val();
    getIndividualCity(city);
  });

  retrieveCities();
});