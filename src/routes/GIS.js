import passport from "passport";
const veryfyJwt = passport.authenticate("jwt", { session: false });
import {
  structureQueries,
  occupantQueries,
  parcelQueries,

} from "../controllers/GIS";
  const api = `/api/v1/gis`

module.exports = (app) => {
  app.post(`${api}/structure`,veryfyJwt,structureQueries);
  app.post(`${api}/parcel`,veryfyJwt,parcelQueries);
  app.post(`${api}/occupant`,veryfyJwt,occupantQueries);
}