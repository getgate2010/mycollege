/**
 * Created by DfastQ-2 on 1/9/2016.
 */

//REQUIRE
//============================================================
var exports =module.exports={};
var validation = require('validator');
var appRoot = require('app-root-path');

//===============================================================
//Validation
//===============================================================

exports.checkUser= function (user,arrayList){

    for (var i = 0; i < arrayList.length; i++) {
        var res = check(arrayList[i], user[arrayList[i]]);

        if (res.error) {
            return res;
        }

    }

    return {error:false, msg:"Success"} ;
}

function check(valid,str) {

    switch (valid) {

        case'description':
            if (!validation.isLength(str, 1, 300)) {
                console.log('Validation Error !! description ');
                return {error: true, msg: "Description: require & MAX char is 150"};
            }
            break;
    }
    return{error:false,msg:"Success"};
}