"use strict";

Object.defineProperty(exports, "__esModule", {
			value: true
});

exports.default = function (sequelize, DataTypes) {
			var Occupant = sequelize.define("Occupant", {
						occupant_id: DataTypes.STRING,
						floor_area_m2: DataTypes.STRING,
						name_of_occupant: DataTypes.STRING,
						type_of_occupant: DataTypes.STRING,
						use_type_of_unit: DataTypes.STRING,
						occupier_is_owner: DataTypes.STRING,
						owner_details: DataTypes.STRING,
						tel_mobile: DataTypes.STRING,
						tel_home: DataTypes.STRING,
						parcels_id: DataTypes.STRING,
						structure_id: DataTypes.STRING
			});

			return Occupant;
};