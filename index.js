const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connect to db')
)

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(process.env.PORT, () => console.log('Server up and running'));