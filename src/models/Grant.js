export default (sequelize, DataTypes) => {
    const Grant = sequelize.define("Grant", {
      r_of_o_no: DataTypes.STRING,
      plot_no: DataTypes.STRING,
      plan_no: DataTypes.STRING,
      ground_rent: DataTypes.STRING,
      purpose: DataTypes.STRING,
      improvement_value: DataTypes.STRING,
      improvement_term: DataTypes.STRING,
      signed_by: DataTypes.STRING,
      signed_on: DataTypes.STRING,
      date_of_issue: DataTypes.STRING,
    });
  
    Grant.associate = function (models) {
      // associations go here
    };
  
    return Grant;
  };
  