-- FUNCTION: public.get_structures(character varying, integer)

-- DROP FUNCTION public.get_structures(character varying, integer);

CREATE OR REPLACE FUNCTION public.get_structures(
	in_query_type character varying,
	in_id integer)
    RETURNS SETOF "Structures" 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN  IF in_query_type='one' THEN 
		RETURN QUERY
        SELECT * FROM public."Structures" WHERE id = in_id LIMIT 1;
    ELSIF in_query_type ='delete' THEN 
        DELETE FROM public."Structures" WHERE id =in_id;
		
		RETURN QUERY
		SELECT * FROM public."Structures" ORDER BY ID DESC LIMIT 100;
    ELSE
		RETURN QUERY
		SELECT * FROM public."Structures" ORDER BY ID DESC LIMIT 100;
    END IF;
END;
$BODY$;

ALTER FUNCTION public.get_structures(character varying, integer)
    OWNER TO postgres;
