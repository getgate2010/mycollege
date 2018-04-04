/**
 * Created by DfastQ-2 on 1/8/2016.
 */

//==================================
//Required
//==================================

var exports =module.exports={};
var appRoot = require('app-root-path');
var config=require(appRoot +'/config.js');

//==========================================================================================================================
//create     (user)                                                     [1]
//==========================================================================================================================
exports.create_notice=function(notice) {
    var dbType=config.getDBtype();

    var param= [notice.description];
    var str='';

    if(dbType=="mysql") {
        str = 'CALL create_notice(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};

//=================================================================================================================
//Read     (Login)                                                      [2]
//=================================================================================================================
exports.read_notice =function(notice) {
    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [];


    var str='';

    if(dbType=="mysql") {

            str = 'CALL read_notice()';

    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};