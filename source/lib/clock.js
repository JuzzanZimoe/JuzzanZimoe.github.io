function clockUpdateTime(weather, city) {
  var clockBox = document.getElementById("hexo_electric_clock");
  if (!clockBox) return;

  var nowWeather = weather && weather.now ? weather.now : {};
  var hasWeather = nowWeather.temp !== undefined && nowWeather.temp !== "--";
  var icon = nowWeather.icon || "100";
  var text = hasWeather ? nowWeather.text : "天气获取中";
  var temp = hasWeather ? nowWeather.temp + " ℃" : "";
  var humidity = hasWeather ? "湿度 " + nowWeather.humidity + "%" : "";
  var windDir = hasWeather ? nowWeather.windDir : "定位中";

  clockBox.innerHTML = [
    '<div class="clock-row clock-row-top">',
    '  <span id="card-clock-clockdate" class="card-clock-clockdate"></span>',
    '  <span class="card-clock-weather"><i class="qi-' + icon + '-fill"></i><span>' + text + "</span><span>" + temp + "</span></span>",
    "</div>",
    '<div class="clock-row clock-row-main">',
    '  <span id="card-clock-time" class="card-clock-time"></span>',
    "</div>",
    '<div class="clock-row clock-row-bottom">',
    '  <span class="card-clock-windDir">' + windDir + "</span>",
    '  <span class="card-clock-location">' + (city || "未知位置") + "</span>",
    '  <span class="card-clock-humidity">' + humidity + "</span>",
    "</div>",
  ].join("");

  var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  function zeroPadding(num, digit) {
    return String(num).padStart(digit, "0");
  }

  function updateTime() {
    var now = new Date();
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()].map(function (part) {
      return zeroPadding(part, 2);
    }).join(":");
    var date = [
      zeroPadding(now.getFullYear(), 4),
      zeroPadding(now.getMonth() + 1, 2),
      zeroPadding(now.getDate(), 2),
    ].join("-") + " " + week[now.getDay()];

    var timeEl = document.getElementById("card-clock-time");
    var dateEl = document.getElementById("card-clock-clockdate");
    if (timeEl) timeEl.textContent = time;
    if (dateEl) dateEl.textContent = date;
  }

  clearInterval(window.hexoElectricClockTimer);
  window.hexoElectricClockTimer = setInterval(updateTime, 1000);
  updateTime();
}

function weatherCodeToText(code) {
  if (code === 0) return { text: "晴", icon: "100" };
  if ([1, 2].includes(code)) return { text: "多云", icon: "101" };
  if (code === 3) return { text: "阴", icon: "104" };
  if ([45, 48].includes(code)) return { text: "雾", icon: "501" };
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { text: "雨", icon: "305" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { text: "雪", icon: "400" };
  if ([95, 96, 99].includes(code)) return { text: "雷雨", icon: "302" };
  return { text: "天气", icon: "100" };
}

function degreeToWind(degree) {
  if (typeof degree !== "number") return "--";
  var directions = ["北风", "东北风", "东风", "东南风", "南风", "西南风", "西风", "西北风"];
  return directions[Math.round(degree / 45) % 8];
}

function fallbackClock(city) {
  clockUpdateTime({
    now: {
      icon: "100",
      text: "天气获取中",
      temp: "--",
      humidity: "--",
      windDir: "定位失败",
    },
  }, city || "杭州市");
}

async function reverseGeocode(latitude, longitude) {
  try {
    var url = "https://api.bigdatacloud.net/data/reverse-geocode-client"
      + "?latitude=" + latitude
      + "&longitude=" + longitude
      + "&localityLanguage=zh";
    var response = await fetch(url);
    var data = await response.json();
    return data.city || data.locality || data.principalSubdivision || "当前位置";
  } catch (error) {
    console.error("Reverse geocode request failed:", error);
    return "当前位置";
  }
}

async function fetchOpenMeteoWeather(location, city) {
  var parts = String(location).split(",");
  var longitude = parts[0] || "120.15515";
  var latitude = parts[1] || "30.27415";
  var url = "https://api.open-meteo.com/v1/forecast"
    + "?latitude=" + latitude
    + "&longitude=" + longitude
    + "&current=temperature_2m,relative_humidity_2m,weather_code,wind_direction_10m"
    + "&timezone=auto";

  try {
    var response = await fetch(url);
    var data = await response.json();
    if (data && data.current) {
      var weather = weatherCodeToText(data.current.weather_code);
      clockUpdateTime({
        now: {
          icon: weather.icon,
          text: weather.text,
          temp: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          windDir: degreeToWind(data.current.wind_direction_10m),
        },
      }, city || "当前位置");
      return true;
    }
  } catch (error) {
    console.error("Open-Meteo request failed:", error);
  }

  return false;
}

async function fetchWeather(location, city) {
  var host = typeof qweather_api_host !== "undefined" && qweather_api_host
    ? qweather_api_host
    : "nj6r6pm8pt.re.qweatherapi.com";

  if (typeof qweather_key !== "undefined" && qweather_key) {
    try {
      var response = await fetch("https://" + host + "/v7/weather/now?location=" + location + "&key=" + qweather_key);
      var data = await response.json();
      if (data.code === "200") {
        clockUpdateTime(data, city);
        return;
      }
      console.warn("QWeather returned code:", data.code);
    } catch (error) {
      console.error("Weather request failed:", error);
    }
  }

  if (!(await fetchOpenMeteoWeather(location, city))) fallbackClock(city);
}

function getBrowserLocation() {
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 8000,
      maximumAge: 30 * 60 * 1000,
    });
  });
}

async function getClockInfo() {
  var fallbackCity = "杭州市";
  var fallbackLocation = typeof clock_rectangle !== "undefined" && clock_rectangle
    ? clock_rectangle
    : "120.15515,30.27415";

  fallbackClock("定位中");

  if (clock_default_rectangle_enable !== "true") {
    try {
      var position = await getBrowserLocation();
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var city = await reverseGeocode(latitude, longitude);
      fetchWeather(longitude + "," + latitude, city);
      return;
    } catch (error) {
      console.warn("Browser location unavailable:", error);
    }
  }

  fetchWeather(fallbackLocation, fallbackCity);
}

getClockInfo();
