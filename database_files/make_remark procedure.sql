
CREATE OR REPLACE PROCEDURE make_remark(
    in_id INT,
    in_remark VARCHAR(50),
    in_forward_to VARCHAR(20),
    in_forward_by VARCHAR(20)
) AS $$
	    
DECLARE app_date DATE;
		app_status VARCHAR;
BEGIN  app_date := CURRENT_DATE;

    IF EXISTS ( SELECT *  FROM public."Applications"   WHERE id = in_id ) THEN 
 
		SELECT status INTO app_status FROM public."Applications"   WHERE id = in_id ;
		
		IF FOUND THEN
            IF  app_status = 'Treated Recommendation'  THEN 
                app_status :=  'Raise Letter of Grant'
            END IF;
			UPDATE  public."Applications"  SET forward_by=in_forward_by,forward_to=in_forward_to, "updatedAt" = app_date, 
			status = app_status, remark = in_remark WHERE id = in_id;

			UPDATE  public."Applications" SET status = app_status, forward_to=in_forward_to, 
			forward_by = in_forward_by, remark=in_remark, "updatedAt"=app_date WHERE  id = in_id ;

			UPDATE  public."Comments" 
			SET  status=app_status, forward_to=in_forward_to, forward_by = in_forward_by, 
			remark = in_remark, "updatedAt" = app_date WHERE  "ApplicationId" = in_id;
			RAISE NOTICE 'Remark updated  %', app_status;
		ELSE
			INSERT INTO public."Comments" 
			(status, remark, forward_to, forward_by, "ApplicationId", "createdAt", "updatedAt") 
			VALUES(app_status, in_remark,in_forward_to,in_forward_by, in_id, app_date, app_date);
			RAISE NOTICE 'SUCCESSSSSSS';
		END IF; 	
	END IF; 
END;
$$ LANGUAGE plpgsql;
     
