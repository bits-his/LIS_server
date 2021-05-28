export default (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image_url:DataTypes.STRING ,

  });

  return Image;
};
  