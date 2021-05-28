CREATE OR REPLACE PROCEDURE make_remark(
    in_id INT,
    in_remark VARCHAR(50),
    in_comment VARCHAR(250),
    in_forward_to VARCHAR(20),
    in_forward_by VARCHAR(20)
) AS $$
	    
DECLARE  app_time_date DATE;

BEGIN  app_time_date := CURRENT_DATE;

    
    UPDATE  public."Applications"  SET status=in_remark, forward_to=in_forward_to, 
    forward_by = in_forward_by, "updatedAt"=app_time_date WHERE  id = in_id ;
    
    IF FOUND THEN

        UPDATE  public."Comments" 
        SET  remark=in_remark, forward_to=in_forward_to, forward_by = in_forward_by, 
        comment=in_comment, "updatedAt"=app_time_date WHERE  "ApplicationId" = in_id;
    
        IF NOT FOUND THEN 
            INSERT INTO public."Comments" 
            ( "ApplicationId", remark, comment, forward_to, forward_by,"updatedAt","createdAt") 
            VALUES( in_id, in_remark, in_comment, in_forward_to,in_forward_by, app_time_date, app_time_date);
        END IF;
    ELSE
        RAISE EXCEPTION 'Application not found';
    END IF; 
END;
	
$$ LANGUAGE plpgsql;
     