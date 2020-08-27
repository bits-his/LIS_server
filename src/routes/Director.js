import {
  createRegistory,
  createSiteFile,
  createLetterTemplate,
  createDepartmentunit,
  createDepartment,
  getDepartment,
  createDirectors,
  getRegistry,
  getRemarks,
  getDepartmentUnit,
  generatedId,
} from '../controllers/Director';

module.exports = (app) => {
  app.post('/api/registory/create', createRegistory);
  app.post('/api/site_file/create', createSiteFile);
  app.post('/api/letter_template/create', createLetterTemplate);
  app.post('/api/departmentunit/create', createDepartmentunit);
  app.post('/api/department/create', createDepartment);
  app.post('/api/directors/create', createDirectors);
  app.get('/api/get/department', getDepartment);
  app.get('/api/get/registry', getRegistry);
  app.get('/api/get/remarks/:tag_no', getRemarks);
  app.get('/api/get/department_unit', getDepartmentUnit);
  app.get('/api/generated_id', generatedId);
};
