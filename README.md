
# Node.js REST API for Uploading Photos to S3 Bucket

This repository contains a Node.js project that provides a REST API for uploading photos to an S3 bucket. With additional advanced functionalities such as multi-upload, multi-deletion by filename, and JWT role validation. Which is easy to integrate into your project



## Features

- Multi-Upload
- Multi-Deletion by Filename
- JWT Role Validation


## Run Locally

Clone the project

```bash
  git clone https://github.com/ddnrt/upload-images-s3-rest.git
```
Go to the project directory
```bash
  cd upload-images-s3-rest
```
Install dependencies

```bash
  npm install
```

Start the service

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`S3_URL`

`S3_BUCKET`

`S3_SECRET_KEY` - secretAccessKey

`S3_ACCESS_KEY` - accessKeyId

`JWT_SECRET_KEY`

`PORT`


# Usage/Examples
URL: http://localhost:5001/api/v1/image

To change path edit lines
```
app.use('/api/v1/', router) // index.js

router.use('/image', imageRouter) // routes/index.js
```

## Upload Images

### Method
``` POST```

### Request Headers:

Authorization:
```
Bearer ... // JWT must contain "role"
```

### Body (form-data):
```
id // number
photo // photo form-data
```

### Response:

Example: 
```
{
    "result": [
        "1/test.jpg",
        "1/test1.jpg"
    ] // Array of paths to photos
}
```

## Delete Images

### Method
``` DELETE ```

### Request Headers:

Authorization:
```
Bearer ... // JWT must contain "role"
```

### Body:
```
photoKey : [] // array of paths to photo
```

### Response:

Example: 
```
{
    "result": [
        "1/test.jpg deleted",
        "1/test1.jpg deleted"
    ]
}
```
