export default (sequelize, DataTypes) => {
  const Remark = sequelize.define(
    "Remark",
    { remark: DataTypes.STRING, 
      remark_to: DataTypes.STRING, 
      remark_by: DataTypes.STRING 
    },

    { define: { timeStamps: false } }
  );

  return Remark;
};
