import db from "../models";
export const occupantQueries = (req, res) => {
  const { query_type, floor_area_m2, name_of_occupant, type_of_occupant, use_type_of_unit, occupier_is_owner, owner_details, tel_mobile, tel_home, parcel_id, structure_id } = req.body;
  db.sequelize.query
    (`SELECT * FROM  public.occupant_insert('${query_type}','${floor_area_m2}','${name_of_occupant}','${type_of_occupant}','${use_type_of_unit}','${occupier_is_owner}','${owner_details}','${tel_mobile}','${tel_home}','${structure_id}','${parcel_id}')`)
    .then((results) => res.json({ success: true, id: results[0][0].occupant_insert }))
    .catch((error) => res.status(500).json({ success: false, error }));
};
export const getOccupants = (req, res) => {
  const { query_type, id } = req.params;
  db.sequelize.query(`SELECT * FROM public.get_occupants ('${query_type}','${id}')`)
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const parcelQueries = (req, res) => {
  let sql = ''
  if(req.body.parcels && req.body.parcels.length){
    sql = `INSERT into public.parcels (state,district,lga,ward,address,property_id_no,block_no,plot_no,street_name,owner_name,owner_type,owner_gender,telephone1,telephone2,type_of_occupier,any_buildings,main_use,parcel_fenced,size_in_m2,doc_type,water,sewerages,electricity,street_lights,waste_disposal,geom)`
  const {parcels} = req.body
  for (let i=0; i<parcels.length; i++){
    let d = parcels[i];
  sql+=` VALUES('${d.state}','${d.district}','${d.lga}','${d.ward}','${d.address}','${d.property_id_no}','${d.block_no}','${d.plot_no}','${d.street_name}','${d.owner_name}','${d.owner_type}','${d.owner_geder}','${d.telephone1}','${d.telephone2}','${d.occupancy_type}','${d.any_buildings}','${d.main_use}','${d.parcel_fenced}','${d.size_in_m2}','${d.doc_type}','${d.water}','${d.sewerage}','${d.electricity}','${d.street_lights}','${d.waste_disposal}',ST_GeomFromText('POLYGON((${d.geom}))') )` 
  if((parcels.length-1)===i){sql+=';'}else{sql+=','}
  }
  }else{
    let {query_type, state, district, lga, ward, address, property_id_no, block_no, plot_no, street_name, owner_name, owner_type, owner_geder, telephone1, telephone2, occupancy_type, any_buildings, main_use, parcel_fenced, size_in_m2, doc_type, water, sewerage, electricity, street_lights, waste_disposal, shape_length, shape_area, geom='', id='' } = req.body;
  
  sql =`SELECT * FROM public.__parcel_insert ('${query_type}','${state}','${district.replace(/'/g,'’')}','${lga}','${ward.replace(/'/g,'’')}','${address.replace(/'/g,'’')}','${property_id_no}','${block_no}','${plot_no}','${street_name.replace(/'/g,'’')}','${owner_name.replace(/'/g,'’')}','${owner_type}','${owner_geder}','${telephone1}','${telephone2}','${occupancy_type}','${any_buildings}','${main_use}','${parcel_fenced}','${size_in_m2}','${doc_type}','${water}','${sewerage}','${electricity}','${street_lights}','${waste_disposal}','${geom}','${id}')`
  }
  // res.status(200).json({sql})
  db.sequelize.query(sql)
    .then((results) => {
      const id = results[0][0].parcel_insert > 0 ? results[0][0].parcel_insert : 0;
      // res.json({ success: true, id:rid })
      if (id > 0 && geom.length > 10) {
        console.log(`SELECT * FROM  public.polygon_queries('${query_type}','parcel','${id}','0','','${geom}')`)
        db.sequelize.query(`SELECT * FROM  public.polygon_queries('${query_type}','parcel','${id}','0','${geom}')`)
          .then((resultsx) => res.json({ success: true, data: resultsx[0],id }))
          .catch((error) => console.log({ success: false, error }));
      }else{
        res.json({ success: true, id })
      }
    })
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getParcels = (req, res) => {
  const { query_type, id } = req.params;
  db.sequelize.query(`SELECT * FROM public.get_parcels('${query_type}','${id}')`)
    // ,{replacements: {id,query_type}  })
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const structureQueries = (req, res) => {
  const { query_type, finished, level_of_completion, year_completed, main_use, residential_type, wall_material, roof_covering, roof_type, no_floors, no_of_occupants, property_id_no = '', parcel_id = '', geom='', shape_length, shape_area, parent_id = '', id = '' } = req.body;
  db.sequelize.query(`SELECT * FROM public.__structure_insert(:query_type,:finished,:level_of_completion,:year_completed,:main_use,:residential_type,:wall_material,:roof_covering,:roof_type,:no_floors,:no_of_occupants,:property_id_no,:parcel_id,:shape_length,:shape_area,:parent_id,:id,:geom);`,
    { replacements: { query_type, finished, level_of_completion, year_completed, main_use, residential_type, wall_material, roof_covering, roof_type, no_floors, no_of_occupants, property_id_no: property_id_no?property_id_no.toString():'', parcel_id: parcel_id?parcel_id.toString():'', shape_length, shape_area, parent_id:parent_id?parent_id.toString():'', id,geom } })
    .then((results) => res.json({ success: true, results: results[0][0].structure_insert }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getStructures = (req, res) => {
  const { query_type, id } = req.params;
  db.sequelize.query(`SELECT * FROM public.__get_structures ('${query_type}','${id}')`)
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};
export const savePolygon = (req, res) => {
  let { query_type, file_type, id, polygon='', structure_id='', parent_id='' } = req.body;
    db.sequelize.query(`SELECT * FROM  public.__polygon_queries('${query_type}','${file_type}','${id}','${structure_id}','${polygon}')`)
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getPolygons = (req, res) => {
  const { query_type, file_type, parcel_id = '', structure_id = '' } = req.body;
  db.sequelize.query(`select * from public.get_polygons('${query_type}','${file_type}','${parcel_id}','${structure_id}')`)
    .then((results) => {
      console.log(results)
      res.json({ success: true, row_to_json: results[0][0] })
    })
    .catch((error) => res.status(500).json({ success: false, error }));
};
//'get/summary-report'
export const getSummaryReport = (req, res) => {
  const { query_type } = req.params;
  console.log({ query_type })
  let sql = `select * from public.summary_report`
  if (query_type === 'wards') {
    sql = `select * from public.summary_report2`
  }
  db.sequelize.query(sql)
    .then((results) => res.json({ success: true, data: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};
