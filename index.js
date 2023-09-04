const express = require('express')
const router = require('./routes/index')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT | 5001


app.use(express.json())
app.use('/api/v1/', router)

app.listen(PORT, () => {
    console.log(`Upload Files Service started at http://localhost:${PORT}`)
    }
)



