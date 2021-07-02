"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.default = function (sequelize, DataTypes) {
   var Parcel = sequelize.define("Parcel", {
      name: DataTypes.STRING,
      state: DataTypes.STRING,
      district: DataTypes.STRING,
      lga: DataTypes.STRING,
      ward: DataTypes.STRING,
      address: DataTypes.STRING,
      property_id_no: DataTypes.STRING,
      block_no: DataTypes.STRING,
      plot_no: DataTypes.STRING,
      street_name: DataTypes.STRING,
      owner_name: DataTypes.STRING,
      owner_type: DataTypes.STRING,
      owner_geder: DataTypes.STRING,
      telephone1: DataTypes.STRING,
      telephone2: DataTypes.STRING,
      occupancy_type: DataTypes.STRING,
      any_buildings: DataTypes.STRING,
      main_use: DataTypes.STRING,
      parcel_fenced: DataTypes.STRING,
      size_in_m2: DataTypes.STRING,
      formal_document: DataTypes.STRING,
      informal_document: DataTypes.STRING,
      water: DataTypes.STRING,
      sewerage: DataTypes.STRING,
      electricity: DataTypes.STRING,
      street_lights: DataTypes.STRING,
      waste_disposal: DataTypes.STRING,
      shape_length: DataTypes.STRING,
      shape_area: DataTypes.STRING
   });

   return Parcel;
};