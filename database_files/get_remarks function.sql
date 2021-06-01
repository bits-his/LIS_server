
CREATE OR REPLACE FUNCTION my_remarks( role  VARCHAR(20)
)
  RETURNS TABLE ( remark_to_txt VARCHAR,  remark_txt VARCHAR)
  
  LANGUAGE plpgsql
  AS $$

BEGIN
	RETURN QUERY
  SELECT DISTINCT (remark_to) remark_to_txt, remark as remark_txt FROM public."Remarks"  
  WHERE remark_to = role  ORDER BY remark ASC;

END;
$$



CREATE OR REPLACE FUNCTION others_remark( role  VARCHAR(20)
)
  RETURNS TABLE (remark_to_txt VARCHAR, remark_txt VARCHAR)
  
  LANGUAGE plpgsql
  AS $$

BEGIN
	RETURN QUERY
  SELECT DISTINCT (remark_to) remark_to_txt, remark as remark_txt FROM public."Remarks"  
  WHERE remark_to != role  AND remark_by IS NOT NULL  ORDER BY remark ASC;

END;
$$
