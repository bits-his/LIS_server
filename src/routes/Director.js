import { createRegistory } from '../controllers/Director';

module.exports = (app) => {
  app.post('/api/registory/create', createRegistory);
};
