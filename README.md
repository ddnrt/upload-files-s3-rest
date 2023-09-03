
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

## Settings

### Upload photo limits
Default = 10

To change the limit, change the value that is passed to upload.array in the file routes/imageRouter.js
```
router.post('/', upload.array('photo', 20), roleMiddleware("ADMIN"), ImageController.upload); // changed limit to 20 photos
```

### Role Validation
To change the role, change the value that is passed to roleMiddleware in the file routes/imageRouter.js 
```
router.post('/', upload.array('photo', 10), roleMiddleware("MODERATOR"), ImageController.upload); // changed role to "MODERATOR"
router.delete('/', roleMiddleware("ADMIN"), ImageController.delete); // default role "ADMIN"
```
### Disabling Role Validation
If you don't need validation by role delete calling middleware (roleMiddleware("ADMIN")) from router
```
router.delete('/', ImageController.delete); // without validation by role
router.delete('/', roleMiddleware("ADMIN"), ImageController.delete); // default

```

# REST API
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
folder // folder
id // number
photo // photo form-data
```

### Response:

Example: 
```
{
    "result": [
        "folder/1/test.jpg", // folder/id/photoPath
        "folder/1/test1.jpg" // folder/id/photoPath
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
