const { S3 } = require('aws-sdk');
const mime = require('mime');
const crypto = require('crypto');
const path = require('path')
const { createWriteStream } = require("fs");
const { UserInputError } = require('apollo-server-express');

const isImage = filename => {
    var ext = path.extname(filename);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return false;
    }
    return true;
}

const S3_Client = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
    params: { Bucket: process.env.S3_BUCKET },
});

const uploadToS3 = async file =>{
    if(process.env.S3_ENABLED==="yes"){
        try{
            const { createReadStream, filename, mimetype, encoding } = await file;
            if(!isImage(filename)){
                throw new UserInputError('Only .jpg .png .gif are allowed');
            }
            const response = await S3_Client
            .upload({
              Key: filename,
              ACL: 'public-read',
              Body: await createReadStream()
            })
            .promise()
        
          return {
            name: filename,
            url: response.Location
          }
        } catch(error){
            throw error;
        }
    } else {
        return await uploadToDisk(file);
    }
}

const uploadToDisk = async (file) => {
    try{
        const { createReadStream, filename, mimetype, encoding } = await file;
        if(!isImage(filename)){
            throw new UserInputError('Only .jpg .png .gif are allowed');
        }
        const uniqueString = crypto.randomBytes(16).toString('hex');
        const url = path.join("uploads/", uniqueString + Date.now() + '.' + mime.getExtension(mimetype));
        await new Promise((res) =>
        createReadStream()
            .pipe(
            createWriteStream(
                path.join(__dirname ,"./../../","public",url)
            )
            )
            .on("close", res)
        );
        return { 
            filename,
            url
        }
    } catch(error){
        throw error;
    }
}


module.exports = {
    uploadToS3,
    uploadToDisk
}