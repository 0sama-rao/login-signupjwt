var express = require('express');
const jwt = require ('jsonwebtoken');
const sql = require ('mssql');
var  bodyParser = require('body-parser');

var db = require('./controllers/userController');

const config = require('./dbconfig');




var app = express();    
var  router = express.Router();


app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());


app.use('/api', router);


router.use((request, response, next) => {
  console.log('Method Executed !');
  next();
});

router.route('/login').post((request, response) => {
    let user = {...request.body}

    db.loginUser(user).then(function(result) {
        // console.log(response.status)  
        if(result == true){
          response.status(200).json({result, message:"Record inserted"})
        }
          else{
          response.status(400).json({result, message:"Error Inserting record or Duplicate account data!"})
         console.log(result)
        }
        
      })
    })
//     db.loginUser().then((data) => {
//         response.status(200).json({data, message:"Record inserted successfully!"});
//     })
//   })

  var port = process.env.PORT || 8080;
app.listen(port);
console.log('Port is listening at '+ port);
