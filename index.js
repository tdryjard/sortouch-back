const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes');

const port = process.env.PORT || 80;
const host = process.env.DB_HOST || '0.0.0.0';

server.listen(port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

app.use(cors({origin: 'https://sortouch-front.herokuapp.com'}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);


app.listen(port, host, () => console.log(`Server is running on port ${port}.`));
