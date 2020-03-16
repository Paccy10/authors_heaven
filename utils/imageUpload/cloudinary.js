import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploader = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file,
            { resource_type: 'auto', folder },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ url: result.url });
                }
            }
        );
    });
};

export default uploader;
