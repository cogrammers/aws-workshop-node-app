// var express = require('express');
// var router = express.Router();
// var Project = require('../models/project');
//
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.get('/projects', function(req, res) {
//   Project.find({}, function(err, projects) {
//     if(err) {
//       console.log(err);
//     } else {
//       res.render('index', { title: 'Projects', projects: projects })
//     }
//   })
// });
//
// router.get('/projects/:id', function(req, res, next) {
//   Project.findOne({_id: req.params.id}).then(function(project) {
//     res.render('show', { project: project })
//   })
// })
//
// module.exports = router;
