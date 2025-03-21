const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());


const cors = require('cors');

app.use(cors('*'));


app.get('/', (req, res) => {

  res.send("server working");
});


const questionroute = require('./Routes/questionRoutes');
const login = require('./Routes/loginRoutes');
const register = require('./Routes/registerRoutes')
app.use(questionroute);
app.use(login);
app.use(register);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
