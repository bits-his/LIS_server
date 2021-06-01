CREATE OR REPLACE PROCEDURE make_remark(
    in_id INT,
    in_comment VARCHAR(250),
    in_remark VARCHAR(50),
    in_forward_to VARCHAR(20),
    in_forward_by VARCHAR(20)
) AS $$
	    
DECLARE app_time_date DATE;
	app_remark VARCHAR;

BEGIN  app_time_date := CURRENT_DATE;
    SELECT remark INTO app_remark FROM public."Remarks" R 
    WHERE R.remark_to = in_forward_to AND R.remark_by = in_forward_by;
    IF FOUND THEN
    
        UPDATE  public."Applications"  SET status = in_remark, forward_to=in_forward_to, 
        forward_by = in_forward_by, remark=in_comment,"updatedAt"=app_time_date WHERE  id = in_id ;
        IF FOUND THEN
            UPDATE  public."Comments" 
            SET  remark=app_remark, forward_to=in_forward_to, forward_by = in_forward_by, 
            comment = in_comment, "updatedAt" = app_time_date WHERE  "ApplicationId" = in_id;
    
            IF NOT FOUND THEN 
                INSERT INTO public."Comments" 
                (remark, comment, forward_to, forward_by, "ApplicationId", "createdAt", "updatedAt") 
                VALUES(app_remark, in_comment,in_forward_to,in_forward_by, in_id, app_time_date, app_time_date);
            END IF;
        END IF;
    ELSE
        RAISE EXCEPTION 'Remark not available';
    END IF; 
END;
$$ LANGUAGE plpgsql;
     
