
var filter = function f(n){
	return n%2===0;
}

function illustrateArray(data,svg,options){

	// todo
	// - highlight index
	// - splice (push),unshift
	// - pull
	// - map (replace)
	// widths/ styles

	options = options || {};
	var fontsize = options.fontsize || 14;
	
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

		var commas = container.selectAll('text.comma')
			.data(data);

		var parens = container.selectAll('g.parens')
			.data(['[',']'])


		// UPDATE
		text
			.transition()
			.delay(50)
			.attr('opacity',0)
			.transition()
			.text(function(d,i){return d})
			.attr('opacity',1)

		parens
			.transition()
			.duration(200)
			.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})


		// ENTER
		var newText = text.enter().append('text')
			.text(function(d,i){return d})
			.attr('class','avatar')
			.attr("fill",function(a){return color(0)})
			.attr("transform",function(d,i){return "translate("+((i*40)+15)+",50)"})
			.attr('opacity',0)
			.transition()
			.attr('opacity',1)
			.style('font-size',fontsize);

		var newCommas = commas.enter().append('text')
			.text(function(d,i){return ",";})
			.attr('class','comma')
			.attr("fill",function(a){return color(1)})
			.attr("transform",function(d,i){return "translate("+((i*40)+30)+",50)"})
			.style('font-size',fontsize);

		parens
			.enter().append('g')
			.attr('class','parens')
			.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})
			.style('font-size',fontsize)

		parens.append('text')
			.text(function(d,i){return d})
			.attr("fill",function(a){return color(2)})

		// ENTER AND UPDATE
		commas
			 .attr("opacity",function(a,i){return i==data.length-1 ? 0 : 1})	

		//EXIT
		text.exit().remove();
		commas.exit().remove();
	
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
var a = illustrateArray(data,svg,{fontsize:45});
// var b =  illustrateArray(data.filter(filter),svg);
// b.container.attr("transform",function(d,i){return "translate(65,110)"})

setTimeout(function(){a.update(['a','b','c','d','e','f'])},1500);
setTimeout(function(){a.update(['g','h','i'])},3000);