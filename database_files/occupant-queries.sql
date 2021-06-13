-- PROCEDURE: public.occupant_queries(character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, integer)

-- DROP PROCEDURE public.occupant_queries(character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, integer);

CREATE OR REPLACE PROCEDURE public.occupant_queries(
	in_query_type character varying,
	in_occupant_id integer,
	in_floor_area_m2 character varying,
	in_name_of_occupant character varying,
	in_type_of_occupant character varying,
	in_use_type_of_unit character varying,
	in_occupier_is_owner character varying,
	in_owner_details character varying,
	in_tel_mobile character varying,
	in_tel_home character varying,
	in_parcels_id integer,
	in_structure_id integer)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE app_date DATE;
        app_id INT;

BEGIN  app_date := CURRENT_DATE;
	IF in_query_type='insert' THEN 	
        INSERT INTO public."Occupants"(occupant_id,floor_area_m2,name_of_occupant,type_of_occupant,use_type_of_unit,occupier_is_owner,owner_details,tel_mobile, tel_home,parcels_id,structure_id, "updatedAt", "createdAt") 
		VALUES (in_occupant_id,in_floor_area_m2,in_name_of_occupant,in_type_of_occupant,in_use_type_of_unit,in_occupier_is_owner,in_owner_details,in_tel_mobile, in_tel_home,in_parcels_id,in_structure_id, app_date,app_date);
        
        IF FOUND THEN            
            SELECT LASTVAL() INTO app_id;
            RAISE NOTICE 'Occupant created sucessfully with LAST id: %', app_id;
        END IF;
    ELSIF in_query_type ='update' THEN 
        UPDATE public."Occupants" SET  
        "updatedAt"=app_date WHERE occupant_id =in_occupant_id;
    ELSIF in_query_type='delete' THEN 
      
    END IF;
END;
$BODY$;
