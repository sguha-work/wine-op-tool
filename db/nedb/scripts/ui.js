var ui = {
    
    create_list: function(config, id, options) {
        var select = document.createElement('select'),
            option;
        select.setAttribute('id', "txt_" + id);
        for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
            option = document.createElement('option');
            option.setAttribute('value', options[optionIndex]);
            option.appendChild(document.createTextNode(options[optionIndex]));
            select.appendChild(option);
        }
        select.setAttribute('class', 'op_select');
        if (document.getElementById('btn_go')) {
            var btnElement = document.getElementById('btn_go');
            btnElement.parentNode.insertBefore(select, btnElement);
        } else {
            document.getElementById("div_operation").appendChild(select);
        }
    },
    
    create_table: function(config, id) {
        var options = [];
        for (var index in dataStore) {
            options.push(index);
        }
        ui.create_list({}, id, options);
    },
    
    create_field: function(config, id) {
        tableName = config.table || "";
        var fields = [];
        for (var index = 0; index < dataStore[tableName].fields.length; index++) {
            fields.push(dataStore[tableName].fields[index].name);
        }
        ui.create_list({}, id, fields);
    },
    
    create_button: function(callBack) {
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', "Go");
        button.setAttribute('id', "btn_go");
        button.addEventListener('click', callBack);
        document.getElementById("div_operation").appendChild(button);
    },
    
    update_comment: function(comment) {
    	comment == typeof comment === "undefined" ? "" : comment;
    	document.getElementById("div_operation_comment").innerHTML = comment;
    },
    
    clear_ui: function() {
        var container = document.getElementById("div_operation");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }, 
    
    create_attributes: function(config, id) {
    	var attributeList = [];
    	for(var index in dataStore[config.table].fields) {
    		attributeList.push(dataStore[config.table].fields[index].name);
    	}

    	var inputBox = [];

    	for(var index in attributeList) {
    		var input = document.createElement("input");
    		input.setAttribute("name", config.table+"_attributes");
    		input.setAttribute("value", attributeList[index]);
    		input.setAttribute("type", "radio");
    		input.setAttribute("onclick","document.getElementById('txt_"+id+"').value=this.value")
    		inputBox.push(input);
    		var label = document.createElement("label");
 			label.appendChild(document.createTextNode(attributeList[index]+" "));   		
 			inputBox.push(label);
    	}
    	var inputHidden = document.createElement("input");
    	inputHidden.setAttribute("type", "hidden");
    	inputHidden.setAttribute("id", "txt_"+id);
    	inputHidden.setAttribute("value", "");
    	inputBox.push(inputHidden);
    	if(document.getElementById('btn_go')) {
			var btnElement = document.getElementById('btn_go');
			for(var index in inputBox) {
				btnElement.parentNode.insertBefore(inputBox[index], btnElement);
			}
		} else {
			for(var index in inputBox) {
				document.getElementById("div_operation").appendChild(inputBox[index]);
			}
		}



    },

    create_query: function(config, id) {
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "txt_"+id);
		input.setAttribute("style", "width:305px");
		if(document.getElementById('btn_go')) {
			var btnElement = document.getElementById('btn_go');
			btnElement.parentNode.insertBefore(input, btnElement);
		} else {
			document.getElementById("div_operation").appendChild(input);
		}
	},

	create_suboperation: function(config, id, subOperationList) {
		ui.create_list(config, id, subOperationList);

	}
}