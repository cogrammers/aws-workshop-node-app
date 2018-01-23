const Project = require('../models').Project;

module.exports = {
  create(req, res) {
    return Project
    .create({
      title: req.body.title,
      description: req.body.description,
      githubLink: req.body.githubLink,
      imageLink: req.body.imageLink,
    })
    .then(project => res.status(201).send(project))
    .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Project
      .findAll()
      .then((projects) => res.render('index', {
        title: 'Projects',
        projects: projects
      })
      .catch((error) => res.status(400).send(error));
  },
};
