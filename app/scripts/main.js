
var filter = function f(n){
	return n%2===0;
}

function illustrateArray(data,svg){
	
	var color = d3.scale.category20b();
	
	var container = svg.append('g')
		.attr("transform",function(d,i){return "translate(0,50)"})

	function drawNumbers(data){
		var rep = container.selectAll('g.rep')
			.data(data)
			.enter().append('g')
			.attr('class','rep')
			.attr("transform",function(d,i){return "translate("+(i*40+15)+",50)"})

		rep.append('text')
			.text(function(d,i){return d})
			.attr("fill",function(a){return color(0)})

		rep.append('text')
			.text(function(d,i){if (i < data.length-1) return ","})
			.attr("fill",function(a){return color(0)})
			.attr("x",function(a){return 20})
	}

	function drawParens(data){
		var parens = container.selectAll('g.parens')
			.data(['[',']'])
			.enter().append('g')
			.attr('class','parens')
			.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})

		parens.append('text')
			.text(function(d,i){return d})
			.attr("fill",function(a){return color(1)})

	}

	function updateParens(data){
		var parens = container.selectAll('g.parens')
			.transition()
			.duration(1000)
			.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})

	}


	drawNumbers(data);
	drawParens(data);

	return {
		container:container,
		update:function(data){
				drawNumbers(data);
				drawParens(data);

				updateParens(data);


		}
	};
}

var data = [1,2,3,4,5];
var svg = d3.select("#_filter")
	.append('svg')
	.attr('height',600)
	.attr('width',400);
var a = illustrateArray(data,svg);
var b =  illustrateArray(data.filter(filter),svg);
b.container.attr("transform",function(d,i){return "translate(65,110)"})

a.update([1,2,3,4,5,6])