require('dotenv').config()
const axios = require('axios');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: false,
    timezone: '+00:00'
}

 /** Valuuttavalinta yritykset 
 * CurrencyContext.js jostain syystä ei halunnut ottaa /pricesta price_usd ja/tai price joten se fetchaa ne /productsista harjoitustyössä*/
 app.get('/price', async (req, res) => {
    try {
      const connection = await mysql.createConnection(conf);
  
      const [rows] = await connection.execute('SELECT price_usd FROM product');
  
      const currencies = rows.map((row) => row.price_usd);
  
      res.json({ currencies });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

/**Toinen yritys saada koodi toimimaan jossa kopioin /productsin koodit mutta fetchaan price ja price_usd ainoastaan */

app.get('/price', async (req, res) => {
    try {
        const connection = await mysql.createConnection(conf);
        const category = req.query.category;
        const search = req.query.search;

        let result;        

        if(category){
            result = await connection.execute
            ("SELECT price, price_usd FROM product WHERE category=?", [category]);
        } else if (search) {
            result = await connection.execute
            ("SELECT price, price_usd FROM product WHERE product_name LIKE ?", [`%${search}%`]);
        } else {
            result = await connection.execute("SELECT price, price_usd FROM product");
        }
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**minun koodi käytti /productsia harjoitustyössä koska en saanut sitä toimimaan kunnolla ylempiä kooodia käyttäen*/
app.get('/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(conf);
        const category = req.query.category;
        const search = req.query.search;
        let result;        
        if(category){
            result = await connection.execute
            ("SELECT id, product_name productName, product_description description,product_description1 description1,product_description2 description2,product_description3 description3, price, price_usd, image_url imageUrl, category  FROM product WHERE category=?",
                 [category]);
        } else if (search) {
            result = await connection.execute
            ("SELECT id, product_name productName,product_description description,product_description1 description1, product_description2 description2,product_description3 description3, price, price_usd, image_url imageUrl, category FROM product WHERE product_name LIKE ?", 
                [`%${search}%`]);
        }
        else{
            result = await connection.execute(
                "SELECT id, product_name productName,product_description description,product_description1 description1,product_description2 description2,product_description3 description3, price, price_usd, image_url imageUrl, category  FROM product"
                );
        }
        //First index in the result contains the rows in an array
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});