-- FUNCTION: public.get_occupants(character varying, integer)

-- DROP FUNCTION public.get_occupants(character varying, integer);

CREATE OR REPLACE FUNCTION public.get_occupants(
	in_query_type character varying,
	in_id character varying)
    RETURNS SETOF "Occupants" 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN  IF in_query_type='one' THEN 
		RETURN QUERY
        SELECT * FROM public."Occupants" WHERE id = in_id ::INTEGER LIMIT 1;
    ELSIF in_query_type ='delete' THEN 
        DELETE FROM public."Occupants" WHERE id =in_id ::INTEGER;
		
		RETURN QUERY
		SELECT * FROM public."Occupants" ORDER BY ID DESC LIMIT 100;
	 ELSIF in_query_type ='search' THEN 
        DELETE FROM public."Occupants" WHERE id =in_id;
		SELECT *  FROM public."Occupants" WHERE 
WHERE occupant_id ILIKE in_id OR floor_area_m2 ILIKE in_id OR name_of_occupant ILIKE in_id OR type_of_occupant ILIKE in_id OR use_type_of_unit ILIKE in_id OR occupier_is_owner ILIKE in_id OR owner_details ILIKE in_id OR tel_mobile ILIKE in_id OR tel_home ILIKE in_id OR parcels_id ILIKE in_id OR structure_id
        ORDER BY id DESC LIMIT 10;
    ELSE
		RETURN QUERY
		SELECT * FROM public."Occupants" ORDER BY ID DESC LIMIT 100;
    END IF;
END;
$BODY$;

ALTER FUNCTION public.get_occupants(character varying, integer)
    OWNER TO postgres;
