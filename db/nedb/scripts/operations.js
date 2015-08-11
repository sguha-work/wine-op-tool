/**
 * This file holds list of all the operations
 * Every operation will have the following attributes
 * config: this attribute holds the priority wise dependency list for the operation
 */
var operationArray = {
    // sort: {
    //     config: [{
    //         name: 'table',
    //         methodName: "table",
    //         displayText: "Please select the table"
    //     }, {
    //         name: 'field',
    //         methodName: "field",
    //         displayText: "Please select the Field of the table"
    //     }],
    //     click: function() {
    //         var operationParam = {},
    //             index = 0,
    //             thisOp = operationArray.sort,
    //             localConfig = thisOp.config,
    //             config_i = localConfig[index]
    //         callBack = function() {
    //             if (index < localConfig.length) {
    //                 operationParam[config_i.name] = document.getElementById("txt_" + config_i.name + "_" + index).value;
    //                 index += 1;
    //                 config_i = localConfig[index];
    //                 if (index == localConfig.length) {
    //                     operationArray.sort.operation(operationParam);
    //                 } else {
    //                     // put the comment
    //                     ui.update_comment(config_i.displayText);
    //                     // create the input
    //                     ui["create_" + config_i.methodName](operationParam, config_i.name + "_" + index, config_i.value);
    //                 }
    //             } else {
    //                 operationArray.sort.operation(operationParam);
    //             }
    //         };
    //         // clear the ui
    //         ui.clear_ui();
    //         // put the comment
    //         ui.update_comment(config_i.displayText);
    //         // create the first input
    //         ui["create_" + config_i.methodName](operationParam, config_i.name + "_" + index, config_i.value);
    //         // create the button
    //         ui.create_button(callBack);

    //     },
    //     operation: function(config) {


    //         var b = new Benchmark("sort");
            
    //         // do the operation here
    //         var attribute = config['field'];
    //         config.attributes = attribute;
    //         mainDatabase[config.table].find({}, function(error, records){
    //             if(!records.length) {
    //                 alert("Please insert data to sort");
    //             } else {
    //                 if(isNaN(parseFloat(records[0][config.attributes]))) {
    //                    alert("Only numeric sort still now");
    //                    return false
    //                 }
    //                 operationArray.grouping.performSort(config, records);
    //             }
                
    //         });
            
    //     }
    // },
    search: {
        config: [{
            name: 'table',
            methodName: "table",
            displayText: "Please select the table"
        }, {
            name: 'query',
            methodName: "query",
            displayText: "Please enter the query for search like '{ Customer-Name: a/ }'"
        }],
        click: function() {
            var operationParam = {},
            index=0,
            callBack=function(){
                if(index==operationArray.search.config.length-1) {
                    operationParam[operationArray.search.config[index].name] = document.getElementById("txt_"+operationArray.search.config[index].name+"_"+index).value;
                    operationArray.search.operation(operationParam);
                } else {
                    operationParam[operationArray.search.config[index].name] = document.getElementById("txt_"+operationArray.search.config[index].name+"_"+index).value;
                    index += 1;
                    ui.update_comment(operationArray.search.config[index].displayText);
                    ui["create_" + operationArray.search.config[index].methodName](operationParam, operationArray.search.config[index].name+"_"+index);
                }
            };

            ui.clear_ui();
            ui.update_comment(operationArray.grouping.config[0].displayText);
            ui["create_" + operationArray.search.config[index].methodName](operationParam,  operationArray.search.config[index].name + "_" + index);
            ui.create_button(callBack, "search");
        },
        operation: function(config) {
            var b = new Benchmark("search");
            var returnObject = {};
            mainDatabase[config.table].find({}, function(e, r){
                returnObject["data-length"] = r.length;
                if(!r.length) {
                    alert("Please insert some data to perform search");
                    return false;
                } else {
                    b.startTimer();
                    if(config.query.trim == "") {
                        config.query = {};
                    }
                    mainDatabase[config.table].find(config.query, function(err, records){
                        returnObject["effected-row"] = records.length;
                        returnObject["remarks"] = "operation performed on  "+returnObject["data-length"]+" rows, "+returnObject["effected-row"]+ " rows effected";
                        b.stopTimer(returnObject);
                    });
                }
            });
            
        }
    },

    grouping: {
        config: [{
            name: 'table',
            methodName: "table",
            displayText: "Please select the table"
        },{
            name: 'suboperation',
            methodName: "suboperation",
            displayText: "select the sub operation",
            subOperationList: ["sort", "filter", "aggregate", "highlight"]
        }, {
            name: 'attributes',
            methodName: "attributes",
            displayText: "select one attribute to group"
        }, {
            name: 'query',
            methodName: "query",
            displayText: "Please enter the query for sort specify 'bubble'/'merge'/'insertion' for search '{ Customer-Name: a/ }'"
        }],
        click: function() {
            var operationParam = {},
            index=0,
            flag=0,
            callBack=function(){
                if(index==operationArray.grouping.config.length-1) {
                    operationParam[operationArray.grouping.config[index].name] = document.getElementById("txt_"+operationArray.grouping.config[index].name+"_"+index).value;
                    operationArray.grouping.operation(operationParam);
                } else {
                    operationParam[operationArray.grouping.config[index].name] = document.getElementById("txt_"+operationArray.grouping.config[index].name+"_"+index).value;
                    index += 1;
                    if(typeof operationParam["suboperation"]!="undefined" && operationParam["suboperation"]!="sort" && !flag) {
                        index+=1;
                        flag = 1;
                    }
                    ui.update_comment(operationArray.grouping.config[index].displayText);
                    if(operationArray.grouping.config[index].methodName=="suboperation") {
                        ui["create_" + operationArray.grouping.config[index].methodName](operationParam, operationArray.grouping.config[index].name+"_"+index, operationArray.grouping.config[index].subOperationList);                        
                    } else {
                        ui["create_" + operationArray.grouping.config[index].methodName](operationParam, operationArray.grouping.config[index].name+"_"+index);
                    }
                }
            };
            ui.clear_ui();
            ui.update_comment(operationArray.grouping.config[0].displayText);
            ui["create_" + operationArray.grouping.config[index].methodName](operationParam,  operationArray.grouping.config[index].name + "_" + index);

            ui.create_button(callBack, "grouping");
        },
        operation: function(config) {
            
            var returnObject = {};
            
            mainDatabase[config.table].find({}, function(err, records) {
                if(records.length) {
                    
                        switch(config.suboperation) {
                            
                            case "sort":
                                operationArray.grouping.performSort(config, records);
                            break;

                            case "filter":
                                operationArray.grouping.performFilter(config, records.length);
                            break;

                            case "highlight":
                                operationArray.grouping.performHighlight(config);
                            break;
                            
                            case "aggregate":
                                operationArray.grouping.performAggregate(config, records.length);
                            break;
                        }
                } else {
                    alert("please enter table data to perform operation");
                    return false;
                }
            });
            // do the operation here
            

            
        },
        performAggregate: function(config, dataLength) {
            var b = new Benchmark("grouping"+"_"+config.suboperation);
            if(config.query.trim() == "") {
                config.query = {};
            }
            var responseObject = {};
            responseObject.remarks = "Aggregate operation performed on "+dataLength+" numbers of data";
            b.startTimer();
            mainDatabase[config.table].find(config.query, function(err, records) {
                responseObject.remarks += " Number of effected rows "+(dataLength-records.length);
                b.stopTimer(responseObject);
            });
        },
        performHighlight: function(config) {
            var b = new Benchmark("grouping"+"_"+config.suboperation);
            if(config.query.trim() == "") {
                config.query = {};
            }
            var responseObject = {};
            
            b.startTimer();
            mainDatabase[config.table].find({}, function(err, records){
                responseObject.remarks = "Highlight operation performed on "+records.length+" numbers of data";
                mainDatabase[config.table].find(config.query, function(err, filterredRecords) {
                    responseObject.remarks += " Number of effected rows "+(filterredRecords.length);
                    for(var index in filterredRecords) {
                        var email = filterredRecords[index]["Customer-Email"];
                        for(var mainDataIndex=0; mainDataIndex<records.length; mainDataIndex++) {
                            if(records[mainDataIndex]["Customer-Email"]==email) {
                                records[mainDataIndex]["highlight"] = true;
                            }
                        }
                    }
                    b.stopTimer(responseObject);                    
                });    
            });
        },
        performFilter: function(config, dataLength) {
            var b = new Benchmark("grouping"+"_"+config.suboperation);
            if(config.query.trim() == "") {
                config.query = {};
            }
            var responseObject = {};
            responseObject.remarks = "Filterring operation performed on "+dataLength+" numbers of data";
            b.startTimer();
            mainDatabase[config.table].find(config.query, function(err, records) {
                responseObject.remarks += " Number of effected rows "+(dataLength-records.length);
                b.stopTimer(responseObject);
            });
        },
        performSort: function(config, records) {
            var sortType = (typeof config.query!="undefined"&&config.query.trim()!="")?(config.query.trim()):"bubble";
            var b = new Benchmark("grouping"+"_"+((typeof config.suboperation!="undefined")?config.suboperation:"sort")+"_"+sortType);
            var sortObject = new Sort();
            var responseObject = {};
            responseObject.remarks = "operation "+((typeof config.suboperation!="undefined")?config.suboperation:"sort")+" performed using "+sortType+" method on"+records.length+" numbers of data";
            b.startTimer();
            sortObject[sortType+"Sort"](records, config.attributes);
            b.stopTimer(responseObject);
        }
    }
}
