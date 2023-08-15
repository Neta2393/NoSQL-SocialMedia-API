const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
//router.route('/:thoughtId/reactions')
  //.post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
//router.route('/:thoughtId/reactions/:reactionId')
  //.delete(removeReaction);

module.exports = router;

//when running the above code that is commented out I was attempting to add a reaction but kept having errors in the terminal. When I commented that section out the code ran fine