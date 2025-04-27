const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARYAPIKEY,
    api_secret:process.env.CLOUDINARYAPISECRET
})

const storage = new CloudinaryStorage({
cloudinary: cloudinary,
params: {
    folder: 'CarePoint',
    allowedFormats: ['jpg','png','jpeg','gif'] // supports promises as well
  
},
});

module.exports = {
    cloudinary,storage
}