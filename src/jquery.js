$ (document).ready(function(){
  var thermostat = new Thermostat();

  $('#temperature').text(thermostat.getCurrentTemperature());
  $('#increase-temp').click(function(){
    thermostat.increaseTemperature();
    updatesTemp();
  })

  $('#decrease-temp').click(function(){
    thermostat.decreaseTemperature();
    updatesTemp();
  })

  $('#reset-temp').click(function(){
    thermostat.reset();
    updatesTemp();
  })

  $('#psm-on').click(function(){
    thermostat.switchPowerSavingModeOn();
    updatesPSM('ON');
  })

  $('#psm-off').click(function(){
    thermostat.switchPowerSavingModeOff();
    updatesPSM('OFF');
  })

function updatesTemp(){
  $('#temperature').text(thermostat.getCurrentTemperature())
  if(thermostat.energyUsage() === 'low-usage') {
    $('#temperature').css('color', 'green')
  } else if(thermostat.energyUsage() === 'medium-usage') {
    $('#temperature').css('color', 'blue')
  } else {
    $('#temperature').css('color', 'red')
  }

};

  function updatesPSM(OnOff){
    $('#power-saving-status').text(OnOff)
  };

  // $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  //   $('#current-temperature').text(data.main.temp);
  // })

//   $('#current-city').change(function() {
//   var city = $('#current-city').val();
//   $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
//     $('#current-temperature').text(data.main.temp)
//   })
// })


function displayWeather(city) {
   var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
   var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
   var units = '&units=metric';
   $.get(url + token + units, function(data) {
     $('#current-temperature').text(data.main.temp);
   })
 }

 displayWeather('London');

$('#select-city').submit(function(event) {
  event.preventDefault();
  var city = $('#current-city').val();
  displayWeather(city);
})


});
