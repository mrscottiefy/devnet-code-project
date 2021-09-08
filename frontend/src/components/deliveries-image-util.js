const fs = require('fs');
const AWS = require('aws-sdk');

const bucketName = 'grab-project-scott-db-files';
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// const localFilePath = 'D:\\Desktop\\grabpoc\\grab-home.jpg';
// let s3objectName = makeFileName(10).toString() + ".jpg";

const uploadFile = ({localFilePath,newObjectName}) => {
    fs.readFile(localFilePath, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: bucketName,
            Key: newObjectName,
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function (s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });

    });
};

const makeFileName = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// console.log(makeFileName(5));
// uploadFile({
//     'localFilePath' : 'D:\\Desktop\\grabpoc\\grab-home.jpg',
//     'newObjectName' : 'BShHAKKKKjjffff.jpg'
// });

module.exports = { uploadFile, makeFileName };