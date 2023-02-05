$(document).ready(function () {
  var citiesData = [];
  $.getJSON("config.json", function (jsonData) {
    $.each(jsonData.city, function (key, value) {
      $('#dropDownCities').append("<option value='" + value.cityType + "'>" + value.cityType + "</option>");
    });
  });
  $('#add-button').click(function () {
    var city = $('#dropDownCities').val();
    var APIKey = "406167a207a39a18140010d47616a067";
    if (city === "") {
      alert("OH! Please select a city to know Weather Condition.......");
      return;
    }
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var cityExists = false;
    for (var i = 0; i < citiesData.length; i++) {
      if (citiesData[i].name == city) {
        cityExists = true;
        break;
      }
    }

    if (cityExists) {
      alert("OOPS! City is already added.......");
    }
    else {
      $.getJSON(url, function (data) {
        // console.log(data);
        var temp = data.main.temp - 273.15;
        var feelsLike = data.main.feels_like - 273.15;
        var date = new Date(data.dt * 1000);
        var cityData = {
          name: data.name,
          country: data.sys.country,
          temp: temp.toFixed(1),
          feelsLike: feelsLike.toFixed(1),
          weather: data.weather[0].description,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
          date: date
        };

        citiesData.push(cityData);
        $('.today').empty();
        $('.today').append("<p>Current Date and Time :&nbsp;" + date + "</p>");

        var html = "";
        for (var i = 0; i < citiesData.length; i++) {
          document.getElementById('cityCards').innerHTML = '';
          html += "<div class='card'>";
          html += "<div class='primary'>";
          html += "<div class='cityName'>" + citiesData[i].name + "," + citiesData[i].country + "</div>";
          html += "<div class='delete-icon'><button class='fa fa-trash' id='" + citiesData[i].name + "'></button></div>";
          html += "</div>";
          html += "<div class='main-description'><img src='./Images/Description.png' alt='Description-image' width='100px' height='100px'/><p class='Description'>" + citiesData[i].weather.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()) + "</p></div><div class='clearfix'></div>";
          html += "<p class='temperature'>" + citiesData[i].temp + "&nbsp;c" + "</p>";
          html += "<p class='feelsLike'>Feels like: " + citiesData[i].feelsLike + "&nbsp;c" + "</p>";
          html += "<div class='secondary'>";
          html += "<div class='sunrise'><img src='./Images/sunrise.png' alt='Description-image' width='100px' height='100px'/><p>Sunrise: " + citiesData[i].sunrise + "</p></div>";
          html += "<div class='sunset'><img src='./Images/sunset.png' alt='Description-image' width='100px' height='100px'/><p>Sunset: " + citiesData[i].sunset + "</p></div>";
          html += "</div>";
          html += "</div>";
          $('#cityCards').append(html);
          $('.fa-trash').click(function () {
            $(this).closest('.card').remove();
            var delbut = $(this).closest('.fa-trash').attr('id');
            for (var i = 0; i < citiesData.length; i++) {
              if (delbut == citiesData[i].name)
                citiesData.splice(i, 1);
            }
          });
        }
      });
    }
  });
  $('#refreshBtn').click(function () {
    citiesData = [];
    $('#cityCards').empty();
    $('.today').empty();
    $('.today').append("<p>Do you want to add new cities? Let's start>>>>>>>>></p>");
  });

});


// obj[1].remove();