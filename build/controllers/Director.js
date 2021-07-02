"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_recommendation = exports.updateFileNumber = exports.get_file_number = exports.getForwardToDirector = exports.directorLand = exports.getRoles = exports.getDepartment_Position = exports.getImageRemark = exports.getImagesURL = exports.getReviewRange = exports.getUseRateCat = exports.getGroundRent = exports.getLetterBody = exports.getLetterTemplateName = exports.getAppPreview = exports.getMailBadge = exports.updateRegistry = exports.rejectRegistry = exports.resolveRemark = exports.getDepartmentUnit = exports.getRecommendation = exports.getRegistry = exports.getComments = exports.getRemark = exports.getRemarks = exports.grantQueries = exports.makeRecommendation = exports.getRegistries = exports.getUnit = exports.getDepartment = exports.createDirectors = exports.createDepartmentunit = exports.createDepartment = exports.createRateCharge = exports.createLetterTemplate = exports.createSiteFile = exports.createRegistry = undefined;

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Application = _models2.default.Application,
    Role = _models2.default.Role,
    Recommendation = _models2.default.Recommendation,
    Remark = _models2.default.Remark;
var createRegistry = exports.createRegistry = function createRegistry(req, res) {
  var _req$body = req.body,
      application_type = _req$body.application_type,
      name = _req$body.name,
      amount = _req$body.amount,
      address = _req$body.address,
      email = _req$body.email,
      phone = _req$body.phone,
      other_info = _req$body.other_info,
      tp_no = _req$body.tp_no,
      plot_no = _req$body.plot_no,
      amount_paid = _req$body.amount_paid,
      reciept_no = _req$body.reciept_no,
      forward_to = _req$body.forward_to,
      forward_by = _req$body.forward_by,
      status = _req$body.status;

  var application_date = (0, _moment2.default)().format("YYYY-MM-DD");
  var year_code = (0, _moment2.default)().format("YYYY");
  _models2.default.sequelize.query("CALL create_file (:year_code,:application_date,:application_type,:name,:amount,:address,:email,:phone,:other_info,:tp_no,:plot_no,:amount_paid,:reciept_no,:forward_to,:forward_by,:status);", { replacements: { year_code: year_code, application_date: application_date, application_type: application_type, name: name, amount: amount, address: address, email: email, phone: phone, other_info: other_info, tp_no: tp_no, plot_no: plot_no, amount_paid: amount_paid, reciept_no: reciept_no, forward_to: forward_to, forward_by: forward_by, status: status } }).then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var createSiteFile = exports.createSiteFile = function createSiteFile(req, res) {
  var _req$body2 = req.body,
      date = _req$body2.date,
      sitNo = _req$body2.sitNo,
      purpose = _req$body2.purpose,
      type = _req$body2.type,
      remarks = _req$body2.remarks;

  console.log(req.body);
  _models2.default.sequelize.query("INSERT INTO sit_file(sit_file_date,sit_no,purpose,type,remarks) \n      VALUES (\"" + date + "\",\"" + sitNo + "\",\"" + purpose + "\",\"" + type + "\",\"" + remarks + "\")").then(function (results) {
    return res.json({ success: true });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var createLetterTemplate = exports.createLetterTemplate = function createLetterTemplate(req, res) {
  var _req$body3 = req.body,
      today = _req$body3.today,
      department = _req$body3.department,
      name = _req$body3.name,
      description = _req$body3.description,
      purpose = _req$body3.purpose,
      letter_body = _req$body3.letter_body;

  console.log(req.body);
  _models2.default.sequelize.query("INSERT INTO letter_template( template_date,department,name,description,purpose,letter_body) \n      VALUES (\"" + today + "\",\"" + department + "\",\"" + name + "\",\"" + description + "\",\"" + purpose + "\",'" + letter_body + "')").then(function (results) {
    res.json({ results: results });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var createRateCharge = exports.createRateCharge = function createRateCharge(req, res) {
  _models2.default.sequelize.query("call rate_charges(\"" + req.body.area + "\",\"" + req.body.owner + "\",\"" + req.body.category + "\")").then(function (results) {
    res.json({ results: results });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var createDepartment = exports.createDepartment = function createDepartment(req, res) {
  var _req$body4 = req.body,
      date = _req$body4.date,
      department = _req$body4.department,
      name = _req$body4.name,
      location = _req$body4.location;

  console.log(req.body);
  _models2.default.sequelize.query("INSERT INTO public.\"Departments\"(code,name,location,\"createdAt\",\"updatedAt\") \n      VALUES ('" + department + "','" + description + "','" + location + "','" + date + "','" + date + "')").then(function () {
    _models2.default.sequelize.query("INSERT INTO DepartmentsUnits(code,name,location) \n        VALUES " + req.body.Data.map(function (a) {
      return "(?)";
    }).join(","), {
      replacements: req.body.Data
    });
  }).then(function (results) {
    return res.json({ success: true, results: results });
  }).catch(function (err) {
    return res.json({ success: false, err: err });
  });
};

var createDepartmentunit = exports.createDepartmentunit = function createDepartmentunit(req, res) {
  var data = req.body.data;

  console.log(data);
  _models2.default.sequelize.query("INSERT INTO public.\"DepartmentUnits\"(code,name,location) \n      VALUES " + data.map(function (a) {
    return "(?)";
  }).join(","), {
    replacements: data
  }).then(function (results) {
    return res.json({ success: true, results: results });
  }).catch(function (err) {
    console.log(err);
    res.json({ success: false, err: err });
  });
};

var createDirectors = exports.createDirectors = function createDirectors(req, res) {
  var _req$body5 = req.body,
      department = _req$body5.department,
      position = _req$body5.position,
      unit = _req$body5.unit,
      position_name = _req$body5.position_name;

  console.log(req.body);
  _models2.default.sequelize.query("INSERT INTO directors(department,position,other_unit_name,other_position) \n      VALUES ('" + department + "','" + position + "','" + unit + "','" + position_name + "')").then(function (results) {
    res.json({ results: results });
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({ err: err });
  });
};

var getDepartment = exports.getDepartment = function getDepartment(req, res) {
  _models2.default.sequelize.query("SELECT code FROM Departments").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};
var getUnit = exports.getUnit = function getUnit(req, res) {
  _models2.default.sequelize.query("SELECT unit_name FROM public.\"DepartmentUnits\" where code='" + req.params.department + "'").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getRegistries = exports.getRegistries = function getRegistries(req, res) {
  var _req$params = req.params,
      role = _req$params.role,
      status = _req$params.status;

  var sql = "SELECT * from get_files (:role, :status)";
  _models2.default.sequelize.query(sql, { replacements: { role: role, status: status } }).then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var makeRecommendation = exports.makeRecommendation = function makeRecommendation(req, res) {
  var _replacements;

  var _req$body6 = req.body,
      query_type = _req$body6.query_type,
      recom_id = _req$body6.recom_id,
      term = _req$body6.term,
      status = _req$body6.status,
      remark = _req$body6.remark,
      proposed_dev = _req$body6.proposed_dev,
      annual_rent = _req$body6.annual_rent,
      dev_charges = _req$body6.dev_charges,
      survey_charges = _req$body6.survey_charges,
      proposed_dev_time = _req$body6.proposed_dev_time,
      id = _req$body6.id,
      forward_by = _req$body6.forward_by,
      forward_to = _req$body6.forward_to;

  var sql = "CALL recommendation_queries(:query_type,:id,:recom_id,:status,:remark,:term,:proposed_dev,:annual_rent,:dev_charges,:survey_charges,:proposed_dev_time,:forward_by,:forward_to )";
  //  console.log({QQQQQQQQQQQWWWWWWWWWWW: `CALL recommendation_queries(${query_type},${id},${recom_id},${status},${remark},${term},${proposed_dev},${annual_rent},${dev_charges},${survey_charges},${proposed_dev_time},${forward_by},${forward_to} )`})
  _models2.default.sequelize.query(sql, { replacements: (_replacements = { query_type: query_type, id: id, recom_id: recom_id, status: status, remark: remark, term: term, proposed_dev: proposed_dev, annual_rent: annual_rent, dev_charges: dev_charges }, _defineProperty(_replacements, "id", id), _defineProperty(_replacements, "survey_charges", survey_charges), _defineProperty(_replacements, "proposed_dev_time", proposed_dev_time), _defineProperty(_replacements, "forward_by", forward_by), _defineProperty(_replacements, "forward_to", forward_to), _replacements) }).then(function (result) {
    return res.json({ success: true, result: result });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var grantQueries = exports.grantQueries = function grantQueries(req, res) {
  var _req$body7 = req.body,
      query_type = _req$body7.query_type,
      id = _req$body7.id,
      r_of_o_no = _req$body7.r_of_o_no,
      plot_no = _req$body7.plot_no,
      plan_no = _req$body7.plan_no,
      ground_rent = _req$body7.ground_rent,
      improvement_value = _req$body7.improvement_value,
      improvement_term = _req$body7.improvement_term,
      remark = _req$body7.remark,
      signed_by = _req$body7.signed_by,
      forward_to = _req$body7.forward_to,
      forward_by = _req$body7.forward_by;

  var sql = "CALL grant_queries(:query_type,:id,:r_of_o_no,:plot_no,:plan_no,:ground_rent,:improvement_value,:improvement_term,:remark,:signed_by,:forward_to,:forward_by) ";
  _models2.default.sequelize.query(sql, { replacements: { query_type: query_type, id: id, r_of_o_no: r_of_o_no, plot_no: plot_no, plan_no: plan_no, ground_rent: ground_rent, improvement_value: improvement_value, improvement_term: improvement_term, remark: remark, signed_by: signed_by, forward_to: forward_to, forward_by: forward_by } }).then(function (result) {
    return res.json({ success: true, result: result });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};
var getRemarks = exports.getRemarks = function getRemarks(req, res) {
  var _req$params2 = req.params,
      role = _req$params2.role,
      query_type = _req$params2.query_type,
      sql = _req$params2.sql;

  if (query_type == 'my_status') sql = "SELECT * FROM my_status (:role)";else sql = "SELECT * FROM others_status (:role)";

  _models2.default.sequelize.query(sql, { replacements: { role: role } }).then(function (results) {
    var data = results[0];
    res.json({ success: true, data: data.length ? data[0] : [] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getRemark = exports.getRemark = function getRemark(req, res) {
  var _req$params3 = req.params,
      id = _req$params3.id,
      query_type = _req$params3.query_type,
      sql = _req$params3.sql;

  sql = "SELECT * FROM ";
  if (query_type === 'next') {
    sql += " get_next_status (:id)";
  } else {
    sql += " get_status (:id)";
  }
  _models2.default.sequelize.query(sql, { replacements: { id: id } }).then(function (data) {
    return res.json({ success: true, data: data[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getComments = exports.getComments = function getComments(req, res) {
  var id = req.params.id;

  var sql = "SELECT * FROM public.\"Comments\" WHERE \"ApplicationId\"=" + id + " ORDER BY id DESC";

  _models2.default.sequelize.query(sql).then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getRegistry = exports.getRegistry = function getRegistry(req, res) {
  var id = req.params.id;

  var sql = "SELECT * FROM public.\"Applications\" WHERE id=" + id + " ";

  _models2.default.sequelize.query(sql).then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (error) {
    console.log({ error: error });
    res.status(500).json({ success: false, error: error });
  });
};

var getRecommendation = exports.getRecommendation = function getRecommendation(req, res) {
  var id = req.params.id;

  Recommendation.findOne({ where: { id: id } }).then(function (result) {
    return res.json({ success: true, result: result });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getDepartmentUnit = exports.getDepartmentUnit = function getDepartmentUnit(req, res) {
  _models2.default.sequelize.query("SELECT * FROM public.\"DepartmentUnits\"").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var resolveRemark = exports.resolveRemark = function resolveRemark(req, res) {
  Remark.findOne({ where: { id: req.body.id } }).then(function (data) {
    data.update({ status: req.body.status }).then().catch();
    res.json({ status: true, data: data });
  }).catch(function (error) {
    res.status(500).json({ status: false, error: error, msg: "Error in updating remark" });
  });
};
var rejectRegistry = exports.rejectRegistry = function rejectRegistry(req, res) {
  var _req$params4 = req.params,
      id = _req$params4.id,
      status = _req$params4.status;
  var _req$body8 = req.body,
      forward_to = _req$body8.forward_to,
      forward_by = _req$body8.forward_by,
      remark = _req$body8.remark;

  Application.update({
    forward_to: forward_to,
    forward_by: forward_by,
    status: status,
    remark: remark
  }, { where: { id: applicationId } }).then(function (result) {}).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var updateRegistry = exports.updateRegistry = function updateRegistry(req, res) {
  var _req$body9 = req.body,
      forward_to = _req$body9.forward_to,
      status = _req$body9.status,
      forward_by = _req$body9.forward_by,
      remark = _req$body9.remark,
      id = _req$body9.id;

  _models2.default.sequelize.query("CALL make_remark (:id, :status, :remark, :forward_to,:forward_by)", { replacements: { forward_by: forward_by, forward_to: forward_to, status: status, remark: remark, id: id } }).then(function (results) {
    return res.json({ success: true });
  }).catch(function (error) {
    return res.status(500).json({ success: false, error: error });
  });
};

var getMailBadge = exports.getMailBadge = function getMailBadge(req, res) {
  _models2.default.sequelize.query("SELECT COUNT(forward_to) as badges FROM applications  WHERE forward_to='" + req.user.role + "'").then(function (results) {
    return res.json({ success: true, data: results[0][0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getAppPreview = exports.getAppPreview = function getAppPreview(req, res) {
  _models2.default.sequelize.query("SELECT * FROM public.\"Applications\"  WHERE id='" + req.params.id + "' ").then(function (data) {
    res.json({ success: true, data: data[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getLetterTemplateName = exports.getLetterTemplateName = function getLetterTemplateName(req, res) {
  _models2.default.sequelize.query("SELECT name FROM letter_template").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getLetterBody = exports.getLetterBody = function getLetterBody(req, res) {
  var letter = req.params.letter;

  _models2.default.sequelize.query("SELECT letter_body FROM letter_template where name=\"" + letter + "\"").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};
var getGroundRent = exports.getGroundRent = function getGroundRent(req, res) {
  var _req$params5 = req.params,
      land = _req$params5.land,
      range = _req$params5.range;

  _models2.default.sequelize.query("call get_ground_rent(:land,:range)", {
    replacements: {
      land: land,
      range: range
    }
  }).then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getUseRateCat = exports.getUseRateCat = function getUseRateCat(req, res) {
  _models2.default.sequelize.query("SELECT DISTINCT land_use_rate_cat FROM ground_rent").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};
var getReviewRange = exports.getReviewRange = function getReviewRange(req, res) {
  _models2.default.sequelize.query("SELECT DISTINCT review_range FROM ground_rent").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getImagesURL = exports.getImagesURL = function getImagesURL(req, res) {
  var id = req.params.id;

  _models2.default.sequelize.query("SELECT image_url FROM images WHERE id=\"" + id + "\"").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};
var getImageRemark = exports.getImageRemark = function getImageRemark(req, res) {
  var id = req.params.id;

  _models2.default.sequelize.query("SELECT remarks FROM remarks WHERE tag_no=\"" + id + "\"").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getDepartment_Position = exports.getDepartment_Position = function getDepartment_Position(req, res) {
  var id = req.params.id;

  _models2.default.sequelize.query("select name as position from public.\"DepartmentUnits\"").then(function (results) {
    return res.json({ success: true, data: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var getRoles = exports.getRoles = function getRoles(req, res) {
  // const { id } = req.user.id;
  _models2.default.sequelize.query("SELECT  distinct forward_by as role FROM public.\"Remarks\" group by (role) order by role").then(function (data) {
    res.json({ success: true, data: data[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var directorLand = exports.directorLand = function directorLand(req, res) {
  var id = req.body.id;

  _models2.default.sequelize.query("update applications set status='Director Land' where file_no='" + id + "' ").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};
var getForwardToDirector = exports.getForwardToDirector = function getForwardToDirector(req, res) {
  _models2.default.sequelize.query("select * from applications WHERE  forward_to='Director'").then(function (results) {
    return res.json({ success: true, data: results });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};
// where status='New' and forward_to='${req.params[0].position}'
var get_file_number = exports.get_file_number = function get_file_number(req, res) {
  // console.log(req.params[0].position);
  _models2.default.sequelize.query("select file_code,max(id)+1 as id from file_number where file_code in('COM','RES','IND') group by file_code  ").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};

var updateFileNumber = exports.updateFileNumber = function updateFileNumber(req, res) {
  console.log(req.body);
  _models2.default.sequelize.query("update file_number set id ='" + req.body.code + "' where file_code= '" + req.body.id + "' ").then(function (results) {
    return res.json({ success: true, results: results });
  }).catch(function (err) {
    return res.json({ success: false, err: err });
  });
};
var get_recommendation = exports.get_recommendation = function get_recommendation(req, res) {
  _models2.default.sequelize.query("select * from public.\"Applications\" where forward_to='" + req.params.user + "' AND status in ('Recommended')").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};