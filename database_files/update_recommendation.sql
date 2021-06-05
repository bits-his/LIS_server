CREATE OR REPLACE PROCEDURE update_recommendation (
    in_id INT,
    in_remark VARCHAR,
    in_forward_by VARCHAR,
    in_forward_to VARCHAR
) AS $$
	    
DECLARE app_date DATE;
        app_status VARCHAR;
        app_recom_id INT;

BEGIN  app_date := CURRENT_DATE;
IF EXISTS ( SELECT *  FROM public."Applications"   WHERE id = in_id ) THEN 
 
    SELECT status AS app_status , 
    CASE WHEN status= 'Treated Recommendation' THEN 
           'Raise Letter of Grant'
        END 
    FROM public."Applications" WHERE id = in_id ;
    IF FOUND THEN
        UPDATE  public."Applications"  SET forward_by=in_forward_by,forward_to=in_forward_to, "updatedAt" = app_date, 
        status = app_status, remark = in_remark WHERE id = in_id;
    

        UPDATE  public."Comments" SET  status=app_status, forward_to=in_forward_to, forward_by = in_forward_by, 
        remark=in_remark, "updatedAt"=app_date WHERE forward_to=in_forward_to AND forward_by = in_forward_by AND "ApplicationId" = in_id;
        IF FOUND THEN
            RAISE NOTICE 'Comment updated sucessfully';
        ELSE
            INSERT INTO public."Comments" ( "ApplicationId", remark, status, forward_to, forward_by,"updatedAt","createdAt") 
            VALUES( in_id, in_remark, app_status, in_forward_to,in_forward_by, app_date, app_date);
            RAISE NOTICE 'Comment created sucessfully';
        END IF;
    END IF;
    IF EXISTS ( 
        SELECT recom_id  FROM public."Applications" WHERE id = in_id
    ) THEN
        SELECT recom_id INTO app_recom_id  FROM public."Applications" WHERE id = in_id;

        UPDATE public."Recommendations" SET  
        "approvedBy"=in_forward_by, "approvedDate"=app_date,  status=app_status, "updatedAt"=app_date
        WHERE id=app_recom_id; 
    
        RAISE NOTICE 'Recommendation updated sucessfully %', app_recom_id;
    ELSE 
        RAISE WARNING 'Application not exists %', in_id;
	END IF;
END IF;
END;	
$$ LANGUAGE plpgsql;
     