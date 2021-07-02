"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _config = require("../config/config");

var _config2 = _interopRequireDefault(_config);

var _GIS = require("../controllers/GIS");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var veryfyJwt = _passport2.default.authenticate("jwt", { session: false });

var api = _config2.default.api;


module.exports = function (app) {
  app.post(api + "/parcel", _GIS.parcelQueries);
  app.post(api + "/occupant", _GIS.occupantQueries);
  app.post(api + "/structure", _GIS.structureQueries);
  app.post(api + "/post/get-polygons", _GIS.getPolygons);
  app.post(api + "/post/save-polygon", _GIS.savePolygon);
  app.get(api + "/get/parcels/:query_type/:id", _GIS.getParcels);
  app.get(api + "/get/occupants/:query_type/:id", _GIS.getOccupants);
  app.get(api + "/get/structures/:query_type/:id", _GIS.getStructures);
  app.get(api + "/get/summary-report/:query_type?", veryfyJwt, _GIS.getSummaryReport);
};