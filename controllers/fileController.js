const s3 = require("../config/s3-config")

class FileController {
    async upload(req, res) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).send('No files uploaded.');
            }
            const uploadPromises = req.files.map(async (file) => {
                const params = {
                    Bucket: process.env.S3_BUCKET,
                    Key: `${req.body.folder}/${req.body.id}/${file.originalname}`,
                    ACL: 'public-read',
                    Body: file.buffer
                }
                const data = await s3.upload(params).promise()
                return data.key
            })
            const result = await Promise.all(uploadPromises);
            return res.status(200).json({result})
        } catch (err) {
            console.error('Error uploading to S3:', err);
            return res.status(500).send('Error uploading to S3.');
        }
    }

    async delete(req, res) {
        try {
            const { fileKeys } = req.body;
            if (!fileKeys || !Array.isArray(fileKeys) || fileKeys.length === 0) {
                return res.status(400).send('Invalid or empty file array.');
            }

            const deletePromise = fileKeys.map(async (file) => {
                const params = {
                    Bucket: process.env.S3_BUCKET,
                    Key: file,
                };
                try {
                    await s3.headObject(params).promise();
                    await s3.deleteObject(params).promise();
                    console.log('File deleted successfully:');
                    return `${file} deleted`
                } catch (error) {
                    return `${file} not found`
                }
            })

            const result = await Promise.all(deletePromise);

            console.log('Files deleted successfully:', result);
            return res.status(200).json({ result });
        } catch (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Error deleting file.');
        }
    }
}

module.exports = new FileController();