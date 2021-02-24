import db from "../models";
const Application = db.Application
const Role = db.Role
const Remark = db.Remark

export const createRegistry = (req, res) => {
  const { 
    acknowlegment_id,
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
    status, } = req.body;

    Application.create({
      acknowlegment_id,
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
    })
    .then((application) => res.json({ success: true, data:application }))
    .catch((err) => res.status(500).json({ success: false, msg:err }));
};

export const createSiteFile = (req, res) => {
  const { date, sitNo, purpose, type, remarks } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO sit_file(sit_file_date,sit_no,purpose,type,remarks) VALUES ("${date}","${sitNo}","${purpose}","${type}","${remarks}")`
    )
    .then((results) => res.json({ success: true }))
    .catch((err) => res.status(500).json({ err }));
};
export const createUser = (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    role,
    accessTo,
    department,
    position,
  } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO users(department,position, lastname, role, accessTo, username, email, password) VALUES ("${department}","${position}","${lastname}","${role}","${accessTo}","${username}","${email}","${password}")`
    )
    .then((results) => res.json({ success: true }))
    .catch((err) => res.status(500).json({ err }));
};
export const createLetterTemplate = (req, res) => {
  const {
    today,
    department,
    name,
    description,
    purpose,
    letter_body,
  } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO letter_template( template_date,department,name,description,purpose,letter_body) VALUES ("${today}","${department}","${name}","${description}","${purpose}",'${letter_body}')`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ err }));
};

export const createRateCharge = (req, res) => {
  console.log(req.body);
  db.sequelize
    .query(
      `call rate_charges("${req.body.area}","${req.body.owner}","${req.body.category}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ err }));
};

export const createDepartment = (req, res) => {
  const { date, department, description, location } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO department(department_date,department_code,description,location) VALUES ('${date}','${department}','${description}','${location}')`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ${req.body.Data.map(
          (a) => "(?)"
        ).join(",")}`,
        {
          replacements: req.body.Data,
        }
      );
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

// export const createDepartmentunit = (req, res) => {
//   const { data } = req.body;
//   console.log(data);
//   db.sequelize
//     .query(
//       `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ${data
//         .map((a) => '(?)')
//         .join(',')}`,
//       {
//         replacements: data,
//       }
//     )
//     // .then(() => {
//     //   db.sequelize.query(
//     //     `
//     //       .map((a) => '(?)')
//     //       .join(',')}`,
//     //     {
//     //       replacements: data,
//     //     }
//     //   );
//     // })
//     .then((results) => res.json({ success: true, results }))
//     .catch((err) => {
//       console.log(err);
//       res.json({ success: false, err });
//     });
// };

export const createDirectors = (req, res) => {
  const { department, position, unit, position_name } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO directors(department,position,other_unit_name,other_position) VALUES ('${department}','${position}','${unit}','${position_name}')`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

export const getDepartment = (req, res) => {
  db.sequelize
    .query("SELECT department_code FROM department")
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getUnit = (req, res) => {
  db.sequelize
    .query(
      `SELECT unit_name FROM departments_units where department_code='${req.params.department}'`
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getRegistry = (req, res) => {
  Application.findAll({
    where:{forward_to:req.user.role},
    include:[{
      model: Remark,
      as: 'Remarks',
      wehere:{
        application_id:Application.id
      },
      required: false
    }],
    limit:10   
  })
  .then((results) => res.json({ success: true, results}))
  .catch((error) => res.status(500).json({ success: false, error }));
};

export const getRemarks = (req, res) => {
  const { id } = req.params;
    Application.findOne({where:{id},
      include:[{
        model: Remark,
        as: 'Remarks',
        wehere:{
          application_id:Application.id
        },
        required: false
      }]})
    .then((results) => res.json({ success: true, results }))
    .catch((error) => res.status(500).json({ success: false, error }));
};

export const getDepartmentUnit = (req, res) => {
  const {} = req.params;
  db.sequelize
    .query("SELECT * FROM departments_units")
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const generatedId = (req, res) => {
  db.sequelize
    .query(
      "SELECT CONCAT(IFNULL(MAX(id), 0) + 1) AS acknowlegment FROM applications"
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const updateRegistry = (req, res) => {
  console.log(req.body);
  db.sequelize
    .query(
      `UPDATE applications set forward_to="${req.body.ps}" where tag_no="${req.body.tagNo}"`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO remarks(tag_no, remarks) VALUES ("${req.body.tagNo}","${req.body.remark}")`
      );
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

export const getMailBadge = (req, res) => {
  db.sequelize
    .query('SELECT COUNT(forward_to) as Ps FROM applications  WHERE forward_to="Ps"')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getMailTable = (req, res) => {
  db.sequelize
    .query('SELECT * FROM applications  WHERE forward_to="Ps"')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const forwardToMe = (req, res) => {
  let user = req.user
  
  Application.findAll({where:{ forward_to:user.role, status:'New File'}})
  .then(data=>{
    res.json({ success: true, data })
  })
  .catch((err) => res.status(500).json({  success: false, msg: err }));
}

export const getAppPreview = (req, res) => {
  Application.findOne({where:{ id:req.params.id}})
  .then(files=>{
    res.json({ success: true, data: files })
  })
  .catch((err) => res.status(500).json({ err }));
}

export const getLetterTemplateName = (req, res) => {
  db.sequelize
    .query(`SELECT name FROM letter_template`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getLetterBody = (req, res) => {
  const { letter } = req.params;
  db.sequelize
    .query(`SELECT letter_body FROM letter_template where name="${letter}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
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
    .catch((err) => res.status(500).json({ err }));
};

export const getUseRateCat = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT land_use_rate_cat FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getReviewRange = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT review_range FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getImagesURL = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT image_url FROM images WHERE id="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getImageRemark = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT remarks FROM remarks WHERE tag_no="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getDepartment_Position = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`call get_department_position()`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getRoles = (req, res) => {
  // const { id } = req.user.id;
  db.sequelize
    .query("SELECT id, title AS role FROM `roles` where title!=''")
    .then((results) => {
      console.log(results[0])
      res.json({ success: true, data: results[0] })})
    .catch((err) => res.status(500).json({ err }));
};
export const directorLand = (req, res) => {
  const { id } = req.body;
  db.sequelize
    .query(
      `update applications set status='Director Land' where file_no='${id}' `
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getForwardToDirector = (req, res) => {
  
  db.sequelize
    .query(
      `select * from applications WHERE  forward_to='Director'`
    )
    .then((results) => res.json({ success: true, data: results }))
    .catch((err) => res.status(500).json({   success: false, error:err}));
};
// where status='New' and forward_to='${req.params[0].position}'
export const get_file_number = (req, res) => {
  // console.log(req.params[0].position);
  db.sequelize
    .query(
      `select file_code,max(id)+1 as id from file_number where file_code in('COM','RES','IND') group by file_code  `
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
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
  // let data = req.params.newFile.split(',');

  // console.log(data);
  db.sequelize
    .query(
      `select * from applications where forward_to='${req.params.user}' AND status in ('Recommended')`
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
// export const get_new_file = (req, res) => {
//   let data = req.params.newFile.split(',');

//   console.log(data);
//   db.sequelize
//     .query(
//       `select * from applications where forward_to='${req.params.user}' AND status in ('New File)`
//     )
//     .then((results) => res.json({ success: true, results: results[0] }))
//     .catch((err) => res.status(500).json({ err }));
// };
export const get_new_mail = (req, res) => {
  // let data = req.params.newFile.split(',');
  // console.log(data);
  db.sequelize
    .query(
      `select * from applications where forward_by='${req.params.user}' AND status in ('New Mail')`
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
}

export const psApplication = (req, res) => {
  const {
    forward_to,
    forward_by,
    remark,
    id,
  } = req.body;
      db.sequelize.query( `UPDATE applications SET forward_to='${forward_to}',
      forward_by='${forward_by}', remark='${remark}', } WHERE id=${id}`)
    .then((results) => {
      Remark.create({
        remark_to,
        remark_by,
        remark,
        application_id:id,
      })
      .then()
      .catch((err) => res.status(500).json({ status:false, msg: err }));
      res.json({ success: true, results: results[0] })
    })
  .catch((err) => res.status(500).json({  status:false, msg: err }));
};
