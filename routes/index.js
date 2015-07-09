
var express = require('express');
var router = express.Router();

//importar el enrutador
var quizController = require('../controllers/quiz_controller');
var authorController= require ('../controllers/author_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//autoload de comandos con :quizId
router.param('quizId', quizController.load);



//el enrutador es esta pagina, index.js, ha de importar el controlador
//llevan a ejecutar las acciones referiadas a question y answer
//definicion de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
router.get('/author',   authorController.author);


module.exports = router;