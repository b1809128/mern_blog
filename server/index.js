const express  = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
const port = 5000;

app.get('/', (req, res) => {
    res.send("hello node js")
});

app.use('/auth',authRoutes);

mongoose.connect("mongodb://localhost:27017/blog",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
},()=>console.log('Connect Success !'));

app.listen(port, ()=>console.log(`Server is running on http://localhost:${port}`));