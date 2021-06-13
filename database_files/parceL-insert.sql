-- FUNCTION: public.parcel_insert(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)

-- DROP FUNCTION public.parcel_insert(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.parcel_insert(
	in_query_type character varying,
	in_name character varying,
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
	in_formal_document character varying,
	in_informal_document character varying,
	in_water character varying,
	in_sewerage character varying,
	in_electricity character varying,
	in_street_lights character varying,
	in_waste_disposal character varying,
	in_shape_length character varying,
	in_shape_area character varying)
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
        INSERT INTO public."Parcels" (name,state,district,lga,ward,address,property_id_no,block_no,plot_no,street_name,owner_name,owner_type,owner_geder,telephone1,telephone2,occupancy_type,any_buildings,main_use,parcel_fenced,size_in_m2,formal_document,informal_document,water,sewerage,electricity,street_lights,waste_disposal,shape_length,shape_area,"updatedAt", "createdAt") 
		VALUES (in_name,in_state,in_district,in_lga,in_ward,in_address,in_property_id_no,in_block_no,in_plot_no,in_street_name,in_owner_name,in_owner_type,in_owner_geder,in_telephone1,in_telephone2,in_occupancy_type,in_any_buildings,in_main_use,in_parcel_fenced,in_size_in_m2,in_formal_document,in_informal_document,in_water,in_sewerage,in_electricity,in_street_lights,in_waste_disposal,in_shape_length,in_shape_area,app_date, app_date)
        RETURNING id INTO parcel_id;
	RETURN parcel_id;
    ELSIF in_query_type ='update' THEN 
        UPDATE public."Parcel" SET  
        "updatedAt"=app_date WHERE occupant_id =in_occupant_id;
    ELSIF in_query_type='delete' THEN 
      
    END IF;
END;
$BODY$;

ALTER FUNCTION public.parcel_insert(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying)
    OWNER TO postgres;
