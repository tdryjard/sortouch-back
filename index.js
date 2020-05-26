const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes');

const port = process.env.PORT || 80;

app.use(cors({origin: 'sortouch-front.herokuapp.com'}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);


app.listen(port, () => console.log(`Server is running on port ${port}.`));
