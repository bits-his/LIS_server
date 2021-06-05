CREATE OR REPLACE PROCEDURE sign_recommendation (
    in_id INT,
    in_remark VARCHAR,
    in_forward_by VARCHAR,
    in_forward_to VARCHAR
) AS $$
	    
DECLARE app_date DATE;
        app_status VARCHAR;
        app_recom_id INT;

BEGIN  app_date := CURRENT_DATE;
IF EXISTS ( 
    SELECT *  FROM public."Remarks"  
    WHERE  forward_by = in_forward_by AND forward_to = in_forward_to
) THEN 
	SELECT status INTO app_status  FROM public."Remarks"  
    WHERE forward_to = in_forward_to AND forward_by = in_forward_by;

    UPDATE  public."Applications"  SET forward_by=in_forward_by,forward_to=in_forward_to, "updatedAt" = app_date, 
    status = app_status, remark = in_remark WHERE id = in_id;
    
    SELECT recom_id INTO app_recom_id  FROM public."Applications" 
    WHERE id = in_id;

     IF FOUND THEN 
        UPDATE public."Recommendations" SET  
        "stampedBy"=in_forward_by, "stampDate"=app_date, status=app_status, "updatedAt"=app_date
        WHERE app_id=in_id; 
        IF FOUND THEN 
            RAISE NOTICE 'Recommendation updated sucessfully';

            UPDATE  public."Comments" 
            SET  remark=in_remark, forward_to=in_forward_to, forward_by = in_forward_by, status = app_status,
            "updatedAt"=app_date WHERE forward_to=in_forward_to AND forward_by = in_forward_by AND "ApplicationId" = in_id;
            IF FOUND THEN
                RAISE NOTICE 'Comment updated sucessfully';
            ELSE
                INSERT INTO public."Comments" ( "ApplicationId", remark, status, forward_to, forward_by,"updatedAt","createdAt") 
                VALUES( in_id, in_remark, app_status, in_forward_to,in_forward_by, app_date, app_date);
				RAISE NOTICE 'Comment inserted sucessfully';
            END IF;
        END IF;
    END IF;
END IF;
END;	

$$ LANGUAGE plpgsql;
     