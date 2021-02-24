import passport from 'passport';
const veryfyJwt = passport.authenticate('jwt', { session: false });
import {
  createRegistry,
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
  getRoles,
  getUnit,
  getForwardToDirector,
  directorLand,
  updateFileNumber,
  get_file_number,
  get_recommendation,
  get_new_mail,
  forwardToMe,
  getAppPreview,
  psApplication,
} from '../controllers/Director';
import {
  verifyUserToken
} from '../controllers/user';

module.exports = (app) => {
  app.post('/api/registory/create', createRegistry);
  app.get('/api/get/forward-to/me', veryfyJwt, forwardToMe);
  app.get('/api/use/rate/cat', getUseRateCat);
  app.get('/api/get/review/range', getReviewRange);
  app.post('/api/rate/charge', createRateCharge);
  app.get('/api/get/department/position', getDepartment_Position);
  app.get('/api/get/roles', veryfyJwt,  getRoles);
  app.post('/api/site_file/create', createSiteFile);
  app.post('/api/letter_template/create', createLetterTemplate);
  // app.post('/api/departmentunit/create', createDepartmentunit);
  app.post('/api/department/create', createDepartment);
  app.post('/api/directors/create', createDirectors);
  app.post('/api/create/user', createUser);
  app.get('/api/get/department', getDepartment);
  app.get('/api/get/registry', veryfyJwt, getRegistry);
  app.get('/api/get/mail/table', getMailTable);
  app.get('/api/get/remarks/:id', veryfyJwt, getRemarks);
  app.get('/api/get/images/URL/:id', getImagesURL);
  app.get('/api/get/imageRemark/:id', getImageRemark);
  app.get('/api/get/department_unit', getDepartmentUnit);
  app.get('/api/generated_id', generatedId);
  app.post('/api/update/registry', updateRegistry);
  app.post('/api/director/land', directorLand);
  app.get('/api/get/mail/badge', getMailBadge);
  app.get('/api/get/letter/template/name', getLetterTemplateName);
  app.get('/api/get/letter/body/:letter', getLetterBody);
  app.get('/api/get/groundrent/:land/:range', getGroundRent);
  app.get('/api/get/unit/:department', getUnit);
  app.get('/api/get/file/number', get_file_number);
  app.post('/api/update/file/number', updateFileNumber);
  app.get('/api/get/recomendation/:user', get_recommendation);
  app.get('/api/get/new/mail/:user', get_new_mail);
  app.post('/api/ps/application', psApplication);  
  app.get('/api/application/preview/:id', getAppPreview);
  
};
