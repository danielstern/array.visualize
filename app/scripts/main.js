
var filter = function f(n){
	return n%2===0;
}

function illustrateArray(data,svg,options){

	// todo
	// - highlight index
	// - splice (push),unshift
	// - pull
	// - map (replace)
	// styles

	options = options || {};
	var fontsize = options.fontsize || 14;
	
	var color = d3.scale.category20b();
	
	var container = svg.append('g')
		.attr("transform",function(d,i){return "translate(0,50)"})

	var dataWidths;
	var commaWidth;
	var parensWidth;

	function computeWidths(data) {
		var text = container.selectAll('text._avatar')
			.data(data)
			.enter()
			.append('text')
			.text(function(d,i){return d})
			.style('font-size',fontsize);

		var commas = container.append('text').text(',')
			.style('font-size',fontsize);

		var parens=container.append('text')
			.style('font-size',fontsize)
			.text("[")

		dataWidths = data.map(function(a,i){
			return text[0][i]. getComputedTextLength ();
		})	

		commaWidth = commas[0][0]. getComputedTextLength ();
		parensWidth = parens[0][0]. getComputedTextLength ();

		text.remove();
		commas.remove();
		parens.remove();
	}


	function update(data) {

		computeWidths(data);
		console.log("Computed widths...",data,dataWidths)

		// DATA JOIN
		var text = container.selectAll('text.avatar')
			.data(data);

		var commas = container.selectAll('text.comma')
			.data(data);

		var parens = container.selectAll('text.parens')
			.data(['[',']'])

		// UPDATE
		text
			.transition()
			.delay(50)
			.attr('opacity',0)
			.transition()
			.text(function(d,i){return d})
			.attr('opacity',1)
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",50)"
			})

		commas
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i+1))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",50)"})


		parens
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths)+parensWidth;
				x+=(data.length-1)*commaWidth;
				return "translate("+ (i===0?0:x)+",50)"
			})


		// ENTER
		var newText = text.enter().append('text')
			.text(function(d,i){return d})
			.attr('class','avatar')
			.attr("fill",function(a){return color(0)})
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",50)"})
			.attr('opacity',0)
			.transition()
			.attr('opacity',1)
			.style('font-size',fontsize);

		var newCommas = commas.enter().append('text')
			.text(function(d,i){return ",";})
			.attr('class','comma')
			.attr("fill",function(a){return color(1)})
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths.slice(0,i+1))+parensWidth;
				x+=i*commaWidth;
				return "translate("+x+",50)"})
			.style('font-size',fontsize);

		parens
			.enter().append('text')
			.attr('class','parens')
			.attr("transform",function(d,i){
				var x = d3.sum(dataWidths)+parensWidth;
				x+=(data.length-1)*commaWidth;
				return "translate("+ (i===0?0:x)+",50)"
			})
			.style('font-size',fontsize)
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

var data = [1,21,'abc'];
var svg = d3.select("#_filter")
	.append('svg')
	.attr('height',600)
	.attr('width',400);
var a = illustrateArray(data,svg,{fontsize:45});
// var b =  illustrateArray(data.filter(filter),svg);
// b.container.attr("transform",function(d,i){return "translate(65,110)"})

setTimeout(function(){a.update(['a','b','c','d','e','f'])},1500);
setTimeout(function(){a.update(['MM','h','i'])},3000);