const express = require('express')
const app = express()

app.get('/', (request,response) => {
    response.send('hello world')
})



const PORT = 3001
app.listen(PORT)