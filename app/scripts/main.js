
var filter = function f(n){
	return n%2===0;
}

function illustrateArray(data,svg){
	
	var color = d3.scale.category20b();
	
	var container = svg.append('g')
		.attr("transform",function(d,i){return "translate(0,50)"})

	var elements;
	var avatars;
	var commas;
	var parens;


	function update(data) {

		// DATA JOIN

		var text = container.selectAll('text.avatar')
			.data(data);

		var parens = container.selectAll('g.parens')
			.data(['[',']'])


		// UPDATE
		text
			.text(function(d,i){return d})

		parens
			.transition()
			.duration(1000)
			.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})


		// ENTER
		var newText = text.enter().append('text')
			.text(function(d,i){return d})
			.attr('class','avatar')
			.attr("fill",function(a){return color(0)})
			.attr("transform",function(d,i){return "translate("+(i*40+15)+",50)"})


	
	}





	

	update(data)

	return {
		container:container,
		update:update
	};
}

var data = [1,2,3,4,5];
var svg = d3.select("#_filter")
	.append('svg')
	.attr('height',600)
	.attr('width',400);
var a = illustrateArray(data,svg);
// var b =  illustrateArray(data.filter(filter),svg);
// b.container.attr("transform",function(d,i){return "translate(65,110)"})

setTimeout(function(){a.update(['a','b','c','d','e','f'])},1500);