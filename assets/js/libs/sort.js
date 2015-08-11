var Sort = (function () {
	
	var compare = (function(obj1, obj2, attribute) {
		if(obj1[attribute]<obj2[attribute]) {
			return 1;
		} else {
			return 0;
		}
	});

	var merge = (function merge(left, right, attribute) {
	    var result = [];
	    
	    while (left.length && right.length) {
	        if (compare(left[0], right[0], attribute)) {
	            result.push(left.shift());
	        } else {
	            result.push(right.shift());
	        }
	    }
	 
	    while (left.length) {
	        result.push(left.shift());
	    }
	 
	    while (right.length) {
	        result.push(right.shift());
	    }
	 
	    return result;
	});

	this.mergeSort = (function mergeSort(arr, attribute) {
	    if (arr.length < 2) {
	        return arr;
	    }
	    var middle = parseInt(arr.length / 2),
	    	left   = arr.slice(0, middle),
	    	right  = arr.slice(middle, arr.length),
	    	res = merge(mergeSort(left, attribute), mergeSort(right, attribute), attribute);
	    return res;
	});

	

	var bubbleSortAlpha = (function(sortArray, attribute){
		var length = sortArray.length;
	    for (var i = 0; i < length; i++) {
	        for (var j = 0; j < length - 1; j++) {
	            if (compare(sortArray[j],sortArray[j + 1], attribute)) {
	                var temp = sortArray[j + 1];
	                sortArray[j + 1] = sortArray[j];
	                sortArray[j] = temp;
	            }
	        }
	    }
	    return sortArray;
	});

	this.bubbleSort = (function bubble(inputArray, attribute) {
	    var sortArray = inputArray.slice(0),
	    	length = sortArray.length;
	    if(isNaN(parseFloat(sortArray[0][attribute]))) {
	   		bubbleSortAlpha(sortArray, attribute); 	
	    }
	    for (var i = 0; i < length; i++) {
	        for (var j = 0; j < length - 1; j++) {
	            if (sortArray[j][attribute] > sortArray[j + 1][attribute]) {
	                var temp = sortArray[j + 1];
	                sortArray[j + 1] = sortArray[j];
	                sortArray[j] = temp;
	            }
	        }
	    }
	    return sortArray;
	});

	var insertionSortAlpha = (function(sortArray, attribute) {
		var length = sortArray.length;
	    for (var i = 1; i < length; i++) {
	        for (var j = 0; j < i; j++)
	            if (compare(sortArray[j], sortArray[i], attribute)) {
	                var temp = sortArray[i];
	                var k = i;
	                while (k != j) {
	                    sortArray[k] = sortArray[k - 1];
	                    k--;
	                }
	                sortArray[j] = temp;
	            }
	    }
	    return sortArray;
	});

	this.insertionSort = (function insertion(inputArray, attribute) {
		var sortArray = inputArray.slice(0),
	    	length = sortArray.length;
	    if(isNaN(parseFloat(sortArray[0][attribute]))) {
	   		insertionSortAlpha(sortArray, attribute); 	
	    }
	    for (var i = 1; i < length; i++) {
	        for (var j = 0; j < i; j++)
	            if (sortArray[j][attribute] > sortArray[i][attribute]) {
	                var temp = sortArray[i];
	                var k = i;
	                while (k != j) {
	                    sortArray[k] = sortArray[k - 1];
	                    k--;
	                }
	                sortArray[j] = temp;
	            }
	    }
	    return sortArray;
	});
});