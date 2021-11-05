-- FUNCTION: public.__parcel_insert(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)

-- DROP FUNCTION public.__parcel_insert(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.__parcel_insert(
	in_query_type character varying,
	in_state character varying,
	in_district character varying,
	in_lga character varying,
	in_ward character varying,
	in_address character varying,
	in_property_id_no character varying,
	in_block_no character varying,
	in_plot_no character varying,
	in_street_name character varying,
	in_owner_name character varying,
	in_owner_type character varying,
	in_owner_geder character varying,
	in_telephone1 character varying,
	in_telephone2 character varying,
	in_occupancy_type character varying,
	in_any_buildings character varying,
	in_main_use character varying,
	in_parcel_fenced character varying,
	in_size_in_m2 character varying,
	in_doc_type character varying,
	in_water character varying,
	in_sewerage character varying,
	in_electricity character varying,
	in_street_lights character varying,
	in_waste_disposal character varying,
	in_geom character varying,
	in_id character varying)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE app_date DATE;
        app_id INT;
        parcel_id INT;
		created_at DATE;

BEGIN  app_date := CURRENT_DATE;
	IF in_query_type='insert' THEN 	
		select max(id)+1 into app_id from public.parcels;
    IF(in_geom !='' and in_geom!=null and in_geom!='undefined' and in_geom!='null') THEN
        INSERT into public.parcels (state,district,lga,ward,address,property_id_no,block_no,plot_no,street_name,owner_name,owner_type,owner_gender,telephone1,telephone2,type_of_occupier,any_buildings,main_use,parcel_fenced,size_in_m2,doc_type,water,sewerages,electricity,street_lights,waste_disposal,geom,"updatedAt", "createdAt") 
		VALUES (in_state,in_district,in_lga,in_ward,in_address,in_property_id_no,in_block_no,in_plot_no,in_street_name,in_owner_name,in_owner_type,in_owner_geder,in_telephone1,in_telephone2,in_occupancy_type,in_any_buildings,in_main_use,in_parcel_fenced,in_size_in_m2,in_doc_type,in_water,in_sewerage,in_electricity,in_street_lights,in_waste_disposal,ST_GeomFromText('POLYGON(('||in_geom||'))'),app_date, app_date)
        RETURNING id INTO parcel_id;
    ELSE
     INSERT into public.parcels (state,district,lga,ward,address,property_id_no,block_no,plot_no,street_name,owner_name,owner_type,owner_gender,telephone1,telephone2,type_of_occupier,any_buildings,main_use,parcel_fenced,size_in_m2,doc_type,water,sewerages,electricity,street_lights,waste_disposal,geom,"updatedAt", "createdAt") 
		VALUES (in_state,in_district,in_lga,in_ward,in_address,in_property_id_no,in_block_no,in_plot_no,in_street_name,in_owner_name,in_owner_type,in_owner_geder,in_telephone1,in_telephone2,in_occupancy_type,in_any_buildings,in_main_use,in_parcel_fenced,in_size_in_m2,in_doc_type,in_water,in_sewerage,in_electricity,in_street_lights,in_waste_disposal,ST_GeomFromText('POLYGON(('||in_geom||'))'),app_date, app_date)
        RETURNING id INTO parcel_id;
    END IF;
	RETURN parcel_id;
    ELSIF in_query_type ='update' THEN 
        UPDATE public.parcels SET  
        state = in_state,district=in_district,lga=in_lga,ward=in_ward,
address=in_address,property_id_no=in_property_id_no,block_no=in_block_no,
plot_no=in_plot_no,street_name=in_street_name,owner_name=in_owner_name,
owner_type=in_owner_type,owner_gender=in_owner_geder,telephone1=in_telephone1,
telephone2=in_telephone2,type_of_occupier=in_occupancy_type,any_buildings=in_any_buildings,
main_use=in_main_use,parcel_fenced=in_parcel_fenced,size_in_m2=in_size_in_m2,
doc_type=in_doc_type,water=in_water,sewerages=in_sewerage,electricity=in_electricity,
street_lights=in_street_lights,waste_disposal=in_waste_disposal,"updatedAt"=app_date, "createdAt"=app_date WHERE id =in_id::integer;
return in_id;
    ELSIF in_query_type='delete' THEN 
      
    END IF;
END;
$BODY$;

ALTER FUNCTION public.__parcel_insert(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)
    OWNER TO postgres;
