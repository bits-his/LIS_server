export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
   code:DataTypes.STRING,
   name: DataTypes.STRING,
   location: DataTypes.STRING ,
  });
  return Department;
};
