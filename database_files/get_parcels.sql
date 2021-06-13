-- FUNCTION: public.get_parcels(character varying, character varying)

-- DROP FUNCTION public.get_parcels(character varying, character varying);

CREATE OR REPLACE FUNCTION public.get_parcels(
	in_query_type character varying,
	in_id character varying)
    RETURNS SETOF "Parcels" 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN  IF in_query_type='one' THEN 
		RETURN QUERY
        SELECT * FROM public."Parcels" WHERE id = in_id LIMIT 1;
    ELSIF in_query_type ='delete' THEN 
		RETURN QUERY
        DELETE FROM public."Parcel" WHERE id =in_id;
	 ELSIF in_query_type ='search' THEN 
		RETURN QUERY
       	SELECT *  FROM public."Parcels" WHERE id ILIKE in_id OR name ILIKE in_id OR district ILIKE in_id OR  lga ILIKE in_id OR  ward ILIKE in_id OR address ILIKE in_id OR block_no ILIKE in_id OR property_id_no ILIKE in_id 
		OR plot_no ILIKE in_id  OR street_name ILIKE in_id  OR owner_name ILIKE in_id  OR name ILIKE in_id  OR owner_type ILIKE in_id 
		OR owner_geder ILIKE in_id OR telephone1 ILIKE in_id OR telephone2 ILIKE in_id OR occupancy_type ILIKE in_id  OR any_buildings ILIKE in_id  OR main_use ILIKE in_id  OR parcel_fenced ILIKE in_id  OR size_in_m2 ILIKE in_id  OR formal_document ILIKE in_id OR informal_document ILIKE in_id 
		OR water ILIKE in_id OR sewerage ILIKE in_id OR electricity ILIKE in_id OR street_lights ILIKE in_id OR waste_disposal ILIKE in_id OR shape_length ILIKE in_id OR shape_area = in_id ORDER BY id DESC LIMIT 20;

	ELSE
		RETURN QUERY
		SELECT * FROM public."Parcels" ORDER BY ID DESC LIMIT 100;
    END IF;
END;
$BODY$;

ALTER FUNCTION public.get_parcels(character varying, character varying)
    OWNER TO postgres;










-- FUNCTION: public.get_parcels(character varying, integer)

-- DROP FUNCTION public.get_parcels(character varying, integer);

CREATE OR REPLACE FUNCTION public.get_parcels(
	in_query_type character varying,
	in_id integer)
    RETURNS SETOF "Parcels" 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN  IF in_query_type='one' THEN 
		RETURN QUERY
        SELECT * FROM public."Parcels" WHERE id = in_id LIMIT 1;
    ELSIF in_query_type ='delete' THEN 
		RETURN QUERY
        DELETE FROM public."Parcel" WHERE id =in_id;
    ELSE
		RETURN QUERY
		SELECT * FROM public."Parcels" ORDER BY ID DESC LIMIT 100;
    END IF;
END;
$BODY$;

ALTER FUNCTION public.get_parcels(character varying, integer)
    OWNER TO postgres;

