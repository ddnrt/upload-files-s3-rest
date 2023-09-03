const AWS = require('aws-sdk')
require('dotenv').config()

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    endpoint: process.env.S3_URL
})

module.exports = s3