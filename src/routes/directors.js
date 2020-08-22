import { createRegistory } from '../controllers/directors';

module.exports = (app) => {
  app.post('/api/registory/create', createRegistory);
};
