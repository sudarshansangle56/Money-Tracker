const express = require('express');
const mongoose = require('mongoose');
const moneymodel = require('./models/money');
const bodyParser = require('body-parser');
//const authRoutes = require('./auth/authentication');
const home= require('./Routes/home');
const sec= require('./Routes/sec');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

mongoose.connect('mongodb://localhost:27017/moneytracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


//app.use("/auth", authRoutes); // Assuming authRoutes handles routes starting with /auth
app.use("/", home); // Assuming home handles routes starting with /home
app.use("/", sec); // Assuming sec handles routes starting with /sec


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
