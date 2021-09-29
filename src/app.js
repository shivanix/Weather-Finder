const path = require("path");

const express = require("express");

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

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "namingg",
  });
});

app.get("/about", (req, res) => {
  res.render("about",
  {
    title: "About Me",
    name: "Shivani",
  });
})

app.listen(3000, () => {
  console.log("Server is up on Port 3000.");
});
