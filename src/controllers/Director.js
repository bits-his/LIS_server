import db from '../models';

export const createRegistory = (req, res) => {
  const { acknowlegment_id, today, tag, remark } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO registry(Acknolegment_id,registry_date,tag_no,remarks) VALUES ("${acknowlegment_id}","${today}","${tag}","${remark}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ err }));
};

export const createSiteFile = (req, res) => {
  const { date, sitNo, compensationPurpose, remarks } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO site_file(site_file_date,site_no,compensation_purpose,remarks) VALUES ("${date}","${sitNo}","${compensationPurpose}","${remarks}")`
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
export const createDepartment = (req, res) => {
  const { date, department, description, location } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO department(department_date,department_code,description,location) VALUES ("${date}","${department}","${description}","${location}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};
