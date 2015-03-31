
var filter = function f(n){
	return n%2===0;
}

function illustrateArray(data){
	
	var color = d3.scale.category20b();

	var svg = d3.select("#_filter")
		.append('svg')
		.attr('height',600)
		.attr('width',400);

	function drawNumbers(){
		var rep = svg.selectAll('g.rep')
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

	function drawParens(){
		var parens = svg.selectAll('g.parens')
			.data(['[',']'])
			.enter().append('g')
			.attr('class','parens')
			.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})

		parens.append('text')
			.text(function(d,i){return d})
			.attr("fill",function(a){return color(1)})

	}

	function drawCommas(){
		var commas = svg.selectAll('g.commas')
			.data(data.slice(0,data.length-1))
			.enter().append('g')
			.attr('class','comma')
			.attr("transform",function(d,i){return "translate("+ (1+i) * 40 +",50)"})

		commas.append('text')
			.text(function(d,i){return ','})
			.attr("fill",function(a){return color(2)})

	}


	drawNumbers();
	drawParens();
	// drawCommas();	

}

var data = [1,2,3,4,5];
illustrateArray(data);
illustrateArray(data.filter(filter));