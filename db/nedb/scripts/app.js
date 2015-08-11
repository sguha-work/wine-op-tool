var mainDatabase = [];

function addDataButtons() {
    var container = document.getElementById("table_add");
        for (var i in dataStore) {
            if(typeof container != "undefined" && container != null) {
                container.innerHTML += "&nbsp;&nbsp;<option value='" + i + "' class='add_table__data_botton_class'>Add to Table \"" + i + "\"</option>";
            }
            // creating the databses
            mainDatabase[i] = new Nedb();
        }    
    
}

function addTableData() {
    var sel = document.getElementById("table_add");
    name = sel.options[sel.selectedIndex].value;
    generateData(parseInt(document.getElementById("numrow").value, 10), dataStore[name], function() {
        if (document.getElementById("dataLength_" + name)) {
            mainDatabase[name].insert(dataStore[name].data);
            displayContent(name);
            dataStore[name].data = [];
        }
    });

}

addDataButtons();

var displayContent = (function(tabIndex) {
    var tabElements = document.getElementsByClassName('tab');
    for (var index = 0; index < tabElements.length; index++) {
        if (typeof tabElements[index].className != "undefined" && tabElements[index].className.indexOf('active') != -1) {
            tabElements[index].className = "tab";
        }
        if (tabElements[index].innerHTML == tabIndex) {
            tabElements[index].className = "tab active";
        }
    }
    var displayInfo = "";
    mainDatabase[tabIndex].find({}, function(error, rows) {
        displayInfo += "<table class='table table-bordered'><tr><th>Number of Data</th><th>Fields(type)</th></tr>";
        displayInfo += "<tr><td id='dataLength_" + tabIndex + "'>" + convertNumberToWord(rows.length) + "</td><td>";
        for (var index2 in dataStore[tabIndex].fields) {
            displayInfo += (parseInt(index2) + 1) + ">" + dataStore[tabIndex].fields[index2].name + "(" + ((rows[0]) ? typeof rows[0][dataStore[tabIndex].fields[index2].name] : "undefined type") + "), ";
        }
        displayInfo = displayInfo.substring(0, displayInfo.length - 1);
        displayInfo += "</td></tr></table>";
        document.getElementById("div_info").innerHTML = displayInfo;
    });

});

(function() {
    // populate the tab based on number of tabs
    var tabHTML = "";
    for (var tableIndex in dataStore) {
        tabHTML += "<div onclick='displayContent(\"" + tableIndex + "\")' class='tab'>" + tableIndex + "</div>";
    }
    document.getElementById("div_listOfTable").innerHTML = tabHTML;
    document.getElementsByClassName('tab')[0].click();
}());

(function() {
    var html = ""
    for (var index in operationArray) {
        html += "<span><button class='btn' onclick='operationArray[\"" + index + "\"].click()'>" + index + "</button><div class='div_operation' id='div_operation_" + index + "'></div></span>";
    }
    document.getElementById("div_operationList").innerHTML = html;
}());

// this function creates the benchmark table
(function() {
    var trHTML = "<tr>";
    for (var elementIndex in window.benchmarkTableElements) {
        trHTML += "<th>" + benchmarkTableElements[elementIndex].name + "</th>";
    }
    trHTML += "</tr>";
    document.getElementById("tbl_benchmark").innerHTML = trHTML;
}());