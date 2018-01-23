var models = require('../models/index');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yo!' });
});

router.post('/projects', function(req, res) {
  models.Project.create({
    title: req.body.title,
    description: req.body.description
  }).then(function(project) {
    res.json(project);
  })
})

router.get('/projects', function(req, res) {
  models.Project.findAll({}).then(function(projects) {
    res.render('index', { title: 'Projects', projects: projects })
  })
})


module.exports = router;
