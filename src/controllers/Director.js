import db from "../models";
const { Application, Role, Recommendation, Remark } = db;
import moment from "moment";
export const createRegistry = (req, res) => {
  const { application_type,name,amount,address,email,phone,other_info,tp_no,plot_no,amount_paid,reciept_no,forward_to,forward_by,status} = req.body;
  let application_date = moment().format("YYYY-MM-DD");
  let year_code = moment().format("YYYY");
  db.sequelize.query(`CALL create_file (:year_code,:application_date,:application_type,:name,:amount,:address,:email,:phone,:other_info,:tp_no,:plot_no,:amount_paid,:reciept_no,:forward_to,:forward_by,:status);`,
      {replacements: {year_code,application_date,application_type,name,amount,address,email,phone,other_info,tp_no,plot_no,amount_paid,reciept_no,forward_to,forward_by,status}})
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const createSiteFile = (req, res) => {
  const { date, sitNo, purpose, type, remarks } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO sit_file(sit_file_date,sit_no,purpose,type,remarks) 
      VALUES ("${date}","${sitNo}","${purpose}","${type}","${remarks}")`
    )
    .then((results) => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const createLetterTemplate = (req, res) => {
  const { today, department, name, description, purpose, letter_body } =
    req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO letter_template( template_date,department,name,description,purpose,letter_body) 
      VALUES ("${today}","${department}","${name}","${description}","${purpose}",'${letter_body}')`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const createRateCharge = (req, res) => {
  db.sequelize
    .query(
      `call rate_charges("${req.body.area}","${req.body.owner}","${req.body.category}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const createDepartment = (req, res) => {
  const { date, department, name, location } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO public."Departments"(code,name,location,"createdAt","updatedAt") 
      VALUES ('${department}','${description}','${location}','${date}','${date}')`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO DepartmentsUnits(code,name,location) 
        VALUES ${req.body.Data.map((a) => "(?)").join(",")}`,
        {
          replacements: req.body.Data,
        }
      );
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

export const createDepartmentunit = (req, res) => {
  const { data } = req.body;
  console.log(data);
  db.sequelize
    .query(
      `INSERT INTO public."DepartmentUnits"(code,name,location) 
      VALUES ${data.map((a) => "(?)").join(",")}`,
      {
        replacements: data,
      }
    )
    .then((results) => res.json({ success: true, results }))
    .catch((err) => {
      console.log(err);
      res.json({ success: false, err });
    });
};

export const createDirectors = (req, res) => {
  const { department, position, unit, position_name } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO directors(department,position,other_unit_name,other_position) 
      VALUES ('${department}','${position}','${unit}','${position_name}')`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

export const getDepartments = (req, res) => {
  db.sequelize
    .query(`SELECT code FROM public."Departments"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};
export const getUnit = (req, res) => {
  db.sequelize
    .query(
      `SELECT unit_name FROM public."DepartmentUnits" where code='${req.params.department}'`
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getRegistries = (req, res) => {
  let { role, status } = req.params;
  const sql = `SELECT * from get_files (:role, :status)`;
  db.sequelize.query(sql, {replacements: {role,status}} )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const makeRecommendation = (req, res) => {
  const {query_type,recom_id,term,status,remark,proposed_dev,annual_rent,dev_charges,survey_charges,proposed_dev_time,id,forward_by,forward_to} = req.body;
  let sql = `CALL recommendation_queries(:query_type,:id,:recom_id,:status,:remark,:term,:proposed_dev,:annual_rent,:dev_charges,:survey_charges,:proposed_dev_time,:forward_by,:forward_to )`;
//  console.log({QQQQQQQQQQQWWWWWWWWWWW: `CALL recommendation_queries(${query_type},${id},${recom_id},${status},${remark},${term},${proposed_dev},${annual_rent},${dev_charges},${survey_charges},${proposed_dev_time},${forward_by},${forward_to} )`})
    db. sequelize.query(sql,{replacements:{query_type,id, recom_id,status,remark,term,proposed_dev,annual_rent,dev_charges,id,survey_charges,proposed_dev_time:proposed_dev_time,forward_by,forward_to }})
  .then((result) =>res.json({ success: true, result }))
  .catch((error) =>res.status(500).json({ success: false, error }));
};

export const grantQueries = (req, res) => {
  const {query_type,id, r_of_o_no,plot_no,plan_no,ground_rent,improvement_value,improvement_term,remark,signed_by, forward_to, forward_by} = req.body;
  const sql =`CALL grant_queries(:query_type,:id,:r_of_o_no,:plot_no,:plan_no,:ground_rent,:improvement_value,:improvement_term,:remark,:signed_by,:forward_to,:forward_by) `
  db.sequelize.query(sql,{replacements:{query_type,id, r_of_o_no,plot_no,plan_no,ground_rent,improvement_value,improvement_term,remark, signed_by, forward_to, forward_by}}) 
  .then((result) =>res.json({ success: true, result }))
  .catch((error) =>res.status(500).json({ success: false, error }));
}
export const getRemarks = (req, res) => {
  let { role, query_type , sql} = req.params;
  if(query_type=='my_status')
    sql = `SELECT * FROM my_status (:role)`
  else
    sql = `SELECT * FROM others_status (:role)`
    
  db.sequelize.query(sql, {replacements: {  role  }  })
    .then((results) => {
      let data = results[0];
      res.json({ success: true, data:data.length?data[0]:[] });
    })
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getRemark = (req, res) => {
  let { id , query_type, sql} = req.params;
  sql = `SELECT * FROM `
  if(query_type === 'next'){
    sql +=  ` get_next_status (:id)`
  }else{
    sql +=  ` get_status (:id)`
  }
  db.sequelize.query(sql, {replacements: {  id  }  })
    .then((data) =>  res.json({ success: true, data:data[0] })  )
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getComments = (req, res) => {
  let { id } = req.params;
  const sql = `SELECT * FROM public."Comments" WHERE "ApplicationId"=${id} ORDER BY id DESC`;

  db.sequelize
    .query(sql)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getRegistry = (req, res) => {
  let { id } = req.params;
  const sql = `SELECT * FROM public."Applications" WHERE id=${id} `;

  db.sequelize
    .query(sql)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((error) => {
      console.log({ error });
      res.status(500).json({ success: false, error });
    });
};

export const getRecommendation = (req, res) => {
  const { id } = req.params;
  Recommendation.findOne({ where: { id } })
    .then((result) => res.json({ success: true, result }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getDepartmentUnit = (req, res) => {
  db.sequelize
    .query(`SELECT * FROM public."DepartmentUnits"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const resolveRemark = (req, res) => {
  Remark.findOne({ where: { id: req.body.id } })
    .then((data) => {
      data.update({ status: req.body.status }).then().catch();
      res.json({ status: true, data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ status: false, error, msg: "Error in updating remark" });
    });
};
export const rejectRegistry = (req, res) => {
  const { id, status } = req.params;
  const { forward_to, forward_by, remark } = req.body;
  Application.update(
    {
      forward_to,
      forward_by,
      status,
      remark,
    },
    { where: { id: applicationId } }
  )
    .then((result) => {})
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const updateRegistry = (req, res) => {
  let { forward_to, status, forward_by, remark, id } = req.body;
  db.sequelize
    .query(`CALL make_remark (:id, :status, :remark, :forward_to,:forward_by)`,
      {replacements: {forward_by,forward_to,status,remark,id } })
    .then((results) => res.json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getMailBadge = (req, res) => {
  db.sequelize
    .query(
      `SELECT COUNT(forward_to) as badges FROM applications  WHERE forward_to='${req.user.role}'`
    )
    .then((results) => res.json({ success: true, data: results[0][0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getAppPreview = (req, res) => {
  db.sequelize
    .query(`SELECT * FROM public."Applications"  WHERE id='${req.params.id}' `)
    .then((data) => {
      res.json({ success: true, data: data[0] });
    })
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getLetterTemplateName = (req, res) => {
  db.sequelize
    .query(`SELECT name FROM letter_template`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getLetterBody = (req, res) => {
  const { letter } = req.params;
  db.sequelize
    .query(`SELECT letter_body FROM letter_template where name="${letter}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};
export const getGroundRent = (req, res) => {
  const { land, range } = req.params;
  db.sequelize
    .query(`call get_ground_rent(:land,:range)`, {
      replacements: {
        land,
        range,
      },
    })
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getUseRateCat = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT land_use_rate_cat FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};
export const getReviewRange = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT review_range FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getImagesURL = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT image_url FROM images WHERE id="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};
export const getImageRemark = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT remarks FROM remarks WHERE tag_no="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getDepartment_Position = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`select name as position from public."DepartmentUnits"`)
    .then((results) => res.json({ success: true, data: results[0]}))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const getRoles = (req, res) => {
  // const { id } = req.user.id;
  db.sequelize
    .query(`SELECT  distinct forward_by as role FROM public."Remarks" group by (role) order by role`)
    .then((data) => {
      res.json({ success: true, data:data[0]});
    })
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const directorLand = (req, res) => {
  const { id } = req.body;
  db.sequelize
    .query(
      `update applications set status='Director Land' where file_no='${id}' `
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};
export const getForwardToDirector = (req, res) => {
  db.sequelize
    .query(`select * from applications WHERE  forward_to='Director'`)
    .then((results) => res.json({ success: true, data: results }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};
// where status='New' and forward_to='${req.params[0].position}'
export const get_file_number = (req, res) => {
  // console.log(req.params[0].position);
  db.sequelize
    .query(
      `select file_code,max(id)+1 as id from file_number where file_code in('COM','RES','IND') group by file_code  `
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

export const updateFileNumber = (req, res) => {
  console.log(req.body);
  db.sequelize
    .query(
      `update file_number set id ='${req.body.code}' where file_code= '${req.body.id}' `
    )
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};
export const get_recommendation = (req, res) => {
  db.sequelize
    .query(
      `select * from public."Applications" where forward_to='${req.params.user}' AND status in ('Recommended')`
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};
