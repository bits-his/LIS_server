export default (sequelize, DataTypes) => {
    const Role = sequelize.define('Remark', {
      applicationId:DataTypes.INTEGER ,
      tag_no:DataTypes.STRING,
      remark: DataTypes.STRING,
      remark_to: DataTypes.STRING,
      remark_by: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    }, {timeStamps:false});
    
    return Role;
  };
  