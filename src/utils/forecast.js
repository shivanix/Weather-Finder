const request = require("postman-request");
const { weatherStackApiKey } = require("../APIKeys");


const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${encodeURIComponent(
    longitude
  )},${encodeURIComponent(latitude)}&units=m`;

  // json in lowercase option, can be set to true or false.
  // true responses are to automatically pass JSON responses to us.--You wont have to do JSON.parse specially
  request({url, json: true }, (error, {body}) => {
    const data = body.current;

    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Invalid coordinate pair", undefined);
    } else {
      // console.log(data);

      callback(
        undefined,
        `It is currently ${data.temperature} degrees Celsius and is ${data.weather_descriptions[0]}. It feels like ${data.feelslike} degrees Celsius outside`
      );
    }
  });
};

module.exports = forecast;
