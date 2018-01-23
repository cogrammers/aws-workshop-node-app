const projectsController = require('../controllers').projects;

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Landing Page!',
  }));
  
  app.post('/projects', projectsController.create);
  app.get('/projects', projectsController.list);

}
