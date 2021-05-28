create or replace function country(text) returns text as $$
declare                   -- declare some variables
  id integer;
  fname text;
  lname text;
begin
  select customer_id, customer.first_name, customer.last_name 
    into id, fname, lname -- store query results in variables
  from customer 
  inner join address on customer.address_id = address.address_id 
  inner join city on address.city_id = city.city_id 
  inner join country on city.country_id = country.country_id 
  where country = $1;     -- don't quote parameter references

  -- do something with the variables and return a value from the function
  return format('%s: %s %s', id, upper(lname), fname);
end;
$$ language plpgsql;




CREATE OR REPLACE FUNCTION get_applications(in_forward_to VARCHAR(20),in_forward_by VARCHAR(20),
    in_status VARCHAR(20)
) RETURNS TEXT
AS $$

DECLARE ackid text;
        createdAt1 date;
BEGIN
  
         SELECT ack_id, createdAt into ackid,createdAt1 FROM public."Applications" WHERE status = in_status AND forward_to = in_forward_to 
         ORDER BY id ASC LIMIT 10 ;

         return ackid, createdAt1;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_applications2(in_forward_to VARCHAR(20),in_forward_by VARCHAR(20),
    in_status VARCHAR(20)
)
RETURNS SETOF RECORD AS $$

DECLARE ackid text;
        createdAt1 date;
BEGIN
  
         SELECT ack_id, "createdAt" into ackid,createdAt1 FROM public."Applications" WHERE status = in_status AND forward_to = in_forward_to 
         ORDER BY id ASC LIMIT 10 ;
        RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_applications2(in_forward_to VARCHAR(20),in_forward_by VARCHAR(20),
    in_status VARCHAR(20)
)
  RETURNS TABLE (ackid text, createdAt text) AS 
$$
BEGIN
   RETURN QUERY
   SELECT "ack_id" as ackid "createdAt"
   FROM   public."Applications" 
   WHERE  status = in_status AND forward_to = in_forward_to;
END
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_remarks(query_type  VARCHAR(20), role  VARCHAR(20)
)
  RETURNS TABLE (remark VARCHAR, forward_to VARCHAR) AS 
$$
declare
  selected_row Remarks%rowtype;
BEGIN

  IF query_type = "by_me" THEN
    RETURN QUERY
    
      SELECT *  FROM public."Remarks"  WHERE forward_to = role
  

  ELSE IF query_type = "by_others"  THEN
    RETURN  QUERY 
      SELECT *  FROM public."Remarks" AND  selected_row.forward_to != role 
  ELSE 
    RETURN QUERY
       SELECT *  FROM public."Remarks" 
  END IF
END
$$ LANGUAGE plpgsql;




