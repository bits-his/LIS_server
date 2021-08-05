"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _config = require("../config/config");

var _config2 = _interopRequireDefault(_config);

var _Director = require("../controllers/Director");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var veryfyJwt = _passport2.default.authenticate("jwt", { session: false });
var api = _config2.default.api;


module.exports = function (app) {
  app.get(api + "/", function (req, res) {
    res.json('Hello');
  });
  app.post(api + "/registry/create", _Director.createRegistry);
  app.get(api + "/use/rate/cat", _Director.getUseRateCat);
  app.get(api + "/get/review/range", _Director.getReviewRange);
  app.post(api + "/rate/charge", _Director.createRateCharge);
  app.get(api + "/get/department/position", _Director.getDepartment_Position);
  app.get(api + "/get-roles", _Director.getRoles);
  app.post(api + "/site_file/create", _Director.createSiteFile);
  app.post(api + "/letter_template/create", _Director.createLetterTemplate);
  // app.post('/api/departmentunit/create', createDepartmentunit);
  app.post(api + "/department/create", _Director.createDepartment);
  app.post(api + "/directors/create", _Director.createDirectors);
  app.get(api + "/get/department", _Director.getDepartment);
  app.get(api + "/get/registry/role/:role", veryfyJwt, _Director.getRegistries);
  app.get(api + "/get/remarks/:query_type/:role", veryfyJwt, _Director.getRemarks);
  app.get(api + "/get/remark/:query_type/:id", veryfyJwt, _Director.getRemark);
  app.get(api + "/get/registries/:status/:role", veryfyJwt, _Director.getRegistries);
  app.get(api + "/get/images/URL/:id", _Director.getImagesURL);
  app.get(api + "/get/imageRemark/:id", _Director.getImageRemark);
  app.get(api + "/get/department_unit", _Director.getDepartmentUnit);
  app.post(api + "/update/registry", veryfyJwt, _Director.updateRegistry);
  app.post(api + "/reject/registry", veryfyJwt, _Director.rejectRegistry);
  app.post(api + "/director/land", _Director.directorLand);
  app.get(api + "/get/mail/badge", veryfyJwt, _Director.getMailBadge);
  app.get(api + "/get/letter/template/name", _Director.getLetterTemplateName);
  app.get(api + "/get/letter/body/:letter", _Director.getLetterBody);
  app.get(api + "/get/groundrent/:land/:range", _Director.getGroundRent);
  app.get(api + "/get/unit/:department", _Director.getUnit);
  app.get(api + "/get/file/number", _Director.get_file_number);
  app.post(api + "/update/file/number", _Director.updateFileNumber);
  app.get(api + "/get/recomendation/:user", _Director.get_recommendation);
  app.get(api + "/application/preview/:id/:role", _Director.getAppPreview);
  app.post(api + "/application/remark/status", _Director.resolveRemark);
  app.post(api + "/recommend", veryfyJwt, _Director.makeRecommendation);
  // app.post(`${api}/update/recommendation`, veryfyJwt, updateRecommendation);
  // app.get(`${api}/recommend/list/:status/:role`, veryfyJwt, getRecommendations);
  app.get(api + "/get/recommendation/:id", veryfyJwt, _Director.getRecommendation);
  app.get(api + "/get/comments/:id", veryfyJwt, _Director.getComments);
  // app.get(`${api}/set/recommendation/:id/:status`, veryfyJwt, setRecommendation);
  // GRANT ROUTES
  app.post(api + "/post/grant-letter", veryfyJwt, _Director.grantQueries);
};