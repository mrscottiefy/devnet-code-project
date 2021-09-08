const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const config = require('../config');
var params = config.parameters;

const s3 = new AWS.S3({
    accessKeyId: params.s3AccessKey,
    secretAccessKey: params.s3SecretAccessKey
});

const insertDelivery = async (data) => {
    console.log({ data });
    try {
        axios.defaults.baseURL = params.apiDeliveryUrl;
        const response = await axios.post('/insert', data);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const retrieveAllDeliveries = async () => {
    // console.log(`retrieveAllDeliveries Called, calling ${params.apiDeliveryUrl}`);
    try {
        axios.defaults.baseURL = params.apiDeliveryUrl;
        const response = await axios.get('/');
        // console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return {"error":"could not get response"};
    }
}


const uploadFile = ({localFilePath,newObjectName}) => {
    fs.readFile(localFilePath, (err, data) => {
        if (err) throw err;
        const s3bucketParams = {
            Bucket: params.s3Bucket,
            Key: newObjectName,
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(s3bucketParams, function (s3Err, data) {
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

module.exports = { uploadFile, makeFileName, insertDelivery, retrieveAllDeliveries };