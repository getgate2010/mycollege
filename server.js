/**
 * Created by DfastQ-2 on 1/7/2016.
 */
var appRoot = require('app-root-path');
var config=require(appRoot+'/config.js');
var express=require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

if(config.getOnlinePoint()==true)
{
//   cors applied only for  development

  var cors = require('cors');
  app.use(cors({credentials: true, no: true}));
//=============================== cors end ====================
}

//This line to execute public Directory Client route//
//********************************************************************************

app.use(express.static(__dirname + '/build'));

if(config.getOnlinePoint()==false) {
  app.use('/staticImg', express.static(config.getServerImgPath()));  // this is static dir at server PC
}

app.get('/', function(req, res){
  res.sendfile(__dirname + '/build/index.html');
});
//********************************************************************************

//=====================================MIDDLEWARE FUNCTION===========================================
app.use('/api',function(req,res, next){

  var token = req.headers['authorization'] ||  req.query.token;

  try {
    // verify a token symmetric - synchronous
    var check = config.verifyToken(token);

    if (check == true) {
      //===ok=============================++++++++++++
    }
    else {
      res.status(403);
      res.json({err: true, msg: "Access Denied, Plz Login!!!"});
      res.end();
    }

  } catch (err) {
    res.status(403);
    res.json({err: true, msg: "Access Denied, Plz Login!!!"});
    res.end();
  }

  console.log("hIII client");
  console.log("userId" + config.getUserId());
  res.header ['Access-Control-Allow-Origin']= '*';
  res.header ['Access-Control-Allow-Credentials']= true;
  res.header ['Access-Control-Allow-Methods']= 'POST, GET, PUT, DELETE, OPTIONS';
  res.header ['Access-Control-Allow-Headers']= 'Content-Type';
  next();
});

//==========================================MIDDLEWARE END=============================================

//=============================================================================
//ROUTE ALL FILE
//=============================================================================

var routes=require(appRoot+'/routes/dLinks.js')(app);
var routes=require(appRoot+'/routes/notice.js')(app);
var routes=require(appRoot+'/routes/onLineImageUpload.js')(app);
var routes=require(appRoot+'/routes/payment.js')(app);
var routes=require(appRoot+'/routes/user.js')(app);


/*var port = process.env.PORT || 8080,
    ip   = process.env.IP   || '0.0.0.0';*/

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.OPENSHIFT_NODEJS_IP   || '0.0.0.0';

app.listen(port, ip, function () {
  console.log( "Listening on " + ip + ", port " + port )
});

