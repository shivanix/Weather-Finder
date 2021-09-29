const path = require('path')

const express = require('express')

// console.log(path.join(__dirname, '../public'));

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
  res.send('<h1>Weather</h1>')

})


app.listen(3000, ()=>{
  console.log('Server is up on Port 3000.');
})