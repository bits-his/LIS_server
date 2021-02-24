export default (sequelize, DataTypes) => {
    const Role = sequelize.define('Remark', {
      application_id:DataTypes.STRING ,
      tag_no:DataTypes.STRING,
      remark: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      createdAt: DataTypes.STRING,
      updatedAt: DataTypes.STRING,
    }, {timeStamps:false});
    
    return Role;
  };
  