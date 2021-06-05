
CALL  recommendation_queries (
    'update',
    9,
    29,
    'Signed Recommendation',
    'All is cleared',
    '',
    '',
    '',
    '',
    '',
    '',
    'PS',
    'Commissioner'
) 
forward_by: "PS"
forward_to: ""
id: 9
query_type: "sign"
recom_id: 29
remark: "All is cleared"
status: "Signed Recommendation" 
CREATE OR REPLACE PROCEDURE recommendation_queries (
    in_query_type VARCHAR, 
    in_id INT, 
    in_recom_id INT,
    in_status VARCHAR, 
    in_remark VARCHAR, 
    in_term VARCHAR, 
    in_proposed_dev VARCHAR, 
    in_annual_rent VARCHAR, 
    in_dev_charges VARCHAR, 
    in_survey_charges VARCHAR, 
    in_proposed_dev_time DATE, 
    in_forward_by VARCHAR, 
    in_forward_to VARCHAR 
) AS $$
	    
DECLARE app_date DATE;
        app_recom_id INT;
BEGIN  app_date := CURRENT_DATE;
	IF in_query_type='insert' THEN 	
        INSERT INTO public."Recommendations" (app_id, term, proposed_dev, annual_rent, dev_charges, survey_charges, proposed_dev_time,  "submittedBy", "submittedDate", status, "updatedAt", "createdAt") 
		VALUES (in_id,in_term, in_proposed_dev, in_annual_rent, in_dev_charges, in_survey_charges, in_proposed_dev_time, in_forward_by, app_date, in_status, app_date,app_date);
        
        IF FOUND THEN            
            SELECT LASTVAL() INTO app_recom_id;
            RAISE NOTICE 'Recommendation created sucessfully with rec. id: %', app_recom_id;
        END IF;
    ELSIF in_query_type ='sign' THEN 
        UPDATE public."Recommendations" SET  
        "approvedBy"=in_forward_by, "approvedDate"=app_date, status=in_status, "updatedAt"=app_date
        WHERE app_id=in_recom_id; 
        IF FOUND THEN
            RAISE NOTICE 'Recommendation stamped sucessfully';
		END IF;
    ELSIF in_query_type='stamp' THEN 
       UPDATE public."Recommendations" SET  
        "stampedBy"=in_forward_by, "stampDate"=app_date, status=in_status, "updatedAt"=app_date
        WHERE app_id=in_recom_id; 
        IF FOUND THEN
            RAISE NOTICE 'Recommendation stamped sucessfully';
		END IF;
    ELSE 
        RAISE NOTICE 'Recommendation stamped sucessfully';
    END IF;

    INSERT INTO public."Comments" ("ApplicationId", status, remark, forward_to, forward_by,"updatedAt","createdAt") 
    VALUES( in_id, in_status, in_remark, in_forward_to,in_forward_by, app_date, app_date);
    
    IF FOUND THEN
        RAISE NOTICE 'Comment created sucessfully';
    ELSE
        RAISE NOTICE 'Comment not inserted';
    END IF;
    UPDATE  public."Applications"  SET forward_by=in_forward_by,forward_to=in_forward_to, "updatedAt" = app_date, 
    status = in_status, remark = in_remark WHERE id = in_id;

    IF FOUND THEN
        RAISE NOTICE 'Applications updated sucessfully with rec. id %', app_recom_id;
    ELSE
        RAISE NOTICE 'Applications not updated';
    END IF;
END;	

$$ LANGUAGE plpgsql;
     