const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/gamestore';

mongoose.connect(DB_URL)
    .catch(() => { throw new Error("Could not connect to database") })

mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.once('connection', () => console.log('Database connected'))

const app = express();

app.get('/', (req, res) => {
    res.send('IT\'S ALIVE!!!')
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));