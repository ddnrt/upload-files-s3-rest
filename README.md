
# Node.js REST API for Uploading Files to S3 Bucket

This repository contains a Node.js project that provides a REST API for uploading files to an S3 bucket. With additional advanced functionalities such as multi-upload, multi-deletion by filename, and JWT role validation. Which is easy to integrate into your project



## Features

- Single-Upload
- Multi-Upload
- Single-Deletion by Filename
- Multi-Deletion by Filename
- JWT Role Validation


## Run Locally

Clone the project

```bash
  git clone https://github.com/ddnrt/upload-files-s3-rest.git
```
Go to the project directory
```bash
  cd upload-files-s3-rest
```
Install dependencies

```bash
  npm installa
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

Example: env_example.txt

## Settings

### Upload files limits
Default = 10

To change the limit, change the value that is passed to upload.array in the file routes/fileRouter.js
```
router.post('/', upload.array('files', 20), roleMiddleware("ADMIN"), FileController.upload); // changed limit to 20 files
```

### Role Validation
To change the role, change the value that is passed to roleMiddleware in the file routes/fileRouter.js 
```
router.post('/', upload.array('files', 10), roleMiddleware("MODERATOR"), FileController.upload); // changed role to "MODERATOR"
router.delete('/', roleMiddleware("ADMIN"), FileController.delete); // default role "ADMIN"
```
### Disabling Role Validation
If you don't need validation by role delete calling middleware (roleMiddleware("ADMIN")) from router
```
router.delete('/', FileController.delete); // without validation by role
router.delete('/', roleMiddleware("ADMIN"), FileController.delete); // default

```

# REST API
URL: http://localhost:5001/api/v1/file

To change path edit lines
```
app.use('/api/v1/', router) // index.js

router.use('/file', fileRouter) // routes/index.js
```

## Upload Files

### Method
``` POST```

### Request Headers:

Authorization:
```
Bearer ... // JWT must contain "role"
```

### Body (form-data):
```
folder // main folder
id // child folder, example: product id
files // files form-data
```

### Response:

Example: 
```
{
    "result": [
        "folder/1/test.jpg",
        "folder/1/test1.jpg"
    ] // Array of paths to files
}
```

## Delete Files

### Method
``` DELETE ```

### Request Headers:

Authorization:
```
Bearer ... // JWT must contain "role"
```

### Body:
```
fileKeys : [] // array of paths to files
```

### Response:

Example: 
```
{
    "result": [
        "folder/1/test.jpg deleted",
        "folder/1/test1.jpg deleted"
    ]
}
```
