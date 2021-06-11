import passport from "passport";
const veryfyJwt = passport.authenticate("jwt", { session: false });
import {
  getStructures,
  structureQueries,
  getOccupants,
  occupantQueries,
  getParcels,
  parcelQueries,

} from "../controllers/GIS";
  const api = `/api/v1/gis`

module.exports = (app) => {
  app.get(`${api}/get/structures/:query_type/:id`,getStructures);
  app.post(`${api}/structure`,structureQueries);
  app.get(`${api}/get/parcels/:query_type/:id`,getParcels);
  app.post(`${api}/parcel`,parcelQueries);
  app.get(`${api}/get/occupants/:query_type/:id`,getOccupants);
  app.post(`${api}/occupant`,occupantQueries);
}