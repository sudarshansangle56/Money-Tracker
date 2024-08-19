const express = require('express');
const router = express.Router();
const moneymodel = require('../models/money');


router.get("/", async(req,res)=>{
    res.render("home")
})

router.get('/ok', async (req, res) => {
    try {
        const moneys = await moneymodel.find();
        res.render('index', { moneys });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/read', async (req, res) => {
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

module.exports = router;
