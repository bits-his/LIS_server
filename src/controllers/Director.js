import db from '../models';

export const createRegistory = (req, res) => {
  const { acknowlegment_id, today, tag, remark, forwardTo, from } = req.body;
  // console.log(data);
  db.sequelize
    .query(
      `INSERT INTO registry(Acknolegment_id,registry_date,tag_no,remarks,file_from,file_to) VALUES ("${acknowlegment_id}","${today}","${tag}","${remark}","${from}","${forwardTo}")`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO remarks(remarks_id,date_of_remarks,tag_no,remarks) VALUES ("${acknowlegment_id}","${today}","${tag}","${remark}")`
      );
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

export const createSiteFile = (req, res) => {
  const { date, sitNo, purpose, type,remarks } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO sit_file(sit_file_date,sit_no,purpose,type,remarks) VALUES ("${date}","${sitNo}","${purpose}","${type}","${remarks}")`
    )
    .then((results) => {
      res.json({ results });
    })
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
      `INSERT INTO letter_template( template_date,department,name,description,purpose,letter_body) VALUES ("${today}","${department}","${name}","${description}","${purpose}","${letter_body}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ err }));
};

// export const createDepartment = (req, res) => {
//   const { data } = req.body;
//   console.log(data);
//   db.sequelize
//     .query(
//       `INSERT INTO department(department_date,department_code,description,location) VALUES ("${req.body.date}","${req.body.department}","${req.body.description}","${req.body.location}")`
//     )
//     .then(() => {
//       db.sequelize.query(
//         `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ("${req.body.department}","${req.body.unitName}","${req.body.unit_location}")`
//       );
//     })
//     .then((results) => res.json({ success: true, results }))
//     .catch((err) => res.json({ success: false, err }));
// };

export const createDepartment = (req, res) => {
  const { date, department, description, location } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO department(department_date,department_code,description,location) VALUES ("${date}","${department}","${description}","${location}")`
    )
    // .then(() => {
    //   db.sequelize.query(
    //     `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ("${department}","${unitName}","${req.body.unit_location}")`
    //   );
    // })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
};

export const createDepartmentunit = (req, res) => {
  const { data } = req.body;
  console.log(data);
  db.sequelize
    .query(
      `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ${data
        .map((a) => '(?)')
        .join(',')}`,
      {
        replacements: data,
      }
    )
    // .then(() => {
    //   db.sequelize.query(
    //     `
    //       .map((a) => '(?)')
    //       .join(',')}`,
    //     {
    //       replacements: data,
    //     }
    //   );
    // })
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
      `INSERT INTO directors(department,position,other_unit_name,other_position) VALUES ("${department}","${position}","${unit}","${position_name}")`
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
    .query('SELECT department_code FROM department')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const getRegistry = (req, res) => {
  db.sequelize
    .query('SELECT registry_date,tag_no FROM `registry`')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};

export const getRemarks = (req, res) => {
  const { tag_no } = req.params;
  db.sequelize
    .query(`SELECT remarks FROM remarks WHERE tag_no="${tag_no}" order by id`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
