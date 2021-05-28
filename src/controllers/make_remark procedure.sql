CREATE OR REPLACE PROCEDURE make_remark(
    in_id INT,
    in_remark VARCHAR(250),
    in_status VARCHAR(20),
    in_forward_to VARCHAR(20),
    in_forward_by VARCHAR(20)
) AS $$
	    
DECLARE app_status VARCHAR (20);
    app_time_date TIME;

BEGIN  app_time_date := CURRENT_DATE;

    SELECT * FROM  public."Applications"  WHERE  id = in_id;
    IF FOUND THEN
        UPDATE  public."Applications"  SET remark=in_remark, forward_to=in_forward_to, 
        forward_by = in_forward_by, status=in_status, "updatedAt"=app_time_date WHERE  id = in_id ;
    

        UPDATE  public."Remarks" 
        SET  remark=in_remark, forward_to=app_forward_to, forward_by = app_forward_by, 
        status=app_status, "updatedAt"=app_time_date WHERE  ApplicationId = in_id;
    
        IF NOT FOUND THEN 
            INSERT INTO public."Remarks" 
            (remark, forward_to, forward_by,status, "updatedAt") 
            VALUES(in_remark,in_forward_to,in_forward_by,in_status);
        END IF;
    ELSE
        RAISE EXCEPTION 'Application not found';
    END IF; 
END;
	
$$ LANGUAGE plpgsql;
     