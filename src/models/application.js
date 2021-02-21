export default (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        name: DataTypes.STRING,
        application_date: DataTypes.STRING,
        form_no	: DataTypes.STRING,
        type	: DataTypes.STRING,
        name	: DataTypes.STRING,
        amount	: DataTypes.STRING,
        address	: DataTypes.STRING,
        phone	: DataTypes.STRING,
        other_info: DataTypes.STRING,	
        info: DataTypes.STRING,
        tp_no: DataTypes.STRING,	
        image_id: DataTypes.STRING,
        file_no	: DataTypes.STRING,
        amount_paid: DataTypes.STRING,	
        reciept_no	: DataTypes.STRING,
        stage	: DataTypes.INTEGER,
        status: DataTypes.STRING,
        forward_to: DataTypes.STRING,	
        email	: DataTypes.STRING,
        commissioning: DataTypes.STRING,	
        forward_by: DataTypes.STRING,
    });

    Application.associate = function (models) {
        // associations go here
    };

    return Application;
};
