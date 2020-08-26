require('dotenv').config
const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name: 'drxkp1erj',
    api_key: '218187136849528',
    api_secret: 'dF879L426Z38DnkBvSKuG_IcSCo',
  });

  module.exports ={cloudinary};