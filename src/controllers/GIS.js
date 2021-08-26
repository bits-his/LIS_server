import db from "../models";
export const occupantQueries = (req, res) => {
  const {query_type,floor_area_m2,name_of_occupant,type_of_occupant,use_type_of_unit,occupier_is_owner,owner_details,tel_mobile,tel_home,parcel_id,structure_id} = req.body;
  db.sequelize.query
  (`SELECT * FROM  public.occupant_insert('${query_type}','${floor_area_m2}','${name_of_occupant}','${type_of_occupant}','${use_type_of_unit}','${occupier_is_owner}','${owner_details}','${tel_mobile}','${tel_home}','${structure_id}','${parcel_id}')`)
    .then((results) => res.json({ success: true, id: results[0][0].occupant_insert }))
    .catch((error) => res.status(500).json({ success: false, error }));
};
export const getOccupants = (req, res) => {
    const {query_type,id} = req.params;
    db.sequelize.query(`SELECT * FROM public.get_occupants ('${query_type}','${id}')`)
      .then((results) => res.json({ success: true, data: results[0] }))
      .catch((error) => res.status(500).json({ success: false, error }));
};

export const parcelQueries = (req, res) => {
  const {query_type,state,district,lga,ward,address,property_id_no,block_no,plot_no,street_name,owner_name,owner_type,owner_geder,telephone1,telephone2,occupancy_type,any_buildings,main_use,parcel_fenced,size_in_m2,doc_type,water,sewerage,electricity,street_lights,waste_disposal,shape_length,shape_area,geom} = req.body;
  db.sequelize.query(`SELECT * FROM public.parcel_insert ('${query_type}','${state}','${district}','${lga}','${ward}','${address}','${property_id_no}','${block_no}','${plot_no}','${street_name}','${owner_name}','${owner_type}','${owner_geder}','${telephone1}','${telephone2}','${occupancy_type}','${any_buildings}','${main_use}','${parcel_fenced}','${size_in_m2}','${doc_type}','${water}','${sewerage}','${electricity}','${street_lights}','${waste_disposal}','${shape_length}','${shape_area}')`)
  .then((results) =>{
    const id =  results[0][0].parcel_insert>0?results[0][0].parcel_insert:0;
     res.json({ success: true, id })
    if(id>0 && geom.length>20){
      db.sequelize.query(`SELECT * FROM  public.polygon_queries('${query_type}','parcel','${id}','0','','${geom}')`)
    .then((results) => console.log({ success: true, data: results[0] }))
    .catch((error) => console.log({ success: false, error }));
    }
  })
  .catch((error) => res.status(500).json({ success: false, error }));
  };

export const getParcels = (req, res) => {
  const {query_type,id} = req.params;
  db.sequelize.query(`SELECT * FROM public.get_parcels('${query_type}','${id}')`)
    // ,{replacements: {id,query_type}  })
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};
  
export const structureQueries = (req, res) => {
  let {query_type,finished,level_of_completion,year_completed,main_use,residential_type,wall_material,roof_covering,roof_type,no_floors,no_of_occupants,property_id_no,parcel_id,shape_length,shape_area,parent_id} = req.body;
  parcel_id = parcel_id>0?parcel_id.toString():null;
  parent_id= parent_id?parent_id.toString():null
  db.sequelize.query(`SELECT * FROM public.structure_insert (:query_type,:finished,:level_of_completion,:year_completed,:main_use,:residential_type,:wall_material,:roof_covering,:roof_type,:no_floors,:no_of_occupants,:property_id_no,:parcel_id,:shape_length,:shape_area,:parent_id);`,
  {
    replacements:{query_type,finished,level_of_completion,year_completed,main_use,residential_type,wall_material,roof_covering,roof_type,no_floors,no_of_occupants,property_id_no,parcel_id,shape_length,shape_area,parent_id}
  })
    .then((results) => res.json({ success: true, results: results[0][0].structure_insert}))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getStructures = (req, res) => {
  const {query_type,id} = req.params;
  db.sequelize.query(`SELECT * FROM public.get_structures ('${query_type}','${id}')`)
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};
export const savePolygon = (req, res) => {
  let  {query_type,file_type,id,polygon,structure_id,parent_id} = req.body;

  console.log({POLYGON:`SELECT * FROM  public.polygon_queries('${query_type}','${file_type}','${id}','${structure_id}','${parent_id?parent_id:``}','${polygon}')`})
  db.sequelize.query(`SELECT * FROM  public.polygon_queries('${query_type}','${file_type}','${id}','${structure_id}','${parent_id?parent_id:``}','${polygon}')`)
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
  };

export const getPolygons = (req, res)=> {
  const {query_type,file_type,parcel_id,structure_id} = req.body;
  db.sequelize.query(`select * from public.get_polygons('${query_type}','${file_type}','${parcel_id}','${structure_id}')`) 
  .then((results) => res.json({ success: true, row_to_json: results[0][0]}))
  .catch((error) => res.status(500).json({ success: false, error }));
};
//'get/summary-report'
export const getSummaryReport = (req, res)=> {
  const {query_type} = req.params;
  console.log({query_type})
  let sql = `select * from public.summary_report`
  if(query_type==='wards'){
    sql = `select * from public.summary_report2`
  }
  db.sequelize.query(sql) 
  .then((results) => res.json({ success: true, data: results[0]}))
  .catch((error) => res.status(500).json({ success: false, error }));
};
