export default (sequelize, DataTypes) => {
    const RegistryFile = sequelize.define('RegistryFile', {
        Acknolegment_id: DataTypes.STRING,
        registry_date: DataTypes.STRING,
        tag_no: DataTypes.STRING,	
        file_from: DataTypes.STRING,
        file_to: DataTypes.STRING,
        attach_url: DataTypes.STRING,
        remarks: DataTypes.STRING,
        inserted_by: DataTypes.STRING,
        status: DataTypes.INTEGER,
    });

    RegistryFile.associate = function (models) {
        // associations go here
    };

    return RegistryFile;
};
