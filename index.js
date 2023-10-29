const ConnectToMongo = require('./db');
const cors = require('cors');
ConnectToMongo();
const express = require('express');
const app = express();
const port=5000;
app.listen(port, ()=>{
    console.log("listening on port",port);
});
app.use(cors())


app.get('/',(req,res)=>{
res.json("This is home")
})
app.use(express.json());
app.use('/api/notes',require('./routes/NotesRoutes'));
app.use('/api/auth' ,require('./routes/AuthRoutes'));

