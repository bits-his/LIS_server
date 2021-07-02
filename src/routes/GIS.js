import passport from "passport";
import config from "../config/config";
const veryfyJwt = passport.authenticate("jwt", { session: false });

const {api} = config;
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
} from "../controllers/GIS";

module.exports = (app) => {
  app.post(`${api}/parcel`,parcelQueries);
  app.post(`${api}/occupant`,occupantQueries);
  app.post(`${api}/structure`,structureQueries);
  app.post(`${api}/post/get-polygons`,getPolygons);
  app.post(`${api}/post/save-polygon`, savePolygon);
  app.get(`${api}/get/parcels/:query_type/:id`,getParcels);
  app.get(`${api}/get/occupants/:query_type/:id`,getOccupants);
  app.get(`${api}/get/structures/:query_type/:id`,getStructures);
  app.get(`${api}/get/summary-report/:query_type?`,veryfyJwt, getSummaryReport);
}