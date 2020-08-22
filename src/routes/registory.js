import { createRegistory } from '../controllers/registory';

module.exports = (app) => {
  app.post('/api/registory/create', createRegistory);
};
