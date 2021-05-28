CREATE OR REPLACE PROCEDURE create_file(
        in_year_code VARCHAR(5),
        in_application_date VARCHAR(10),
        in_application_type VARCHAR (5),
        in_name VARCHAR (60),
        in_amount VARCHAR (15),
        in_address VARCHAR(256),
        in_email VARCHAR (60),
        in_phone VARCHAR (15),
        in_other_info VARCHAR (60),
        in_tp_no VARCHAR (10),
        in_plot_no VARCHAR (10),
        in_amount_paid VARCHAR (10),
        in_reciept_no VARCHAR (10),
        in_forward_to VARCHAR (20),
        in_forward_by VARCHAR (20),
        in_status VARCHAR (20)
     ) AS $$
	 
     
    declare file_numb INT;
        generated_code VARCHAR (10);
        in_time_date DATE;
     BEGIN
        
        SELECT (id)+1 INTO file_numb FROM file_number  WHERE  file_code = in_application_type;

        UPDATE file_number set id=file_numb WHERE  file_code = in_application_type;

        generated_code := CONCAT(in_application_type,'-', in_year_code, '-', file_numb);

        in_time_date := CURRENT_DATE;

        INSERT INTO public."Applications" (
            ack_id,
            application_date,
            application_type,
            name,
            amount,
            address,
            email,
            phone,
            other_info,
            tp_no,
            plot_no,
            amount_paid,
            reciept_no,
            forward_to,
            forward_by,
            status,
            "createdAt",
            "updatedAt")

            values (
                generated_code,
                in_application_date,
                in_application_type,
                in_name,
                in_amount,
                in_address,
                in_email,
                in_phone,
                in_other_info,
                in_tp_no,
                in_plot_no,
                in_amount_paid,
                in_reciept_no,
                in_forward_to,
                in_forward_by,
                in_status,
                in_time_date,
                in_time_date);
        
     end;
	 $$ LANGUAGE plpgsql;
     