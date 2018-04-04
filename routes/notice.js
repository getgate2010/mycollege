/** * Created by DfastQ-2 on 09/04/2016.
 */
//==============================================================
//REQUIRE
//==============================================================

var appRoot        = require('app-root-path');//This is used It redirect the root of Directory
var validation     = require('validator');
var noticeValidation = require(appRoot + '/validation/notice.js');
var noticeMethod     = require(appRoot +'/object_method/notice.js');
var config         = require(appRoot + '/config.js');
var os             = require("os");
var notice={};
module.exports = function(app) {

//===============================================================
// CREATE    (notice)
//===============================================================
    //create user Admin data into Database
    app.post('/api/create_notice', function (req, res) {
        if(config.isUserInRole('adm'))
        {
            //Here am trim is  use to  elements  whitespace  from begin and end side
            notice.description         = req.body.oldpw;

            var arryList=["description"];

            //  console.log('1- Pass,Route route OK');

            var valid = noticeValidation.checkUser(notice,arryList);
            if (valid.error==true)
            {
                //  console.log('2- Validation failed');
                //if server side Validation failed
                res.status(501);
                res.json({err:true,msg:"server side Validation failed"});
                res.end();
            }
            else {
                //  console.log('3- Validation OK.');
                //Now here object is validate then it should be submitted at database

                var queryString = noticeMethod.create_notice(notice)
                config.DBaction(queryString.param, queryString.str, 'create', function (err, rows) {
                    if(err){
                        console.log(err);
                        res.status(500);
                        res.json({err:true,msg:"Fail to insert DATA !!!"});
                        res.end();
                    }
                    else
                    {
                        //  console.log(' 10 - data insert success !');
                        res.status(201);
                        res.json({err:false,msg:rows});
                        res.end();
                    }

                });

            }
        }

    });

    //=============================================================================
        //READ notice  dfq_api/read_notice
    app.post('/dfq_api/read_notice', function (req, res) {
        //.......................(Here am receive body(client) request value ).....................................................

            var queryString = noticeMethod.read_notice();
           config.DBaction(queryString.param, queryString.str, 'read', function (err, rows) {

                if(err){
                    //  console.log(' 9 - data Read failed !');
                    res.status(500);
                    res.json({err:true,msg:"Fail to read Data !!!"});
                    res.end();
                }
                else
                {
                    //  console.log(rows);
                    res.status(200);
                    res.json({err:false,msg:rows});
                    res.end();
                }
            });
    });
};