var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var multer = require('multer');
var routes = require('./routes/index');
var users = require('./routes/users');
var Tasks=require('./routes/Tasks');
var Students=require('./routes/Students');
var Employees = require('./routes/Employees');
var Reimbursements = require('./routes/Reimbursements');
var Customs = require('./routes/Customs');
var Custom=require('./models/Custom');
var app = express();
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).any(); //Field name and max count

/*app.get("/", function (req, res) {
    res.sendFile(__dirname + "/employeeClaims.ejs");
});*/

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
          ///this error comes mostly when Images foler is not present
            return res.end("Something went wrong!");
        }
  console.log(req.files.length!==null);
  console.log(req.files);
  var filepathString = req.files[0].filename;
  //if(req.files.length!==null && req.files.length>0){
        /*for(i=0;i< req.files.length;i++){
          filepathString = filepathString + req.files[i].path +',';
        }*/
       // filepathString = filepathString.slice(0,-1);
        Custom.addReimbursementHistory(req.body,filepathString,function(err,count){

            //console.log(req.body);
            if(err)
            {
                res.json(err);
            }
            else{
                    //res.json(req.body);//or return count for 1 & 0
                    //return res.end("File uploaded sucessfully!.");
                    return res.redirect(req.headers.referer);
            }
        });
  //}
    });

    /*Custom.addReimbursementHistory(req.body,function(err,count){

            //console.log(req.body);
            if(err)
            {
                res.json(err);
            }
            else{
                    res.json(req.body);//or return count for 1 & 0
            }
        });*/
});

/*app.post("/api/Upload", function (req, res) {


});*/

// view engine setup
/*app.get("/downloadFile",function (req,res) {
        //console.log(req);
        res.download("Images\imgUploader_1495470974419_allpostmidtermsscmslidesnotes.zip");
});*/
/*app.use("/file/", function(req, res){
  res.send('<ul>'
    + '<li>Download <a href="/amazing.txt">amazing.txt</a>.</li>'
    + '<li>Download <a href="/missing.txt">missing.txt</a>.</li>'
    + '</ul>');
});

// /files/* is accessed via req.params[0]
// but here we name it :file
app.use('/file/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/Images/' + file;

  res.download(path);
});*/

app.get('/testTwoQueries', function(req,res,next){
  var result = {};
    Custom.getAllEmpTypes(function(err,rows1){
      if(err){
        res.json(err);
      }else{
        result.table1 = rows1;

        Custom.getAllReimbursementTypes(function(err,rows2){
      if(err){
        res.json(err);
      }else{
        result.table2 = rows2;
    //console.log(result);
    res.send(result);
      }
    });

      }
    });

    
    


});






app.get('/fileDownload/:file(*)', function(req, res, next){
    console.log(req.params.file);
  var file = req.params.file
    , path = __dirname + '/Images/' + file;

  res.download(path);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('port', process.env.PORT || 8080);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('/uploads/'));

/*app.use('/resources',express.static(__dirname + '/images'));
So now, you can use http://localhost:5000/resources/myImage.jpg to serve all the images instead of http://localhost:5000/images/myImage.jpg. */
app.use('/', routes);
app.use('/users', users);
app.use('/Tasks',Tasks);
app.use('/Students',Students);
app.use('/Employees',Employees);
app.use('/Reimbursements',Reimbursements);
app.use('/custom',Customs);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
