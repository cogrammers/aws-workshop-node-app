var models = require('../models/index');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/projects')
});

router.post('/projects', function(req, res) {
  models.Project.create({
    title: req.body.title,
    description: req.body.description,
    githubLink: req.body.githubLink
  }).then(function(project) {
    res.json(project);
  })
})

router.get('/projects', function(req, res) {
  models.Project.findAll({}).then(function(projects) {
    res.render('index', { title: 'Projects', projects: projects })
  })
})

router.get('/projects/new', function(req, res) {
  res.render('new', { title: 'Add a New Project' })
})

router.get('/projects/:id', function(req, res) {
  models.Project.findOne({_id: req.params.id}).then(function(project) {
    res.render('show', { title: 'Projects', project: project })
  })
})




module.exports = router;
