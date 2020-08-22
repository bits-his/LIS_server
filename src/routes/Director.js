import {
  createRegistory,
  createSiteFile,
  createLetterTemplate,
  createDepartment,
} from '../controllers/Director';

module.exports = (app) => {
  app.post('/api/registory/create', createRegistory);
  app.post('/api/site_file/create', createSiteFile);
  app.post('/api/letter_template/create', createLetterTemplate);
  app.post('/api/department/create', createDepartment);
};
