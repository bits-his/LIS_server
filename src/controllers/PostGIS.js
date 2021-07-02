var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine

/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "postgres" // sandbox username
var password = "dangana2020" // read only privileges on our table
var host = "localhost:5432"
var database = "kano_gis" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection

// Set up your database query to display GeoJSON

/* GET home page. */
export const getParcelMap = (req, res)=> {
    const {query_type,id} = req.params;
    let sql = `select json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(kn.*)::json) ) from  public.gis_kn as kn where oid=${id}`;

    if(query_type==='maps'){
        sql = `SELECT row_to_json(fc)
        FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
        FROM (SELECT 'Feature' As type
        , ST_AsGeoJSON(lg.geom)::json As geometry
        , row_to_json((lg.oid, lg.lga)) As properties
        FROM public.gis_kn  As lg ) As f ) As fc;
        `
        // "select json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(kn.*)::json) ) from  public.gis_kn as kn where id <10000";
    }
    
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sql));
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        // console.log({result:JSON.stringify(result.rows[0].json_build_object)})
        res.json(JSON.parse(JSON.stringify(result.rows[0])));
        res.end();
    });
};