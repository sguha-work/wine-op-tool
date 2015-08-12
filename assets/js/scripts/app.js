window.benchmarkTableElements = [{
        name: "OperationName",
        manipulate: function() {
            return (arguments[0])?arguments[0].opName:"";
        }
    }, {
        name: "Start time",
        manipulate: function() {
            var date = new Date(arguments[0].startTime);
            return (arguments[0])?date.toDateString() + " "+ date.toTimeString():"";
        }
    }, {
        name: "End time",
        manipulate: function() {
            var date = new Date(arguments[0].finishTime);
            return (arguments[0])?date.toDateString() + " "+ date.toTimeString():"";
        }
    }, {
        name: "Duration (ms)",
        manipulate: function() {
            return (arguments[0])?arguments[0].duration:"";
        }
    }, {
        name: "Remarks",
        manipulate: function() {
            return (arguments[0].remarks)?arguments[0].remarks:"Nothing";
        }
    }];

addBenchMarkingListner(function() {
    var trText = "<tr>";
    for(var index in window.benchmarkTableElements) {
        trText += "<td>"+window.benchmarkTableElements[index].manipulate.apply(this, arguments)+"</td>";
    }
    trText += "</tr>";
    document.getElementById('tbl_benchmark').innerHTML += trText;
});    
addBenchMarkingListner(function() {
    var trText = "<tr>";
    for(var index in window.benchmarkTableElements) {
        trText += "<td>"+window.benchmarkTableElements[index].manipulate.apply(this, arguments)+"</td>";
    }
    trText += "</tr>";
    document.getElementById('tbl_benchmark').innerHTML += trText;
},"pause");    