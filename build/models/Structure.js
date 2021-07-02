"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

exports.default = function (sequelize, DataTypes) {
        var Structure = sequelize.define("Structure", {
                structure_id: DataTypes.STRING,
                finished: DataTypes.STRING,
                year_completed: DataTypes.STRING,
                level_of_completion: DataTypes.STRING,
                main_use: DataTypes.STRING,
                residential_type: DataTypes.STRING,
                wall_material: DataTypes.STRING,
                roof_covering: DataTypes.STRING,
                roof_type: DataTypes.STRING,
                no_floors: DataTypes.STRING,
                no_of_occupants: DataTypes.STRING,
                property_id_no: DataTypes.STRING,
                parcel_id: DataTypes.STRING,
                shape_length: DataTypes.STRING,
                shape_area: DataTypes.STRING
        });

        return Structure;
};