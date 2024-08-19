const express = require('express');
const mongoose = require('mongoose');
const moneymodel = require('./models/money');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/moneytracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', async (req, res) => {
    try {
        const moneys = await moneymodel.find();
        console.log('Fetched data:', moneys);
        res.render('index', { moneys });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/read', async (req, res) => {
    try {
        const { product, desc, price, date } = req.body;
        console.log('Received data:', req.body);
        const newMoney = new moneymodel({
            product,
            desc,
            price,
            Date: new Date(date)
        });
        const savedMoney = await newMoney.save();
        console.log('Saved data:', savedMoney);
        res.redirect('/');
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
