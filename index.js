require('dotenv').config();
require('./data/db');


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path')

const app = express();

app.use(bodyParser.json())

app.use(cors())

app.use(express.static(path.join(process.cwd(), 'public')));

const UserRouter = require('./api/User');
const VerificationRouter = require('./api/Verification');
const AccountRouter = require('./api/Account');
const ListRouter = require('./api/List');
const ScheduledEmailRouter = require('./api/ScheduledEmail');

app.use('/api/user', UserRouter)
app.use('/api/verification', VerificationRouter)
app.use('/api/account', AccountRouter)
app.use('/api/list', ListRouter)
app.use('/api/email', ScheduledEmailRouter)


app.use(function (req, res, next) {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
    .on('error', error => {
        console.error(error.message);
    });