const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes');

const port = process.env.PORT || 8080

app.use(bodyParser.json());

app.use('/api', api);


app.listen(port, () => console.log(`Server is running on port ${port}.`));
