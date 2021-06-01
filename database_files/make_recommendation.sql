CREATE OR REPLACE PROCEDURE make_recommendation (
    in_applicationId INT,
    in_comment VARCHAR,
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
        app_remark VARCHAR;

BEGIN  app_date := CURRENT_DATE;
	  	SELECT remark INTO app_remark FROM public."Remarks" R 
    	WHERE R.remark_to = in_forward_to AND R.remark_by = in_forward_by;
		IF FOUND THEN
			UPDATE  public."Applications"  SET forward_by=in_forward_by, "updatedAt" = app_date, 
			status = app_remark, remark = in_comment 
			WHERE id = in_applicationId;
			IF FOUND THEN
                INSERT INTO public."Recommendations" (id, term, proposed_dev, annual_rent, dev_charges, survey_charges, proposed_dev_time,  "submittedBy", "submittedDate", status, "updatedAt", "createdAt") 
                VALUES (in_applicationId, in_term, in_proposed_dev, in_annual_rent, in_dev_charges, in_survey_charges, in_proposed_dev_time, in_forward_by, app_date, app_remark, app_date, app_date);
				
                UPDATE  public."Comments" 
				SET  remark=app_remark, forward_to=in_forward_to, forward_by = in_forward_by, 
				comment=in_comment, "updatedAt"=app_date WHERE forward_to=in_forward_to AND forward_by = in_forward_by AND "ApplicationId" = in_applicationId;
            	IF FOUND THEN
					RAISE NOTICE 'Comment updated sucessfully';
				ELSE
					INSERT INTO public."Comments" ( "ApplicationId", remark, comment, forward_to, forward_by,"updatedAt","createdAt") 
					VALUES( in_applicationId, app_remark, in_comment, in_forward_to,in_forward_by, app_date, app_date);
		    	END IF;
			END IF;
		END IF;
END;	
$$ LANGUAGE plpgsql;
     