CREATE OR REPLACE FUNCTION get_files(
    in_forward_to VARCHAR(20),
    in_status VARCHAR(20)
) 
  RETURNS TABLE (app_id INT, ackid VARCHAR, createdAt TIMESTAMPTZ )  
AS $$

DECLARE new_status VARCHAR[];
BEGIN
 	new_status := regexp_split_to_array(in_status,',');
  RETURN QUERY
    SELECT id as app_id, ack_id as ackid , createdAt
    FROM   public."Applications" 
    WHERE  status = ANY(new_status) and forward_to = in_forward_to;
END;

$$ LANGUAGE plpgsql;