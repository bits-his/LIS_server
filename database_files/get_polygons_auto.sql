-- FUNCTION: public.__get_polygons(character varying, character varying, character varying, character varying)

-- DROP FUNCTION public.__get_polygons(character varying, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.__get_polygons(
	in_query_type character varying,
	in_file_type character varying,
	in_parcel_id character varying,
	in_structure_id character varying)
    RETURNS TABLE(data json) 
    LANGUAGE 'plpgsql'
    COST 10000
    VOLATILE PARALLEL UNSAFE
    ROWS 100000

AS $BODY$
DECLARE 
max_data INT;
min_data INT;
BEGIN
			SET statement_timeout TO 2000000;
			
			-- SELECT COUNT(geom) AS parcels_count FROM parcels ;
			-- IF parcels_count >0 THEN
			--	max_data := (parcels_count/3);
			--   END IF;
			
	IF in_file_type ='parcel' OR in_file_type ='parcel1' OR in_file_type ='parcel2' OR in_file_type ='parcel3' OR in_file_type ='parcel4' THEN 
		IF in_query_type ='map' AND in_parcel_id != ''  AND in_parcel_id != 'undefined' THEN 
			return query select json_build_object(
				'type', 'FeatureCollection',
				'features', json_agg(ST_AsGeoJSON(kn.*)::json)
			) from  public.parcels as kn where kn.id=in_parcel_id::integer;
    ELSIF in_query_type ='maps' THEN 
			IF in_file_type ='parcel' THEN
        min_data = 0;
        max_data = 50000;
      ELSIF in_file_type ='parcel1'  THEN
        min_data = 50000;
        max_data = 100000; 
      ELSIF in_file_type ='parcel2'  THEN
        min_data = 100000;
        max_data = 150000;
      ELSIF in_file_type ='parcel3'  THEN
        min_data = 150000;
        max_data = 200000;
      ELSIF in_file_type ='parcel4'  THEN
        min_data = 200000;
        max_data = 250000;
      ELSIF in_file_type ='parcel5'  THEN
        min_data = 250000;
        max_data = 300000;
      END IF;
      return query SELECT json_build_object(
        'type', 'FeatureCollection',
        'crs',  json_build_object(
            'type',      'name', 
            'properties', json_build_object(
                'name', 'EPSG:4326'  
            )
          ), 
          'features', json_agg(
              json_build_object(
                  'type',       'Feature',
                  'id',         id, -- the GeoJson spec includes an 'id' field, but it is optional, replace id with your id field
                  'geometry',   ST_AsGeoJSON(geom)::json,
                  'properties', json_build_object(
                    -- list of fields
                    'owner_name', owner_name,
                    'owner_gender', owner_gender,
                    'telephone1',telephone1,
                    'lga', lga,
                    'district',district,
                    'ward',ward,
                    'address',address,
                    'main_use',main_use,
                    'street_name',street_name
                  )
              )
          )
        )
        FROM  public.parcels kn WHERE kn.id > min_data AND  kn.id <= max_data AND  kn.geom is not null ;
			END IF;
   	ELSIF in_file_type ='structure'  THEN 
   		IF in_query_type ='map' AND in_structure_id != 'undefined'  AND in_structure_id != ''  THEN 
			return query select json_build_object(
				'type', 'FeatureCollection',
				'features', json_agg(ST_AsGeoJSON(kn.*)::json)
			) from  public.structures as kn where kn.structure_id=in_structure_id::integer;
		
    	ELSIF in_query_type ='maps' THEN 
        IF in_file_type ='structure' OR in_file_type ='structure' THEN 
        IF in_file_type ='structure' THEN
          min_data = 0;
          max_data = 50000;
        ELSIF in_file_type ='structure1'  THEN
          min_data = 50000;
          max_data = 100000; 
        END IF;
	    	return query select json_build_object(
				'type', 'FeatureCollection',
				'features', json_agg(ST_AsGeoJSON(st.*)::json)
			)  FROM public.structures kn WHERE kn.id > min_data AND  kn.id <= max_data AND kn.geom is not null;
   		END IF;
   	END IF;
END;
$BODY$;

ALTER FUNCTION public.__get_polygons(character varying, character varying, character varying, character varying)
    OWNER TO postgres;
