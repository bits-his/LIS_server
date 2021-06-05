
CREATE OR REPLACE FUNCTION my_status( role  VARCHAR(20)
)
  RETURNS TABLE ( forward_to_txt VARCHAR,  status_txt VARCHAR)
  
  LANGUAGE plpgsql
  AS $$

BEGIN
	RETURN QUERY
  SELECT DISTINCT (forward_to) forward_to_txt, status as status_txt FROM public."Remarks" R 
  WHERE R.forward_to = role   AND R.forward_by IS NOT NULL  ORDER BY R.status ASC;

END;
$$



CREATE OR REPLACE FUNCTION others_status( role  VARCHAR(20)
)
  RETURNS TABLE (forward_to_txt VARCHAR, status_txt VARCHAR)
  
  LANGUAGE plpgsql
  AS $$

BEGIN
	RETURN QUERY
  SELECT DISTINCT (forward_to) forward_to_txt, status as status_txt FROM public."Remarks" R  
  WHERE R.forward_to != role  AND R.forward_by IS NOT NULL  ORDER BY R.status ASC;

END;
$$
