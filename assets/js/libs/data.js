var dataStore = {
        "order": {
            fields: [{
                name: "Customer-Name",
                dataGenerator: lib.generateName,
            }, {
                name: "Customer-Email",
                dataGenerator: lib.generateEmail,
            }, {
                name: "Order-Date",
                dataGenerator: function() {
                    var date = "";
                    date += lib.generateRandomNumber(1, 30);
                    date += "/";
                    date += lib.generateRandomNumber(1, 12);
                    date += "/";
                    date += lib.generateRandomNumber(2010, 2016);
                    return date;
                }
            }, {
                name: "Order-Amount",
                dataGenerator: lib.genRandomNoGenerator(1, 10000, 2)
            }, {
                name: "Profit",
                arg: "Order Amount",
                dataGenerator: function(orderAmount) {
                    orderAmount = orderAmount || 10;
                    return lib.generateRandomNumber(-orderAmount / 4, orderAmount / 2, 2);
                }
            }],
            data: []
        },
        "employee": {
            fields: [{
                name: "Employee Name",
                dataGenerator: lib.generateName,
            }, {
                name: "Employee Email",
                dataGenerator: lib.generateEmail,
            }, {
                name: "Employee Joining Date",
                dataGenerator: function() {
                    var date = "";
                    date += lib.generateRandomNumber(1, 30);
                    date += "/";
                    date += lib.generateRandomNumber(1, 12);
                    date += "/";
                    date += lib.generateRandomNumber(2010, 2016);
                    return date;
                }
            }, {
                name: "Employee Salary",
                dataGenerator: lib.genRandomNoGenerator(1, 10000, 2)
            }],
            data: []
        },
        "student": {
            fields: [{
                name: "Student Name",
                dataGenerator: lib.generateName,
            }, {
                name: "Student DOB",
                dataGenerator: function() {
                    var date = "";
                    date += lib.generateRandomNumber(1, 30);
                    date += "/";
                    date += lib.generateRandomNumber(1, 12);
                    date += "/";
                    date += lib.generateRandomNumber(2010, 2016);
                    return date;
                }
            }],
            data: []
        }
    };
