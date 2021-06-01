CREATE OR REPLACE PROCEDURE update_recommendation (
    in_id INT,
    in_comment VARCHAR,
    in_remark VARCHAR,
    in_forward_by VARCHAR,
    in_forward_to VARCHAR
) AS $$
	    
DECLARE app_date DATE;
        app_remark VARCHAR;

BEGIN  app_date := CURRENT_DATE;
    UPDATE  public."Applications"  SET forward_by=in_forward_by, "updatedAt" = app_date, 
    status = in_remark, remark = in_comment 
    WHERE id = in_id;
    IF FOUND THEN
        UPDATE  public."Comments" 
        SET  remark=app_remark, forward_to=in_forward_to, forward_by = in_forward_by, 
        comment=in_comment, "updatedAt"=app_date WHERE forward_to=in_forward_to AND forward_by = in_forward_by AND "ApplicationId" = in_id;
        IF FOUND THEN
            RAISE NOTICE 'Comment updated sucessfully';
        ELSE
            INSERT INTO public."Comments" ( "ApplicationId", remark, comment, forward_to, forward_by,"updatedAt","createdAt") 
            VALUES( in_id, in_remark, in_comment, in_forward_to,in_forward_by, app_date, app_date);
        END IF;
    END IF;
END;	
$$ LANGUAGE plpgsql;
     