const projectsController = require('../controllers').projects;

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome!',
  }));

  app.get('/projects', projectsController.list);
  app.post('/projects', projectsController.create);
  
}
