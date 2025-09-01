const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms :body'))

//npm install morgan DOC: github.com/expressjs/morgan

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//BUG, IDGEN IS SAME NUMBER EVERYTIME IF USED AS A CONST, MULTIPLE PEOPLE WILL GET SAME ID, NEED TO SET IT AS A FUNCTION AND CALL IT EVERYTIME TO GET UNIQUE IDS
const idGenerator = () => Math.floor(Math.random() *10000000)

app.get('/', (request, response) => {
    response.send('Hello world')
})

app.get('/api/persons', (request, response) =>{
    response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has information for ${persons.length} people<br><br> ${new Date()}`)
})

app.get('/api/persons/:id', (request,response) =>{
  const id = request.params.id
  const foundPerson = persons.find((person) => id === person.id)
  if (foundPerson){
    response.json(foundPerson)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) =>{
  const id = request.params.id
  persons = persons.filter((person) => id !== person.id)
 
  response.status(204).end()  
})

app.post('/api/persons', (request, response) =>{
  const body = request.body
  
  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'Name or Number is missing'
    })
  }
  else if (persons.find((person) => person.name === body.name)){
    return response.status(400).json({
      error: 'Person is already in the Phonebook'
    })
  }

  console.log('body',body);  

  const newPerson = 
  { 
    id :  String(idGenerator()),
    name : body.name,
    number: body.number    
  }

  console.log('added', newPerson);
  
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
  console.log(`Server is running on Port: ${PORT}`);
  
})

//MAKE SURE TO INCLUDE APP.USE.EXPRESS JSON OR ELSE BODY WILL BE UNDEFINED AND POSTS WILL NOT WORK