(function filter(){
	var data = [1,2,3,4,5,6,7,8];
	var filter = function(n){return n%2};
	var svg = d3.select("#_filter")
		.append('svg')
		.attr('height',300)
		.attr('width',900);

	var a = illustrateArray(data,svg,{speed:250});
	var filteredData = [];
	var b = illustrateArray(filteredData,svg,{speed:250})
	b.container.attr('transform',"translate(0,150)")
})();