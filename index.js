const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const loginuser = require('./routes/user')
const location = require('./routes/locations')
const child = require('./routes/child')
const cors = require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/user', loginuser);
app.use('/location',location);
app.use('/child',child)
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})
