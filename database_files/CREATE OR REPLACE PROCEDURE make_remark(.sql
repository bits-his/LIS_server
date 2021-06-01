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
	    
DECLARE app_time_date DATE;
        app_remark VARCHAR;

BEGIN  app_time_date := CURRENT_DATE;
    IF EXISTS (
        SELECT remark into app_remark FROM public."Remarks" 
        WHERE Remarks.remark_to = in_forward_to AND Remarks.remark_by = in_forward_by
    ) THEN 
        IF FOUND THEN
            UPDATE  public."Recommendations"  SET forward_by=in_forward_by  WHERE "ApplicationId" = in_applicationId ;
        ELSE RAISE WARNING 'Failed TO UPDATE BUT FRESS INSERT';

		IF FOUND THEN
			UPDATE  public."Applications"  SET forward_by=in_forward_by, updatedAt = app_time_date, 
			status = in_remark, remark = in_comment
			WHERE "ApplicationId".id = in_applicationId ;

			IF FOUND THEN

				UPDATE  public."Comments" 
				SET  remark=app_remark, forward_to=in_forward_to, forward_by = in_forward_by, 
				comment=in_comment, "updatedAt"=app_time_date WHERE  "ApplicationId" = in_applicationId;

				IF NOT FOUND THEN 
					INSERT INTO public."Comments" 
					( "ApplicationId", remark, comment, forward_to, forward_by,"updatedAt","createdAt") 
					VALUES( in_applicationId, app_remark, in_comment, in_forward_to,in_forward_by, app_time_date, app_time_date);
				END IF;
			END IF;
		END IF;
	END IF;
    ELSE
        RAISE EXCEPTION 'Application not found';
	END IF;
END;	
$$ LANGUAGE plpgsql;
     