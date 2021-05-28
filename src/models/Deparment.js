export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
   department_date:DataTypes.STRING ,
   department_code:DataTypes.STRING,
   description: DataTypes.STRING,
   location: DataTypes.STRING ,
  });

  Department.associate = function (models) {
      // associations go here
  };

  return Department;
};
