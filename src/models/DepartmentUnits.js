export default (sequelize, DataTypes) => {
  const DepartmentUnits = sequelize.define('DepartmentUnits', {
   code:DataTypes.STRING,
   name: DataTypes.STRING,
   location: DataTypes.STRING ,
  });
  return DepartmentUnits;
};
