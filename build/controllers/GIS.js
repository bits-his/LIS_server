"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSummaryReport = exports.getPolygons = exports.savePolygon = exports.getStructures = exports.structureQueries = exports.getParcels = exports.parcelQueries = exports.getOccupants = exports.occupantQueries = undefined;

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var occupantQueries = exports.occupantQueries = function occupantQueries(req, res) {
  var _req$body = req.body,
      query_type = _req$body.query_type,
      occupant_id = _req$body.occupant_id,
      floor_area_m2 = _req$body.floor_area_m2,
      name_of_occupant = _req$body.name_of_occupant,
      type_of_occupant = _req$body.type_of_occupant,
      use_type_of_unit = _req$body.use_type_of_unit,
      occupier_is_owner = _req$body.occupier_is_owner,
      owner_details = _req$body.owner_details,
      tel_mobile = _req$body.tel_mobile,
      tel_home = _req$body.tel_home,
      parcel_id = _req$body.parcel_id,
      structure_id = _req$body.structure_id;

  _models2.default.sequelize.query("SELECT * FROM  public.occupant_insert('" + query_type + "','" + floor_area_m2 + "','" + name_of_occupant + "','" + type_of_occupant + "','" + use_type_of_unit + "','" + occupier_is_owner + "','" + owner_details + "','" + tel_mobile + "','" + tel_home + "','" + structure_id + "','" + parcel_id + "')").then(function (results) {
    return res.json({ success: true, id: results[0][0].occupant_insert });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};
var getOccupants = exports.getOccupants = function getOccupants(req, res) {
  var _req$params = req.params,
      query_type = _req$params.query_type,
      id = _req$params.id;

  _models2.default.sequelize.query("SELECT * FROM public.get_occupants ('" + query_type + "','" + id + "')").then(function (results) {
    return res.json({ success: true, data: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var parcelQueries = exports.parcelQueries = function parcelQueries(req, res) {
  var _req$body2 = req.body,
      query_type = _req$body2.query_type,
      state = _req$body2.state,
      district = _req$body2.district,
      lga = _req$body2.lga,
      ward = _req$body2.ward,
      address = _req$body2.address,
      property_id_no = _req$body2.property_id_no,
      block_no = _req$body2.block_no,
      plot_no = _req$body2.plot_no,
      street_name = _req$body2.street_name,
      owner_name = _req$body2.owner_name,
      owner_type = _req$body2.owner_type,
      owner_geder = _req$body2.owner_geder,
      telephone1 = _req$body2.telephone1,
      telephone2 = _req$body2.telephone2,
      occupancy_type = _req$body2.occupancy_type,
      any_buildings = _req$body2.any_buildings,
      main_use = _req$body2.main_use,
      parcel_fenced = _req$body2.parcel_fenced,
      size_in_m2 = _req$body2.size_in_m2,
      formal_document = _req$body2.formal_document,
      informal_document = _req$body2.informal_document,
      water = _req$body2.water,
      sewerage = _req$body2.sewerage,
      electricity = _req$body2.electricity,
      street_lights = _req$body2.street_lights,
      waste_disposal = _req$body2.waste_disposal,
      shape_length = _req$body2.shape_length,
      shape_area = _req$body2.shape_area;

  _models2.default.sequelize.query("SELECT * FROM public.parcel_insert (:query_type,:state,:district,:lga,:ward,:address,:property_id_no,:block_no,:plot_no,:street_name,:owner_name,:owner_type,:owner_geder,:telephone1,:telephone2,:occupancy_type,:any_buildings,:main_use,:parcel_fenced,:size_in_m2,:formal_document,:informal_document,:water,:sewerage,:electricity,:street_lights,:waste_disposal,:shape_length,:shape_area);", { replacements: {
      query_type: query_type, state: state, district: district, lga: lga, ward: ward, address: address, property_id_no: property_id_no, block_no: block_no, plot_no: plot_no, street_name: street_name, owner_name: owner_name, owner_type: owner_type, owner_geder: owner_geder, telephone1: telephone1, telephone2: telephone2, occupancy_type: occupancy_type, any_buildings: any_buildings, main_use: main_use, parcel_fenced: parcel_fenced, size_in_m2: size_in_m2, formal_document: formal_document, informal_document: informal_document, water: water, sewerage: sewerage, electricity: electricity, street_lights: street_lights, waste_disposal: waste_disposal, shape_length: shape_length, shape_area: shape_area } }).then(function (results) {
    return res.json({ success: true, id: results[0][0].parcel_insert });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getParcels = exports.getParcels = function getParcels(req, res) {
  var _req$params2 = req.params,
      query_type = _req$params2.query_type,
      id = _req$params2.id;

  var sql = "SELECT * FROM public.get_parcels('" + query_type + "','" + id + "')";
  if (query_type === 'map' || query_type == 'maps') {
    // sql ='SELECT * FROM public.get_parcel_map(:query_type,:id);'
    sql = "select  * from get_parcel_map('maps','${id}');";
  }
  _models2.default.sequelize.query(sql)
  // ,{replacements: {id,query_type}  })
  .then(function (results) {
    return res.json({ success: true, data: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var structureQueries = exports.structureQueries = function structureQueries(req, res) {
  var _req$body3 = req.body,
      query_type = _req$body3.query_type,
      finished = _req$body3.finished,
      level_of_completion = _req$body3.level_of_completion,
      year_completed = _req$body3.year_completed,
      main_use = _req$body3.main_use,
      residential_type = _req$body3.residential_type,
      wall_material = _req$body3.wall_material,
      roof_covering = _req$body3.roof_covering,
      roof_type = _req$body3.roof_type,
      no_floors = _req$body3.no_floors,
      no_of_occupants = _req$body3.no_of_occupants,
      property_id_no = _req$body3.property_id_no,
      parcel_id = _req$body3.parcel_id,
      shape_length = _req$body3.shape_length,
      shape_area = _req$body3.shape_area,
      parent_id = _req$body3.parent_id;

  parcel_id = parcel_id > 0 ? parcel_id.toString() : null;
  parent_id = parent_id ? parent_id.toString() : null;
  _models2.default.sequelize.query("SELECT * FROM public.structure_insert (:query_type,:finished,:level_of_completion,:year_completed,:main_use,:residential_type,:wall_material,:roof_covering,:roof_type,:no_floors,:no_of_occupants,:property_id_no,:parcel_id,:shape_length,:shape_area,:parent_id);", {
    replacements: { query_type: query_type, finished: finished, level_of_completion: level_of_completion, year_completed: year_completed, main_use: main_use, residential_type: residential_type, wall_material: wall_material, roof_covering: roof_covering, roof_type: roof_type, no_floors: no_floors, no_of_occupants: no_of_occupants, property_id_no: property_id_no, parcel_id: parcel_id, shape_length: shape_length, shape_area: shape_area, parent_id: parent_id }
  }).then(function (results) {
    return res.json({ success: true, results: results[0][0].structure_insert });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getStructures = exports.getStructures = function getStructures(req, res) {
  var _req$params3 = req.params,
      query_type = _req$params3.query_type,
      id = _req$params3.id;

  _models2.default.sequelize.query("SELECT * FROM public.get_structures ('" + query_type + "','" + id + "')").then(function (results) {
    return res.json({ success: true, data: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};
var savePolygon = exports.savePolygon = function savePolygon(req, res) {
  var _req$body4 = req.body,
      query_type = _req$body4.query_type,
      file_type = _req$body4.file_type,
      id = _req$body4.id,
      polygon = _req$body4.polygon,
      structure_id = _req$body4.structure_id,
      parent_id = _req$body4.parent_id;


  console.log({ POLYGON: "SELECT * FROM  public.polygon_queries('" + query_type + "','" + file_type + "','" + id + "','" + structure_id + "','" + (parent_id ? parent_id : "") + "','" + polygon + "')" });
  _models2.default.sequelize.query("SELECT * FROM  public.polygon_queries('" + query_type + "','" + file_type + "','" + id + "','" + structure_id + "','" + (parent_id ? parent_id : "") + "','" + polygon + "')").then(function (results) {
    return res.json({ success: true, data: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getPolygons = exports.getPolygons = function getPolygons(req, res) {
  var _req$body5 = req.body,
      query_type = _req$body5.query_type,
      file_type = _req$body5.file_type,
      parcel_id = _req$body5.parcel_id,
      structure_id = _req$body5.structure_id;

  _models2.default.sequelize.query("select * from public.get_polygons('" + query_type + "','" + file_type + "','" + parcel_id + "','" + structure_id + "')").then(function (results) {
    return res.json({ success: true, row_to_json: results[0][0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};
//'get/summary-report'
var getSummaryReport = exports.getSummaryReport = function getSummaryReport(req, res) {
  var query_type = req.params.query_type;

  console.log({ query_type: query_type });
  var sql = "select * from public.summary_report";
  if (query_type === 'wards') {
    sql = "select * from public.summary_report2";
  }
  _models2.default.sequelize.query(sql).then(function (results) {
    return res.json({ success: true, data: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};