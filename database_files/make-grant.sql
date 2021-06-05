
CREATE OR REPLACE PROCEDURE grant_queries(
	in_query_type VARCHAR,
    in_id INT,
    in_r_of_o_no VARCHAR,
    in_plot_no VARCHAR,
    in_plan_no VARCHAR,
    in_ground_rent VARCHAR,
    in_improvement_value VARCHAR,
    in_improvement_term VARCHAR,
    in_remark VARCHAR,
    in_signed_by VARCHAR,
    in_forward_to VARCHAR,
    in_forward_by VARCHAR
) AS $$
	    
DECLARE app_date DATE;
		app_status VARCHAR;
		app_purpose VARCHAR;
BEGIN  app_date := CURRENT_DATE;
	
	IF EXISTS ( SELECT *  FROM public."Applications"   WHERE id = in_id ) THEN 

		SELECT status, application_type INTO app_status, app_purpose FROM public."Applications"   WHERE id = in_id ;
		IF FOUND THEN 
			RAISE NOTICE 'Status recieved as:  %', app_status;

			IF  in_query_type = 'insert' THEN
				IF  app_status = 'Raise Letter of Grant'  THEN 
					app_status :=  'Letter of Grant Raised';
				END IF;

				INSERT INTO public."Grants"(r_of_o, plot_no, plan_no, ground_rent, purpose, improvement_value, improvement_term, "createdAt", "updatedAt")
				VALUES (in_r_of_o_no,in_plot_no,in_plan_no,in_ground_rent,app_purpose,in_improvement_value,in_improvement_term,app_date,app_date);

			ELSE IF in_query_type = 'update' THEN 
				IF  app_status = 'Letter of Grant Raised'  THEN 
					app_status :=  'Letter of Grant Signed';
				END IF; 	
				UPDATE public."Grants" SET signed_by=in_signed_by, "updatedAt"=app_date, signed_on =app_date, date_of_issue=app_date
				WHERE app_id= in_id;
			END IF;

			UPDATE  public."Applications"  SET forward_by=in_forward_by,forward_to=in_forward_to, "updatedAt" = app_date, 
			status = app_status, remark = in_remark WHERE id = in_id;

			INSERT INTO public."Comments" 
			(status, remark, forward_to, forward_by, "ApplicationId", "createdAt", "updatedAt") 
			VALUES(app_status, in_remark,in_forward_to,in_forward_by, in_id, app_date, app_date);

			RAISE NOTICE 'NEW REMARK INSERTED';
		END IF; 
	END IF; 
	END IF; 
	RAISE NOTICE 'APPLICATION FORM DATA NOT FOUND';
END;

$$ LANGUAGE plpgsql;
     
