export default (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
     code:DataTypes.STRING ,
     title:DataTypes.STRING,
     permissions: DataTypes.STRING,
     status: DataTypes.BOOLEAN ,
    });
  
    Role.associate = function (models) {
        // associations go here
    };
  
    return Role;
  };
  