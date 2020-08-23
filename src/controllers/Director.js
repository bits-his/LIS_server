import db from '../models';

export const createRegistory = (req, res) => {
  const { acknowlegment_id, today, tag, remark } = req.body;
  // console.log(data);
  db.sequelize
    .query(
      `INSERT INTO registry(Acknolegment_id,registry_date,tag_no,remarks) VALUES ("${acknowlegment_id}","${today}","${tag}","${remark}")`
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
  const { date, sitNo, compensationPurpose, remarks } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO sit_file(sit_file_date,sit_no,compensation_purpose,remarks) VALUES ("${date}","${sitNo}","${compensationPurpose}","${remarks}")`
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
//   const { date, department, description, location } = req.body;
//   console.log(req.body);
//   db.sequelize
//     .query(
//       `INSERT INTO department(department_date,department_code,description,location) VALUES ("${date}","${department}","${description}","${location}")`
//     )
//     .then((results) => {
//       res.json({ results });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ err });
//     });
// };

export const createDepartment = (req, res) => {
  const {
    date,
    department,
    description,
    location,
    unitName,
    newlocation,
  } = req.body;
  // console.log(data);
  db.sequelize
    .query(
      `INSERT INTO department(department_date,department_code,description,location) VALUES ("${date}","${department}","${description}","${location}")`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO departments_units(department_code,unit_name,unit_location) VALUES ("${department}","${unitName}","${newlocation}")`
      );
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
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
  const {} = req.params;
  db.sequelize
    .query('SELECT department_code FROM department')
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
