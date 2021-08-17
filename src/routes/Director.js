import passport from "passport";
import config from "../config/config";

const veryfyJwt = passport.authenticate("jwt", { session: false });
import {
  createRegistry,
  createSiteFile,
  createLetterTemplate,
  createDepartment,
  getDepartments,
  createDirectors,
  getRegistries,
  getRemark,
  getRemarks,
  getComments,
  getDepartmentUnit,
  updateRegistry,
  rejectRegistry,
  getMailBadge,
  getLetterTemplateName,
  getLetterBody,
  createRateCharge,
  getUseRateCat,
  getReviewRange,
  getGroundRent,
  getImagesURL,
  getImageRemark,
  getDepartment_Position,
  getRoles,
  getUnit,
  directorLand,
  updateFileNumber,
  get_file_number,
  get_recommendation,
  getAppPreview,
  resolveRemark,
  makeRecommendation,
  // updateRecommendation,
  // getRecommendations,
  getRecommendation,
  // setRecommendation,
  grantQueries
} from "../controllers/Director";
const {api} =config;

module.exports = (app) => {
  app.get(`${api}/`, (req,res)=>{
    res.json('Hello')
  });
  app.post(`${api}/registry/create`, createRegistry);
  app.get(`${api}/use/rate/cat`, getUseRateCat);
  app.get(`${api}/get/review/range`, getReviewRange);
  app.post(`${api}/rate/charge`, createRateCharge);
  app.get(`${api}/get/department/position`, getDepartment_Position);
  app.get(`${api}/get-roles`,  getRoles);
  app.post(`${api}/site_file/create`, createSiteFile);
  app.post(`${api}/letter_template/create`, createLetterTemplate);
  // app.post('/api/departmentunit/create', createDepartmentunit);
  app.post(`${api}/department/create`, createDepartment);
  app.post(`${api}/directors/create`, createDirectors);
  app.get(`${api}/get/departments`, getDepartments);
  app.get(`${api}/get/registry/role/:role`, veryfyJwt, getRegistries);
  app.get(`${api}/get/remarks/:query_type/:role`, veryfyJwt, getRemarks);
  app.get(`${api}/get/remark/:query_type/:id`, veryfyJwt, getRemark);
  app.get(`${api}/get/registries/:status/:role`, veryfyJwt, getRegistries);
  app.get(`${api}/get/images/URL/:id`, getImagesURL);
  app.get(`${api}/get/imageRemark/:id`, getImageRemark);
  app.get(`${api}/get/department_unit`, getDepartmentUnit);
  app.post(`${api}/update/registry`, veryfyJwt, updateRegistry);
  app.post(`${api}/reject/registry`, veryfyJwt, rejectRegistry);
  app.post(`${api}/director/land`, directorLand);
  app.get(`${api}/get/mail/badge`, veryfyJwt, getMailBadge);
  app.get(`${api}/get/letter/template/name`, getLetterTemplateName);
  app.get(`${api}/get/letter/body/:letter`, getLetterBody);
  app.get(`${api}/get/groundrent/:land/:range`, getGroundRent);
  app.get(`${api}/get/unit/:department`, getUnit);
  app.get(`${api}/get/file/number`, get_file_number);
  app.post(`${api}/update/file/number`, updateFileNumber);
  app.get(`${api}/get/recomendation/:user`, get_recommendation);
  app.get(`${api}/application/preview/:id/:role`, getAppPreview);
  app.post(`${api}/application/remark/status`, resolveRemark);
  app.post(`${api}/recommend`, veryfyJwt, makeRecommendation);
  // app.post(`${api}/update/recommendation`, veryfyJwt, updateRecommendation);
  // app.get(`${api}/recommend/list/:status/:role`, veryfyJwt, getRecommendations);
  app.get(`${api}/get/recommendation/:id`, veryfyJwt, getRecommendation);
  app.get(`${api}/get/comments/:id`, veryfyJwt, getComments);
  // app.get(`${api}/set/recommendation/:id/:status`, veryfyJwt, setRecommendation);
  // GRANT ROUTES
  app.post(`${api}/post/grant-letter`, veryfyJwt, grantQueries);
};
