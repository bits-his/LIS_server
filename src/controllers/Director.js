import db from "../models";
const {
  Application,
  Role,
  Recommendation,
  Remark
} = db

export const createRegistry = (req, res) => {
  const { 
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
    status, } = req.body;

    Application.create({
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
    .catch((err) => res.status(500).json({ success: false, error:err }));
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
    .catch((err) => res.status(500).json({ success: false, error:err }));
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
    .catch((err) => res.status(500).json({ success: false, error:err }));
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
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
export const getUnit = (req, res) => {
  db.sequelize
    .query(
      `SELECT unit_name FROM departments_units where department_code='${req.params.department}'`
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};

export const getRegistry = (req, res) => {

  Application.findAll({
    where:{forward_to:req.user.role},
    include:[{
      model: Remark,
      as: 'Remarks',
      wehere:{
        applicationId:Application.id
      },
      required: false
    }],
    limit:10   
  })
  .then((results) => res.json({ success: true, results}))
  .catch((error) => res.status(500).json({ success: false, error }));
};

export const getRegistryByRole = (req, res) => {

  Application.findAll({
    where:{forward_to:req.params.role},
    include:[{
      model: Remark,
      as: 'Remarks',
      wehere:{
        applicationId:Application.id
      },
      required: false
    }],
    limit:10   
  })
  .then((results) => res.json({ success: true, results}))
  .catch((error) => res.status(500).json({ success: false, error }));
};

export const getRegistryByRoleAndType = (req, res) => {

  Application.findAll({
    where:{status:req.params.option, forward_to:req.params.role},
    include:[{
      model: Remark,
      as: 'Remarks',
      wehere:{
        applicationId:Application.id
      },
      required: false
    }],
    limit:10   
  })
  .then((results) => res.json({ success: true, results}))
  .catch((error) => res.status(500).json({ success: false, error }));
};

export const getRegistryOption = (req, res) => {
  const option = req.params.option
  let status = 'New File'
  if(option!==''){
    status = option
  }
  Application.findAll({
    where:{forward_by:req.user.role, status},
    include:[{
      model: Remark,
      as: 'Remarks',
      wehere:{
        applicationId:Application.id
      },
      order: [
        [db.sequelize.fn('max', db.sequelize.col('id')), 'DESC'],
      ],
      limit:1
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
          applicationId:Application.id
        },
        required: false
      }]})
    .then((results) => res.json({ success: true, results }))
    .catch((error) => res.status(500).json({ success: false, error }));
};
export const makeRecommendation = (req, res) => {
  const {
    term,
    proposed_dev, 
    annual_rent, 
    dev_charges,
    survey_charges,
    proposed_dev_time,
    applicationId,
    forward_by,
  } = req.body
  // res.send(req.body)
   
  Recommendation.create({
    term,
    proposed_dev, 
    annual_rent, 
    dev_charges,
    survey_charges,
    proposed_dev_time,
    submittedBy: forward_by,
    submittedDate: Date('YYYY-MM-DD'),
    status:req.body.disapproved===true?'Disapproved':'Approved'
  })

  .then((result) => {
    Application.findOne({where:{id:applicationId}})
    .then(data=>{
      data.update({
        status:'Raised', 
        recommendationId:result.id,
        forward_by,
        forward_to:'PS'
      })
    })
    res.json({ success: true, result})
  })
  .catch((error) => res.status(500).json({ success: false, error }));
}
export const getAllRemarks = (req, res) => {
  const { role, status } = req.params;
  let qr = { where:{ forward_to:role}}
  if(status==='Treated'){
    qr ={ where:{forward_by:role }}
  }else if(status==='New File'){
    qr.where.status = 'Treated'
  }
  qr.limit = 10;
  Application.findAll(qr)
  .then((results) => res.json({ success: true, results }))
  .catch((error) => res.status(500).json({ success: false, error }));
};
export const setRecommendation = (req, res) => {
  const {id, status} = req.params
  let doneBy = req.user.role
  let subjectTo = ''
  let qr = {
    status:'Approved',
  }
  if(doneBy==='PS'){
    subjectTo ='Commissioner'
    qr.approvedBy = req.user.role,
    qr.approvedDate =Date('YYYY-mm-dd')
  }else{
    subjectTo ='PS'
    qr.stampedBy = req.user.role,
    qr.stampDate =Date('YYYY-mm-dd')
    qr.status='Stamped'
  }
  Application.findOne({where:{recommendationId:id}})
  .then((result) =>{
    result.update({
      remark:status, 
      status,
      forward_by:req.use.role,
      forward_to:subjectTo
    });
  })
  Recommendation.findOne({where:{id}})
    .then((result) =>{
      result.update(qr);
      Application.findOne({where:{recommendationId:id}})
      .then((result) =>{
         result.update({
          remark:status, 
          status,
          forward_by:req.user.role,
          forward_to:subjectTo
        });

      })
    .catch((error) => res.status(500).json({ success: false, error }));
    res.send({staus:true, result})
  })
  .catch((error) => res.status(500).json({ success: false, error }));
};
export const getRecommendation = (req, res) => {
  const {id} = req.params
  Recommendation.findOne({where:{id}})
  .then((result) => res.json({ success: true, result }))
  .catch((error) => res.status(500).json({ success: false, error }));
};

export const getRecommendations = (req, res) => {
  const { role, status } = req.params;
  let sql = "SELECT * FROM `applications` WHERE status =:status AND forward_to=:forward_to AND forward_by=:forward_by ORDER BY id ASC LIMIT 10"
  let forward_by = ''
  let forward_to = ''
  if(status==='Treated'){
    if(role==='PS'){
      forward_by = 'Director Land'
      forward_to='PS'
    }else{
      console.log({sql})
      forward_by = 'PS'
      forward_to='Director Land'
    }
  }else if(status=='Raised'){
    if(role==='PS'){
      forward_by ='Director Land'
      forward_to='PS'
    }else{
      forward_by = 'PS'
      forward_to='Director Land'
    }
  }else if(status ==='Approved'){
    if(role==='PS'){
      forward_by = 'PS'
      forward_to='Commissioner'
    }else if(role==='Commissioner'){
      forward_by = 'PS'
      forward_to='Commissioner'
    }else{
      forward_by = 'Director Land'
      forward_to='PS'
    }
  }
  else if(status ==='Stamped'){
    if(role==='PS'){
      forward_by = 'Commissioner'
      forward_to='PS'
    }else if(role==='Commissioner'){
      forward_by = 'Commissioner'
      forward_to='PS'
    }
  }
 
  // res.send(sql)
  // Application.findAll(qr)
  db.sequelize
  .query(sql
    ,
    {
    replacements: 
    {
    forward_by,
    forward_to,
    status
  }
}
)
  .then((results) => res.json({ success: true, results:results[0] }))
  .catch((error) => res.status(500).json({ success: false, error }));
};

export const getDepartmentUnit = (req, res) => {
  db.sequelize
    .query("SELECT * FROM departments_units")
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};

export const generatedId = (req, res) => {
  db.sequelize
    .query(
      "SELECT CONCAT(IF NULL(MAX(id), 0) + 1) AS acknowlegment FROM applications"
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
export const resolveRemark = (req, res) => {
  Remark.findOne({ where:{id:req.body.id }
  })
  .then((data)=>{ 
    data.update({status:req.body.status})
    .then()
    .catch()
    res.json({ status:true, data  })
  })
  .catch((error) => { res.status(500).json({ status:false, error , msg:'Error in updating remark'})});
}
export const updateRegistry = (req, res) => {
  const {
    forward_to,
    forward_by,
    remark,
    applicationId,
  } = req.body;

  db.sequelize.query( `UPDATE applications SET forward_to='${forward_to}',
    forward_by='${forward_by}', status='Treated', remark='${remark}' WHERE id=${applicationId}`)
  .catch((error) => res.status(500).json({  status:false, error }));

  Remark.findOne({
    where:{applicationId, forward_by: forward_by}
  }).then((data)=>
  {
    if(data && data.forward_to==forward_to)
    {
      data.update({
        forward_to:forward_to,
        forward_by:forward_by,
        remark
      })
      // .then((app)=>
      // { 
        // res.json({ status:true, data  })
        Application.findOne({
          where:{id:applicationId}
        })
        .then((data)=>{ res.json({ status:true, data  }) })
      // })
      .catch((error) => { res.status(500).json({ status:false, error , msg:'Error in updating remark'})});
    }else{
      Remark.create({
        forward_to:forward_to,
        forward_by:forward_by,
        remark,
        applicationId
      })
      // db.sequelize.query( `INSERT INTO remarks forward_to='${forward_to}, forward_by='${forward_by}', applicationId='${applicationId}' `)
      // .then((data)=>{ res.json({ status:true, data  })})
      // .then((remark)=>
      // { 
        // res.json({ status:true, data  })
        Application.findOne({
            where:{id:applicationId}
        })
        .then((data)=>{ res.json({ status:true, data  })})
      // })
      .catch((error) => { res.status(500).json({ status:false, error })});
    }
  })
};

export const getMailBadge = (req, res) => {
  db.sequelize
    .query(`SELECT COUNT(forward_to) as badges FROM applications  WHERE forward_to='${req.user.role}'`)
    .then((results) => res.json({ success: true, data: results[0][0]}))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
export const getMailTable = (req, res) => {
  db.sequelize
    .query('SELECT * FROM applications  WHERE forward_to="Ps"')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
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
  let role = req.params.role
  if(role){
    Application.findOne({where:{ id:req.params.id},
    include:[{
      model: Remark,
      as: 'Remarks',
      wehere:{
        applicationId:Application.id
      },
      required: false
    }],})
    .then(data=>{
      res.json({ success: true, data })
    })
    .catch((err) => res.status(500).json({ success: false, error:err }));
  }else{
    Application.findOne({where:{ id:req.params.id}})
      .then(data=>{
        data[Remarks]=[]
        res.json({ success: true, data })
      })
      .catch((err) => res.status(500).json({ success: false, error:err }));
  }
  
}

export const getLetterTemplateName = (req, res) => {
  db.sequelize
    .query(`SELECT name FROM letter_template`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};

export const getLetterBody = (req, res) => {
  const { letter } = req.params;
  db.sequelize
    .query(`SELECT letter_body FROM letter_template where name="${letter}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
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
    .catch((err) => res.status(500).json({ success: false, error:err }));
};

export const getUseRateCat = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT land_use_rate_cat FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
export const getReviewRange = (req, res) => {
  db.sequelize
    .query(`SELECT DISTINCT review_range FROM ground_rent`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};

export const getImagesURL = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT image_url FROM images WHERE id="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
export const getImageRemark = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT remarks FROM remarks WHERE tag_no="${id}"`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};

export const getDepartment_Position = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`call get_department_position()`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};

export const getRoles = (req, res) => {
  // const { id } = req.user.id;
  db.sequelize
    .query("SELECT role FROM  `users` WHERE role !=''" )
    .then((results) => {
      console.log(results[0])
      res.json({ success: true, data: results[0] })})
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
export const directorLand = (req, res) => {
  const { id } = req.body;
  db.sequelize
    .query(
      `update applications set status='Director Land' where file_no='${id}' `
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
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
    .catch((err) => res.status(500).json({ success: false, error:err }));
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
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
// export const get_new_file = (req, res) => {
//   let data = req.params.newFile.split(',');

//   console.log(data);
//   db.sequelize
//     .query(
//       `select * from applications where forward_to='${req.params.user}' AND status in ('New File)`
//     )
//     .then((results) => res.json({ success: true, results: results[0] }))
//     .catch((err) => res.status(500).json({ success: false, error:err }));
// };
export const get_new_mail = (req, res) => {
  // let data = req.params.newFile.split(',');
  // console.log(data);
  db.sequelize
    .query(
      `select * from applications where forward_by='${req.params.user}' AND status in ('New Mail')`
    )
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
}

// export const psApplication = (req, res) => {
//   const {
//     forward_to,
//     forward_by,
//     remark,
//     applicationId,
//   } = req.body;
//       db.sequelize.query( `UPDATE applications SET forward_to='${forward_to}',
//       forward_by='${forward_by}', remark='${remark}' WHERE id=${applicationId}`)
//     .then(() => {
      
//       //res.json({ success: true, msg:'data inserted'})
//     })
//   .catch((error) => res.status(500).json({  status:false, error }));

//   Remark.findOne({
//     where:{applicationId, forward_by: forward_by}
//   }).then((data)=>{
//     if(data && data.forward_to==forward_to){
//       data.update({
//         forward_to:forward_to,
//         forward_by:forward_by,
//         remark
//       })
//       .then((data)=>{ res.json({ status:true, data  })})
//       .catch((error) => { res.status(500).json({ status:false, error , msg:'Error in updating remark'})});
//     }else{
//       Remark.create({
//         forward_to:forward_to,
//         forward_by:forward_by,
//         remark,
//         applicationId
//       })
//       // db.sequelize.query( `INSERT INTO remarks forward_to='${forward_to}, forward_by='${forward_by}', applicationId='${applicationId}' `)
//     .then((data)=>{ res.json({ status:true, data  })})
//       .catch((error) => { res.status(500).json({ status:false, error , msg:'Error in creating remark'})});
    
//     }
//   }) 
//   // .then((data)=>{ res.json({ status:true, data  })})
    
//   .catch((error) => { res.status(500).json({ status:false, error })});

// };
