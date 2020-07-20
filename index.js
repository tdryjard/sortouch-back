const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const api = require('./routes');
const apiChatbot = require('./routes_chatbot');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT || 8000

app.use(cookieParser());

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use('/api', api);

app.use(cors());

app.use('/api/chatbot', cors(), apiChatbot);


app.listen(port, () => console.log(`Server is running on port ${port}.`));
