
CREATE OR REPLACE FUNCTION get_remarks(query_type  VARCHAR(20), role  VARCHAR(20)
)
  RETURNS TABLE (remark VARCHAR, forward_to VARCHAR) AS $$

BEGIN
  IF query_type = "by_me" THEN
    RETURN QUERY   
      SELECT *  FROM public."Remarks"  WHERE forward_to = role;

  ELSIF query_type = "by_others"  THEN
    RETURN  QUERY 
      SELECT *  FROM public."Remarks" WHERE  forward_to != role;
  ELSE 
    RETURN QUERY
       SELECT *  FROM public."Remarks" ;
  END IF;
END;
$$ LANGUAGE plpgsql;
