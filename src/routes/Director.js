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
  updateRegistry,
  getMailBadge,
  getLetterTemplateName,
  getLetterBody,
  createRateCharge,
  getUseRateCat,
  getReviewRange,
  getGroundRent,
  getMailTable,
  getImagesURL,
  getImageRemark,
  createUser,
  getDepartment_Position,
  getPostion,
  getUnit
} from '../controllers/Director';

module.exports = (app) => {
  app.post('/api/registory/create', createRegistory);
  app.get('/api/use/rate/cat', getUseRateCat);
  app.get('/api/get/review/range', getReviewRange);
  app.post('/api/rate/charge', createRateCharge);
  app.get('/api/get/department/position',getDepartment_Position)
  app.get('/api/get/position',getPostion)
  app.post('/api/site_file/create', createSiteFile);
  app.post('/api/letter_template/create', createLetterTemplate);
  app.post('/api/departmentunit/create', createDepartmentunit);
  app.post('/api/department/create', createDepartment);
  app.post('/api/directors/create', createDirectors);
  app.post('/api/create/user',createUser);
  app.get('/api/get/department', getDepartment);
  app.get('/api/get/registry', getRegistry);
  app.get('/api/get/mail/table',getMailTable)
  app.get('/api/get/remarks/:tag_no', getRemarks);
  app.get('/api/get/images/URL/:id',getImagesURL)
  app.get('/api/get/imageRemark/:id',getImageRemark)
  app.get('/api/get/department_unit', getDepartmentUnit);
  app.get('/api/generated_id', generatedId);
  app.post('/api/update/registry', updateRegistry);
  app.get('/api/get/mail/badge',getMailBadge);
  app.get('/api/get/letter/template/name',getLetterTemplateName);
  app.get('/api/get/letter/body/:letter',getLetterBody)
  app.get('/api/get/groundrent/:land/:range',getGroundRent)
  app.get('/api/get/unit/:department',getUnit)
};
