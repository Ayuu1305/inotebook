const connetTomongo = require("./db");
const express = require("express");
const cors = require('cors')
connetTomongo();

const port = process.env.port || 5000;

const app = express()

app.use(cors())
app.use(express.json())

//Avaiable routes


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
