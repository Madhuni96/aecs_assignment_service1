const express = require("express");
const router = express.Router();
const CommitController = require("../CONTROLLERS/commits_con");
const CheckAPI = require("../MIDDLEWARES/check_api");
const IssueController = require("../CONTROLLERS/issues_con");
const PullController = require("../CONTROLLERS/pulls_con");


router.post("/", CheckAPI, (req, res, next) => {

  const body = req.body;

    CommitController.save_commit(body)
      .then((result) => {
        res.status(result.status).json(result.message);
      })
      .catch((err) => {
        res.status(err.status).json(err.error);
      });

    IssueController.save_issue(body)
      .then((result) => {
        res.status(result.status).json(result.message);
      })
      .catch((err) => {
        res.status(err.status).json(err.error);
      });

    PullController.save_pull(body)
      .then((result) => {
        res.status(result.status).json(result.message);
      })
      .catch((err) => {
        res.status(err.status).json(err.error);
      });
  });

  module.exports=router;