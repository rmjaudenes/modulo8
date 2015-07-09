//en este fichero definimos como se construye todo el modelo
//importamos path y luego sequelize, porque con ello
//construimos nuestro modelo

var path = require('path');

//configurar la bd con las variables database_url y database_storage
//Postgress DATABASE_URL = postgres://user:passwd@host:post/database
//SQlite    DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;



// CARGAR MODELO ORM

var Sequelize = require('sequelize');

//luego se crea la variable sequelize
//luego se crea un objeto con este modulo
//clase squelize, como si fuera la clase de bases de datos
//al constructor del objeto se le pasan 3 nulos
//el dialecto que es squlite yluego storage, fichero donde se guardaran
//los datos

var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  
    omitNull: true     
  }      
);



//ahora se  le importa la tabla creada en quiz.js
//a sequelize se le aplica el metodo import con la ruta al fichero quiz


var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);



//aqui se epxorta para que se pueda aplicar a otros lugares
//de la aplicación
exports.Quiz = Quiz;
//Ahora se crea la base de datos y se inicializa
//sincronizando el modelo
//con .sync se inicializa la base de datos del modelo
//se instala con success un callback con la base de datos

sequelize.sync().then(function() {
    
    //quiz.count dice el numero de filas que hay en la tabla
   Quiz.count().then(function (count){
    if(count === 0) { 
       
       Quiz.bulkCreate( 
        [ {pregunta: 'Cuál es la capital de Italia',   respuesta: 'Roma'},
          {pregunta: 'Cuál es la capital de Portugal', respuesta: 'Lisboa'}
        ]
      ).then(function(){console.log('Base de datos inicializada')});
       
       
    };
  });
});