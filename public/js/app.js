console.log("Client side Js file is loaded");



/* fetch allows you to fetch data from a URL and do something with it*/
fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

fetch("http://localhost:3000/weather?address=toronto").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});

const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
console.log("testingggggg");
})