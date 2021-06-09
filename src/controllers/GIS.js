import db from "../models";
import moment from "moment";

export const occupantQueries = (req, res) => {
  const {query_type,occupant_id,floor_area_m2,name_of_occupant,type_of_occupant,use_type_of_unit,occupier_is_owner,owner_details,tel_mobile,tel_home,parcels_id,structure_id} = req.body;
  db.sequelize.query(`CALL occupant_queries (:query_type,:occupant_id,:floor_area_m2,:name_of_occupant,:type_of_occupant,:use_type_of_unit,:occupier_is_owner,:owner_details,:tel_mobile,:tel_home,:parcels_id,:structure_id);`,
      {replacements: {	query_type,occupant_id,floor_area_m2,name_of_occupant,type_of_occupant,use_type_of_unit,occupier_is_owner,owner_details,tel_mobile,tel_home,parcels_id,structure_id}})
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const parcelQueries = (req, res) => {
    const {query_type,name,state,district,lga,ward,address,property_id_no,block_no,plot_no,street_name,owner_name,owner_type,owner_geder,telephone1,telephone2,occupancy_type,any_buildings,main_use,parcel_fenced,size_in_m2,formal_document,informal_document,water,sewerage,electricity,street_lights,waste_disposal,shape_length,shape_area} = req.body;
    db.sequelize.query(`CALL parcel_queries (:query_type,:name,:state,:district,:lga,:ward,:address,:property_id_no,:block_no,:plot_no,:street_name,:owner_name,:owner_type,:owner_geder,:telephone1,:telephone2,:occupancy_type,:any_buildings,:main_use,:parcel_fenced,:size_in_m2,:formal_document,:informal_document,:water,:sewerage,:electricity,:street_lights,:waste_disposal,:shape_length,:shape_area);`,
        {replacements: {
            query_type,name,state,district,lga,ward,address,property_id_no,block_no,plot_no,street_name,owner_name,owner_type,owner_geder,telephone1,telephone2,occupancy_type,any_buildings,main_use,parcel_fenced,size_in_m2,formal_document,informal_document,water,sewerage,electricity,street_lights,waste_disposal,shape_length,shape_area}})
      .then((results) => res.json({ success: true, results: results[0] }))
      .catch((error) => res.status(500).json({ success: false, error }));
  };

  export const structureQueries = (req, res) => {
    const {

        query_type,structure_id,finished,level_of_completion,year_completed,main_use,residential_type,wall_material,roof_covering,roof_type,no_floors,no_of_occupants,property_id_no,parcel_id,shape_length,shape_area} = req.body;
    db.sequelize.query(`CALL structure_queries (:query_type,:structure_id,:finished,:level_of_completion,:year_completed,:main_use,:residential_type,:wall_material,:roof_covering,:roof_type,:no_floors,:no_of_occupants,:property_id_no,:parcel_id,:shape_length,:shape_area);`,
        {replacements: {query_type,structure_id,finished,level_of_completion,year_completed,main_use,residential_type,wall_material,roof_covering,roof_type,no_floors,no_of_occupants,property_id_no,parcel_id,shape_length,shape_area}})
      .then((results) => res.json({ success: true, results: results[0] }))
      .catch((error) => res.status(500).json({ success: false, error }));
  };
  

