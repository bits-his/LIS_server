import db from '../models';

export const createRegistory = (req, res) => {
  const { acknowlegment_id, today, tag, remark } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO registory(Acknolegment_id,regisrory_date,tag_no,remarks) VALUES ("${acknowlegment_id}","${today}","${tag}","${remark}")`
    )
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => res.status(500).json({ err }));
};
