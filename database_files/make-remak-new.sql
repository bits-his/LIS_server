
CREATE OR REPLACE PROCEDURE remark_queries(
    in_query_type VARCHAR;
    in_id INT,
    in_remark VARCHAR,
    in_forward_to VARCHAR(20),
    in_forward_by VARCHAR(20)
) AS $$
	    
DECLARE app_time_date DATE;
		in_stat VARCHAR;
BEGIN  app_time_date := CURRENT_DATE;
    IF EXISTS ( SELECT *  FROM public."Applications"   WHERE id = in_id ) THEN 
			
        SELECT status INTO in_stat  FROM public."Remarks"  
        WHERE forward_to = in_forward_to AND forward_by = in_forward_by AND id = id ORDER BY id ASC;

        UPDATE  public."Applications" SET status = in_stat, forward_to=in_forward_to, 
        forward_by = in_forward_by, remark=in_remark, "updatedAt"=app_time_date WHERE  id = in_id ;

            INSERT INTO public."Comments" 
            (status, remark, forward_to, forward_by, "ApplicationId", "createdAt", "updatedAt") 
            VALUES(in_stat, in_remark,in_forward_to,in_forward_by, in_id, app_time_date, app_time_date);
            
            RAISE NOTICE 'COMMENT CREATED %', in_stat;

            RETURN;
        END IF;
    ELSE
        
        RAISE WARNING 'CANT MAKE REMARK';
        RETURN;
	END IF; 
END;
$$ LANGUAGE plpgsql;
     
