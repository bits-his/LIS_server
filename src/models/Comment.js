export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Comment",
    {
      ApplicationId: DataTypes.INTEGER,
      tag_no: DataTypes.STRING,
      remark: DataTypes.STRING,
      comment: DataTypes.STRING,
      forward_to: DataTypes.STRING,
      forward_by: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    { timeStamps: false }
  );

  return Role;
};
