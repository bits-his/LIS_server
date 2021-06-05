export default (sequelize, DataTypes) => {
    const SurveyReport = sequelize.define("SurveyReport", {
      code_land: DataTypes.STRING,
      staff_name: DataTypes.STRING,
      staff_rank: DataTypes.STRING,
      staff_signature: DataTypes.STRING,
      beacons_number: DataTypes.STRING,
      cadastral_sign: DataTypes.STRING,
      cadastral_date: DataTypes.STRING,
      commissioner_sign: DataTypes.STRING,
      commissioner_date: DataTypes.STRING,
    });
  
    SurveyReport.associate = function (models) {
      // associations go here
    };
  
    return SurveyReport;
  };
  