-- FUNCTION: public.structure_insert(character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, integer, character varying, integer, character varying, character varying)

-- DROP FUNCTION public.structure_insert(character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, integer, character varying, integer, character varying, character varying);

CREATE OR REPLACE FUNCTION public.structure_insert(
	in_query_type character varying,
	in_structure_id integer,
	in_finished character varying,
	in_level_of_completion character varying,
	in_year_completed character varying,
	in_main_use character varying,
	in_residential_type character varying,
	in_wall_material character varying,
	in_roof_covering character varying,
	in_roof_type character varying,
	in_no_floors integer,
	in_no_of_occupants integer,
	in_property_id_no character varying,
	in_parcel_id integer,
	in_shape_length character varying,
	in_shape_area character varying)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE app_date DATE;
        out_id INT;

BEGIN  app_date := CURRENT_TIMESTAMP;
	IF in_query_type='insert' THEN 	
        INSERT INTO public."Structures" (structure_id,finished,level_of_completion,year_completed,main_use,residential_type,wall_material,roof_covering,roof_type,no_floors,no_of_occupants,property_id_no,parcel_id,shape_length,shape_area, "updatedAt", "createdAt") 
		VALUES (in_structure_id,in_finished,in_level_of_completion,in_year_completed, in_main_use, in_residential_type, in_wall_material, in_roof_covering, in_roof_type, in_no_floors,in_no_of_occupants, in_property_id_no, in_parcel_id, in_shape_length, in_shape_area,app_date, app_date)
        RETURNING id INTO out_id;
        RETURN out_id;
    ELSIF in_query_type ='update' THEN 
        UPDATE public."Structures" SET  
        "updatedAt"=app_date WHERE occupant_id =in_occupant_id;
    ELSIF in_query_type='delete' THEN 
      
    END IF;
END;
$BODY$;

ALTER FUNCTION public.structure_insert(character varying, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, integer, character varying, integer, character varying, character varying)
    OWNER TO postgres;
