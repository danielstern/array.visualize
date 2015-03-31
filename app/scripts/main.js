
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

	// function draw(data) {
	// 	elements = container.selectAll('g.element')
	// 		.data(data)
	// 		.enter().append('g')
	// 		.attr('class','element')
	// 		.attr("transform",function(d,i){return "translate("+(i*40+15)+",50)"})

	// 	avatars = elements.append('text')
	// 		.text(function(d,i){return d})
	// 		.attr('class','avatar')
	// 		.attr("fill",function(a){return color(0)})

	// 	commas = elements.append('text')
	// 		.text(function(d,i){return ','})
	// 		.attr("fill",function(a){return color(1)})	
	// 		.attr("x",function(a){return 20})	
	// 		.attr("opacity",function(a,i){return i==data.length-1 ? 0 : 1})	

	// 	parens = container.selectAll('g.parens')
	// 		.data(['[',']'])
	// 		.enter().append('g')
	// 		.attr('class','parens')
	// 		.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})

	// 	parens.append('text')
	// 		.text(function(d,i){return d})
	// 		.attr("fill",function(a){return color(2)})
	// }

	function update(data) {

		// DATA JOIN
		var elements = container.selectAll('g.element')
			.data(data,function(d,i){return i});

		elements.selectAll('text').data(data,function(d,i){return i});

			
		// UPDATE
		elements
			.selectAll('text')
			.text(function(d,i){return d})


		// debugger;
		// ENTER
		elements
			.enter().append('g')
			.attr('class','element')
			.attr("transform",function(d,i){return "translate("+(i*40+15)+",50)"})
			.append('text')
			.text(function(d,i){return d})
			.attr('class','avatar')
			.attr("fill",function(a){return color(0)})

		

		// elements.exit().remove()


		// elements
		// 	.data(data)
		// 	.enter()
		// 	.append('g')
		// 	.attr('class','element')
		// 	.attr("transform",function(d,i){return "translate("+(i*40+15)+",50)"})

		// elements
		// 	.selectAll('g.avatar')
		// 	.text(function(d,i){return d})
		// 	.attr('class','avatar')
		// 	.attr("fill",function(a){return color(0)})

		// commas
		// 	.append('text')
		// 	.text(function(d,i){return ','})
		// 	.attr("fill",function(a){return color(1)})	
		// 	.attr("x",function(a){return 20})	
		// 	.attr("opacity",function(a,i){return i==data.length-1 ? 0 : 1})	

		// elements.selectAll('text')
		// 	.text(function(d,i){return d})
		// 	.attr("fill",function(a){return color(0)})

		// parens
		// 	.transition()
		// 	.duration(1000)
		// 	.attr("transform",function(d,i){return "translate("+ (i===0?(0*40):(data.length*40))+",50)"})
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
var b =  illustrateArray(data.filter(filter),svg);
b.container.attr("transform",function(d,i){return "translate(65,110)"})

setTimeout(function(){a.update(['a','b','c','d','e','f'])},1500);