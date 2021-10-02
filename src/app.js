const path = require("path");
const express = require("express");

const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode  = require("./utils/geocode");

// console.log(path.join(__dirname, '../public'));

/********************************************************** */
// view engine tells Express which extension to associate with the template when you call res.render(). If you write:

// app.set('view engine', 'hbs')
// And then call:

// res.render('home')
// It'll look for a "home.hbs" file in your views directory so you don't need to specify the extension.

/********************************************************** */
// the express.static() middleware is what serves the CSS files. Whenever a request comes in, Express checks if the thing we're looking for is in the public folder and if it is, it serves it.

/********************************************************** */
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Views folder is a default location that Express expects your views to live in.

/**
 * 
 * You can always customize that, but to customize it, you have to tell express where to look   * And this is going to require us to create a brand new path.
// So let's go ahead and define one similar to how we defined public directory path.
 */

// Setup handlebars engine and viewslocation
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shivani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shivani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Help page",
    name: "Shivani",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a valid address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: {},
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on Port 3000.");
});
