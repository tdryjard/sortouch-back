const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes');

const port = process.env.PORT || 8080

app.use(cors({origin: 'https://sortouch.co'}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('https://api.sortouch.co/api', api);


app.listen(port, () => console.log(`Server is running on port ${port}.`));
