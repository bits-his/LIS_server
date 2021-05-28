export default (sequelize, DataTypes) => {
  const Remark = sequelize.define(
    "Remark",
    { remark: DataTypes.STRING, forward_to: DataTypes.BOOLEAN },

    { define: { timeStamps: false } }
  );

  return Remark;
};
