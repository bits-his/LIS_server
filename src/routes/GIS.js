import passport from "passport";
import config from "../config/config";
const veryfyJwt = passport.authenticate("jwt", { session: false });

const { api } = config;
import {
  getParcels,
  savePolygon,
  getPolygons,
  getOccupants,
  getStructures,
  parcelQueries,
  occupantQueries,
  structureQueries,
  getSummaryReport,
  getApiPolygons,
  getApiParcels,
  apiSummaryReport,
  // getApiParcels,
} from "../controllers/GIS";

module.exports = (app) => {
  app.post(`${api}/parcel`, parcelQueries);
  app.post(`${api}/occupant`, occupantQueries);
  app.post(`${api}/structure`, structureQueries);
  app.post(`${api}/post/get-polygons`, getPolygons);
  app.post(`${api}/post/save-polygon`, savePolygon);
  app.get(`${api}/get/parcels/:query_type/:id`, getParcels);
  app.get(`${api}/get/occupants/:query_type/:id`, getOccupants);
  app.get(`${api}/get/structures/:query_type/:id`, getStructures);
  app.get(
    `${api}/get/summary-report/:query_type?`,
    veryfyJwt,
    getSummaryReport
  );
  app.get(`${api}/get-summary-report`, veryfyJwt, apiSummaryReport);
  app.get(`${api}/get-polygons`, veryfyJwt, getApiPolygons);
  app.get(`${api}/get-parcels`, veryfyJwt, getApiParcels);
};
